const express = require("express");

const router = express.Router();

const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

const {
    protect,
    adminOnly,
} = require("../middleware/authMiddleware");

// Public routes
router.get("/", getCategories);

router.get("/:id", getCategoryById);

// Admin routes
router.post("/", protect, adminOnly, createCategory);

router.put("/:id", protect, adminOnly, updateCategory);

router.delete("/:id", protect, adminOnly, deleteCategory);

module.exports = router;