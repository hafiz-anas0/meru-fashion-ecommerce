"use client";

import { Suspense, FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess(false);

        if (!token) {
            setError("This password reset link is invalid.");
            return;
        }

        if (!password || !confirmPassword) {
            setError("Please enter and confirm your new password.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password/${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "Unable to reset your password. Please try again."
                );
                return;
            }

            setSuccess(true);
        } catch (error) {
            console.error("Reset password error:", error);

            setError(
                "Unable to connect to the server. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-meru-stone px-5">
            <div className="w-full max-w-md">
                {/* MERU Branding */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="font-display text-3xl tracking-[0.22em] text-meru-dark"
                    >
                        MERU
                    </Link>

                    <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-meru-muted">
                        Fashion & Lifestyle
                    </p>
                </div>

                {/* Card */}
                <div className="mt-10 border border-meru-border bg-meru-menu px-7 py-10 sm:px-10">
                    {!success ? (
                        <>
                            {/* Heading */}
                            <div>
                                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-meru-accent">
                                    Account recovery
                                </p>

                                <h1 className="mt-3 font-display text-3xl text-meru-dark">
                                    Reset password
                                </h1>

                                <p className="mt-4 text-sm leading-6 text-meru-muted">
                                    Create a new password for your MERU account.
                                </p>
                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-7"
                            >
                                {/* New Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-[10px] font-medium uppercase tracking-[0.14em] text-meru-dark"
                                    >
                                        New password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Enter your new password"
                                            autoComplete="new-password"
                                            className="w-full border-0 border-b border-meru-border bg-transparent px-0 py-3 pr-10 text-sm text-meru-dark outline-none placeholder:text-meru-muted/60 transition-colors focus:border-meru-accent"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            className="absolute right-0 bottom-3 text-meru-muted transition hover:text-meru-dark"
                                        >
                                            {showPassword ? (
                                                <EyeOff
                                                    size={18}
                                                    strokeWidth={1.5}
                                                />
                                            ) : (
                                                <Eye
                                                    size={18}
                                                    strokeWidth={1.5}
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 block text-[10px] font-medium uppercase tracking-[0.14em] text-meru-dark"
                                    >
                                        Confirm password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Confirm your new password"
                                            autoComplete="new-password"
                                            className="w-full border-0 border-b border-meru-border bg-transparent px-0 py-3 pr-10 text-sm text-meru-dark outline-none placeholder:text-meru-muted/60 transition-colors focus:border-meru-accent"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            aria-label={
                                                showConfirmPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            className="absolute right-0 bottom-3 text-meru-muted transition hover:text-meru-dark"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff
                                                    size={18}
                                                    strokeWidth={1.5}
                                                />
                                            ) : (
                                                <Eye
                                                    size={18}
                                                    strokeWidth={1.5}
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700">
                                        {error}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex w-full items-center justify-center gap-3 bg-meru-dark px-5 py-4 text-xs font-medium uppercase tracking-[0.16em] text-meru-white transition hover:bg-meru-slate disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Resetting..."
                                        : "Reset password"}

                                    {!loading && (
                                        <ArrowRight
                                            size={16}
                                            strokeWidth={1.5}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    )}
                                </button>
                            </form>

                            {/* Back to Login */}
                            <p className="mt-7 text-center text-sm text-meru-muted">
                                Remember your password?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-meru-dark underline decoration-meru-accent underline-offset-4 transition hover:text-meru-accent"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </>
                    ) : (
                        /* Success */
                        <div className="text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-meru-dark">
                                <Check
                                    size={25}
                                    strokeWidth={1.5}
                                    className="text-green-600"
                                />
                            </div>

                            <h1 className="mt-7 font-display text-3xl text-meru-dark">
                                Password updated
                            </h1>

                            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-meru-muted">
                                Your password has been successfully updated.
                                You can now sign in with your new password.
                            </p>

                            <Link
                                href="/login"
                                className="mt-8 inline-flex w-full items-center justify-center bg-meru-dark px-5 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-meru-white! transition hover:bg-meru-slate"
                            >
                                Continue to Login
                            </Link>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-meru-muted">
                    © {new Date().getFullYear()} MERU — Fashion & Lifestyle
                </p>
            </div>
        </main>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center bg-meru-stone">
                    <p className="text-xs uppercase tracking-[0.18em] text-meru-muted">
                        Loading...
                    </p>
                </main>
            }
        >
            <ResetPasswordContent />
        </Suspense>
    );
}