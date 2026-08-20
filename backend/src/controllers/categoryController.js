const Category = require("../models/Category");

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true })
            .sort({ name: 1 });

        res.status(200).json({
            categories,
        });
    } catch (error) {
        console.error("Get categories error:", error);

        res.status(500).json({
            message: "Something went wrong while fetching categories",
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findOne({
            _id: id,
            isActive: true,
        });

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        res.status(200).json({
            category,
        });
    } catch (error) {
        console.error("Get category error:", error);

        res.status(500).json({
            message: "Something went wrong while fetching the category",
        });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name, slug, description, image } = req.body;

        if (!name || !slug) {
            return res.status(400).json({
                message: "Category name and slug are required",
            });
        }

        const existingCategory = await Category.findOne({
            $or: [{ name }, { slug }],
        });

        if (existingCategory) {
            return res.status(409).json({
                message: "A category with this name or slug already exists",
            });
        }

        const category = await Category.create({
            name,
            slug,
            description,
            image,
        });

        res.status(201).json({
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        console.error("Create category error:", error);

        res.status(500).json({
            message: "Something went wrong while creating the category",
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, description, image, isActive } = req.body;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        if (name !== undefined) {
            category.name = name;
        }

        if (slug !== undefined) {
            category.slug = slug;
        }

        if (description !== undefined) {
            category.description = description;
        }

        if (image !== undefined) {
            category.image = image;
        }

        if (isActive !== undefined) {
            category.isActive = isActive;
        }

        await category.save();

        res.status(200).json({
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        console.error("Update category error:", error);

        res.status(500).json({
            message: "Something went wrong while updating the category",
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        await category.deleteOne();

        res.status(200).json({
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.error("Delete category error:", error);

        res.status(500).json({
            message: "Something went wrong while deleting the category",
        });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};