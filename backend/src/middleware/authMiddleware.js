const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        let token;

        // Check HttpOnly cookie first
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // Also support Bearer token for API testing/backward compatibility
        if (
            !token &&
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // No token
        if (!token) {
            return res.status(401).json({
                message: "Not authorized. No token provided.",
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user and attach to request
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({
                message: "User no longer exists.",
            });
        }

        next();
    } catch (error) {
        console.error("Authentication error:", error.message);

        return res.status(401).json({
            message: "Not authorized. Invalid or expired token.",
        });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }

    return res.status(403).json({
        message: "Access denied. Admin privileges required.",
    });
};

module.exports = {
    protect,
    adminOnly,
};