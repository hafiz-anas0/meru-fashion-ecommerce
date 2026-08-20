const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

const getProducts = async (req, res) => {
    try {
        const {
            search,
            category,
            minPrice,
            maxPrice,
            featured,
            sort = "newest",
            page = 1,
            limit = 12,
        } = req.query;

        // Build the product filter
        const filter = {
            isActive: true,
        };

        // Search by product name or description
        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Filter by category slug
        if (category) {
            const categoryExists = await Category.findOne({
                slug: category.toLowerCase(),
                isActive: true,
            });

            if (!categoryExists) {
                return res.status(404).json({
                    message: "Category not found",
                });
            }

            filter.category = categoryExists._id;
        }


        if (
            minPrice !== undefined &&
            maxPrice !== undefined &&
            Number(minPrice) > Number(maxPrice)
        ) {
            return res.status(400).json({
                message: "Minimum price cannot be greater than maximum price",
            });
        }

        // Filter by minimum price
        if (minPrice !== undefined) {
            const minimumPrice = Number(minPrice);

            if (Number.isNaN(minimumPrice) || minimumPrice < 0) {
                return res.status(400).json({
                    message: "Invalid minimum price",
                });
            }

            filter.price = {
                ...filter.price,
                $gte: minimumPrice,
            };
        }

        // Filter by maximum price
        if (maxPrice !== undefined) {
            const maximumPrice = Number(maxPrice);

            if (Number.isNaN(maximumPrice) || maximumPrice < 0) {
                return res.status(400).json({
                    message: "Invalid maximum price",
                });
            }

            filter.price = {
                ...filter.price,
                $lte: maximumPrice,
            };
        }

        // Filter featured products
        if (featured !== undefined) {
            if (featured !== "true" && featured !== "false") {
                return res.status(400).json({
                    message: "Featured must be true or false",
                });
            }

            filter.featured = featured === "true";
        }

        // Pagination
        const currentPage = Number(page);
        const productsPerPage = Number(limit);

        if (
            Number.isNaN(currentPage) ||
            currentPage < 1 ||
            !Number.isInteger(currentPage)
        ) {
            return res.status(400).json({
                message: "Page must be a positive integer",
            });
        }

        if (
            Number.isNaN(productsPerPage) ||
            productsPerPage < 1 ||
            !Number.isInteger(productsPerPage)
        ) {
            return res.status(400).json({
                message: "Limit must be a positive integer",
            });
        }

        const skip = (currentPage - 1) * productsPerPage;

        // Sorting
        let sortOption = { createdAt: -1 };

        if (sort === "price_asc") {
            sortOption = { price: 1 };
        } else if (sort === "price_desc") {
            sortOption = { price: -1 };
        } else if (sort === "name_asc") {
            sortOption = { name: 1 };
        } else if (sort === "name_desc") {
            sortOption = { name: -1 };
        } else if (sort === "oldest") {
            sortOption = { createdAt: 1 };
        } else if (sort !== "newest") {
            return res.status(400).json({
                message:
                    "Invalid sort option. Use newest, oldest, price_asc, price_desc, name_asc, or name_desc",
            });
        }

        // Get total number of matching products
        const totalProducts = await Product.countDocuments(filter);

        // Get products
        const products = await Product.find(filter)
            .populate("category", "name slug image")
            .sort(sortOption)
            .skip(skip)
            .limit(productsPerPage);

        const totalPages = Math.ceil(totalProducts / productsPerPage);

        res.status(200).json({
            products,
            pagination: {
                currentPage,
                productsPerPage,
                totalProducts,
                totalPages,
                hasNextPage: currentPage < totalPages,
                hasPreviousPage: currentPage > 1,
            },
        });
    } catch (error) {
        console.error("Get products error:", error);

        res.status(500).json({
            message: "Something went wrong while fetching products",
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID",
            });
        }

        const product = await Product.findOne({
            _id: id,
            isActive: true,
        }).populate("category", "name slug image");

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            product,
        });
    } catch (error) {
        console.error("Get product error:", error);

        res.status(500).json({
            message: "Something went wrong while fetching the product",
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const {
            name,
            slug,
            description,
            price,
            category,
            images,
            sizes,
            colors,
            stock,
            featured,
            isActive,
        } = req.body;

        // Check required fields
        if (
            !name ||
            !slug ||
            !description ||
            price === undefined ||
            !category ||
            stock === undefined
        ) {
            return res.status(400).json({
                message:
                    "Name, slug, description, price, category, and stock are required",
            });
        }

        // Validate price
        if (price < 0) {
            return res.status(400).json({
                message: "Price cannot be negative",
            });
        }

        // Validate stock
        if (stock < 0) {
            return res.status(400).json({
                message: "Stock cannot be negative",
            });
        }

        // Validate category ID
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                message: "Invalid category ID",
            });
        }

        // Check if category exists
        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        // Check duplicate slug
        const existingProduct = await Product.findOne({ slug });

        if (existingProduct) {
            return res.status(409).json({
                message: "A product with this slug already exists",
            });
        }

        // Create product
        const product = await Product.create({
            name,
            slug,
            description,
            price,
            category,
            images: images || [],
            sizes: sizes || [],
            colors: colors || [],
            stock,
            featured: featured || false,
            isActive: isActive !== undefined ? isActive : true,
        });

        // Return populated product
        const populatedProduct = await Product.findById(product._id).populate(
            "category",
            "name slug image"
        );

        res.status(201).json({
            message: "Product created successfully",
            product: populatedProduct,
        });
    } catch (error) {
        console.error("Create product error:", error);

        res.status(500).json({
            message: "Something went wrong while creating the product",
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID",
            });
        }

        // Find product
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        const {
            name,
            slug,
            description,
            price,
            category,
            images,
            sizes,
            colors,
            stock,
            featured,
            isActive,
        } = req.body;

        // Validate price if provided
        if (price !== undefined && price < 0) {
            return res.status(400).json({
                message: "Price cannot be negative",
            });
        }

        // Validate stock if provided
        if (stock !== undefined && stock < 0) {
            return res.status(400).json({
                message: "Stock cannot be negative",
            });
        }

        // Validate category if provided
        if (category !== undefined) {
            if (!mongoose.Types.ObjectId.isValid(category)) {
                return res.status(400).json({
                    message: "Invalid category ID",
                });
            }

            const categoryExists = await Category.findById(category);

            if (!categoryExists) {
                return res.status(404).json({
                    message: "Category not found",
                });
            }

            product.category = category;
        }

        // Check duplicate slug if slug is being changed
        if (slug !== undefined && slug !== product.slug) {
            const existingProduct = await Product.findOne({
                slug,
                _id: { $ne: id },
            });

            if (existingProduct) {
                return res.status(409).json({
                    message: "A product with this slug already exists",
                });
            }

            product.slug = slug;
        }

        // Update only provided fields
        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = price;
        if (images !== undefined) product.images = images;
        if (sizes !== undefined) product.sizes = sizes;
        if (colors !== undefined) product.colors = colors;
        if (stock !== undefined) product.stock = stock;
        if (featured !== undefined) product.featured = featured;
        if (isActive !== undefined) product.isActive = isActive;

        await product.save();

        // Return updated product with category
        const updatedProduct = await Product.findById(product._id).populate(
            "category",
            "name slug image"
        );

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Update product error:", error);

        res.status(500).json({
            message: "Something went wrong while updating the product",
        });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID",
            });
        }

        // Find product
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Delete product error:", error);

        res.status(500).json({
            message: "Something went wrong while deleting the product",
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};