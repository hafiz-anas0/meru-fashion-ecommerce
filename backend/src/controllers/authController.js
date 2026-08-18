const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {sendVerificationEmail, sendPasswordResetEmail, } = require("../services/emailService");

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists",
            });
        }

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            verificationToken,
        });

        // Send verification email
        await sendVerificationEmail(
            user.email,
            user.name,
            verificationToken
        );

        res.status(201).json({
            message:
                "User registered successfully. Please check your email to verify your account.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong while registering the user",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Compare passwords
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Check email verification
        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email before logging in",
            });
        }

        // Generate JWT
        const token = generateToken(user._id);

        // Store JWT in HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong while logging in",
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong while logging out",
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Find user with the verification token
        const user = await User.findOne({
            verificationToken: token,
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired verification token",
            });
        }

        // Verify the user
        user.isVerified = true;
        user.verificationToken = null;

        await user.save();

        res.status(200).json({
            message: "Email verified successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong while verifying the email",
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const user = await User.findOne({ email });

        // Don't reveal whether an account exists
        if (!user) {
            return res.status(200).json({
                message:
                    "If an account exists with this email, a password reset link has been sent.",
            });
        }

        // Generate raw token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Hash token before storing it
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Store hashed token and expiry
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save({ validateBeforeSave: false });

        // Send reset email
        await sendPasswordResetEmail(
            user.email,
            user.name,
            resetToken
        );

        res.status(200).json({
            message:
                "If an account exists with this email, a password reset link has been sent.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);

        res.status(500).json({
            message:
                "Something went wrong while processing your request",
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                message: "New password is required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        // Hash the token received from the URL
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find user with valid, non-expired token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            return res.status(400).json({
                message: "This password reset link is invalid or has expired",
            });
        }

        // Update password
        user.password = password;

        // Remove reset token
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({
            message:
                "Password reset successfully. You can now log in with your new password.",
        });
    } catch (error) {
        console.error("Reset password error:", error);

        res.status(500).json({
            message:
                "Something went wrong while resetting your password",
        });
    }
};

module.exports = {
    signup,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
};