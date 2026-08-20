require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");

const Category = require("../models/Category");
const Product = require("../models/Product");

const categories = [
    {
        name: "Women",
        slug: "women",
        description: "Premium fashion designed for women.",
        image: "/categories/women.png",
    },
    {
        name: "Men",
        slug: "men",
        description: "Refined and contemporary fashion for men.",
        image: "/categories/men.png",
    },
    {
        name: "Beauty",
        slug: "beauty",
        description: "Beauty and self-care essentials.",
        image: "/categories/beauty.png",
    },
    {
        name: "Accessories",
        slug: "accessories",
        description: "Finishing touches for every MERU look.",
        image: "/categories/accessories.png",
    },
];

const products = [
    {
        name: "Embroidered Lawn Suit",
        slug: "embroidered-lawn-suit",
        description:
            "A refined embroidered lawn suit designed with MERU's signature minimal and elegant aesthetic.",
        price: 5490,
        categorySlug: "women",
        images: ["/images/products/product-1.png"],
        sizes: ["S", "M", "L", "XL"],
        colors: [],
        stock: 20,
        featured: true,
        isActive: true,
    },
    {
        name: "Printed Formal Summer Suit",
        slug: "printed-formal-summer-suit",
        description:
            "A sophisticated printed summer suit combining contemporary style with effortless elegance.",
        price: 4990,
        categorySlug: "women",
        images: ["/images/products/product-2.png"],
        sizes: ["S", "M", "L", "XL"],
        colors: [],
        stock: 20,
        featured: true,
        isActive: true,
    },
    {
        name: "Formal Embroidered Suit",
        slug: "formal-embroidered-suit",
        description:
            "An elegant embroidered suit designed for a polished and timeless formal look.",
        price: 7490,
        categorySlug: "women",
        images: ["/images/products/product-3.png"],
        sizes: ["S", "M", "L", "XL"],
        colors: [],
        stock: 20,
        featured: true,
        isActive: true,
    },
    {
        name: "Contemporary Minimal Suit",
        slug: "contemporary-minimal-suit",
        description:
            "A clean and contemporary suit that reflects MERU's understated premium aesthetic.",
        price: 4590,
        categorySlug: "women",
        images: ["/images/products/product-4.png"],
        sizes: ["S", "M", "L", "XL"],
        colors: [],
        stock: 20,
        featured: true,
        isActive: true,
    },
];

const seedData = async () => {
    try {
        await connectDB();

        console.log("Connected to MongoDB.");

        // Create categories
        const categoryMap = {};

        for (const categoryData of categories) {
            const category = await Category.findOneAndUpdate(
                { slug: categoryData.slug },
                categoryData,
                {
                    returnDocument: "after",
                    upsert: true,
                    setDefaultsOnInsert: true,
                }
            );

            categoryMap[category.slug] = category._id;
        }

        console.log("Categories seeded successfully.");

        // Create products
        for (const productData of products) {
            const { categorySlug, ...product } = productData;

            await Product.findOneAndUpdate(
                { slug: product.slug },
                {
                    ...product,
                    category: categoryMap[categorySlug],
                },
                {
                    returnDocument: "after",
                    upsert: true,
                    setDefaultsOnInsert: true,
                }
            );
        }

        console.log("Products seeded successfully.");
        console.log("MERU seed completed.");
    } catch (error) {
        console.error("Seed failed:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
};

seedData();