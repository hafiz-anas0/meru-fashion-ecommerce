const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const sendVerificationEmail = async (email, name, verificationToken) => {
    try {
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

        const result = await brevo.transactionalEmails.sendTransacEmail({
            subject: "Verify your MERU account",

            htmlContent: `
                <div>
                    <h1>Welcome to MERU, ${name}!</h1>

                    <p>Thank you for creating your account.</p>

                    <p>Please click the button below to verify your email address:</p>

                    <a
                        href="${verificationUrl}"
                        style="
                            display: inline-block;
                            padding: 12px 24px;
                            background-color: #24231F;
                            color: white;
                            text-decoration: none;
                        "
                    >
                        Verify Email
                    </a>

                    <p>This verification link will expire soon.</p>

                    <p>If you did not create this account, you can ignore this email.</p>
                </div>
            `,

            sender: {
                name: process.env.BREVO_SENDER_NAME,
                email: process.env.BREVO_SENDER_EMAIL,
            },

            to: [
                {
                    email,
                    name,
                },
            ],
        });

        console.log("Verification email sent:", result);

        return result;

    } catch (error) {
        console.error("Brevo email error:", error);
        throw error;
    }
};

const sendPasswordResetEmail = async (
    email,
    name,
    resetToken
) => {
    try {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        const result =
            await brevo.transactionalEmails.sendTransacEmail({
                subject: "Reset your MERU password",

                htmlContent: `
                    <div>
                        <h1>Password Reset</h1>

                        <p>Hello ${name},</p>

                        <p>
                            We received a request to reset the password
                            for your MERU account.
                        </p>

                        <p>
                            Click the button below to create a new password:
                        </p>

                        <a
                            href="${resetUrl}"
                            style="
                                display: inline-block;
                                padding: 12px 24px;
                                background-color: #24231F;
                                color: white;
                                text-decoration: none;
                            "
                        >
                            Reset Password
                        </a>

                        <p>
                            This link will expire in 15 minutes.
                        </p>

                        <p>
                            If you did not request a password reset,
                            you can safely ignore this email.
                        </p>
                    </div>
                `,

                sender: {
                    name: process.env.BREVO_SENDER_NAME,
                    email: process.env.BREVO_SENDER_EMAIL,
                },

                to: [
                    {
                        email,
                        name,
                    },
                ],
            });

        console.log("Password reset email sent:", result);

        return result;
    } catch (error) {
        console.error(
            "Brevo password reset email error:",
            error
        );

        throw error;
    }
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
};