"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess(false);

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "Unable to process your request. Please try again."
                );
                return;
            }

            setSuccess(true);
        } catch (error) {
            console.error("Forgot password error:", error);

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
                                    Forgot password?
                                </h1>

                                <p className="mt-4 text-sm leading-6 text-meru-muted">
                                    Enter the email address associated with
                                    your MERU account and we'll send you a
                                    link to reset your password.
                                </p>
                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-7"
                            >
                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-[10px] font-medium uppercase tracking-[0.14em] text-meru-dark"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your email address"
                                        autoComplete="email"
                                        className="w-full border-0 border-b border-meru-border bg-transparent px-0 py-3 text-sm text-meru-dark outline-none placeholder:text-meru-muted/60 transition-colors focus:border-meru-accent"
                                    />
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
                                        ? "Sending..."
                                        : "Send reset link"}

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
                                Check your email
                            </h1>

                            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-meru-muted">
                                If an account exists with{" "}
                                <span className="font-medium text-meru-dark">
                                    {email}
                                </span>
                                , we've sent you a password reset link.
                            </p>

                            <p className="mt-4 text-xs leading-5 text-meru-muted">
                                The link will expire after the time specified
                                by the server.
                            </p>

                            <Link
                                href="/login"
                                className="mt-8 inline-flex w-full items-center justify-center bg-meru-dark px-5 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-meru-white! transition hover:bg-meru-slate"
                            >
                                Back to Login
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