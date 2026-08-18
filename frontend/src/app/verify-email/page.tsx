"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const hasVerified = useRef(false);

    const [status, setStatus] = useState<
        "verifying" | "success" | "error"
    >("verifying");

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (hasVerified.current) {
            return;
        }

        hasVerified.current = true;

        const verifyEmail = async () => {
            if (!token) {
                setStatus("error");
                setMessage("Your verification link is missing a token.");
                return;
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email/${token}`
                );

                const data = await response.json();

                console.log("Verification response:", {
                    status: response.status,
                    ok: response.ok,
                    data,
                });

                if (!response.ok) {
                    setStatus("error");
                    setMessage(
                        data.message ||
                        "This verification link is invalid or has expired."
                    );
                    return;
                }

                setStatus("success");
                setMessage(
                    data.message ||
                    "Your email has been verified successfully."
                );
            } catch (error) {
                console.error("Email verification error:", error);

                setStatus("error");
                setMessage(
                    "We were unable to verify your email. Please try again later."
                );
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-meru-stone px-5">
            <div className="w-full max-w-md text-center">
                {/* MERU Branding */}
                <Link
                    href="/"
                    className="font-display text-3xl tracking-[0.22em] text-meru-dark"
                >
                    MERU
                </Link>

                <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-meru-muted">
                    Fashion & Lifestyle
                </p>

                {/* Card */}
                <div className="mt-10 border border-meru-border bg-meru-menu px-7 py-10 sm:px-10">
                    {/* Verifying */}
                    {status === "verifying" && (
                        <>
                            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-meru-border">
                                <Loader2
                                    size={24}
                                    strokeWidth={1.5}
                                    className="animate-spin text-meru-dark"
                                />
                            </div>

                            <h1 className="mt-7 font-display text-3xl text-meru-dark">
                                Verifying your email
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-meru-muted">
                                Please wait while we confirm your email
                                address.
                            </p>
                        </>
                    )}

                    {/* Success */}
                    {status === "success" && (
                        <>
                            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-meru-dark">
                                <Check
                                    size={25}
                                    strokeWidth={1.5}
                                    className="text-green-600"
                                />
                            </div>

                            <h1 className="mt-7 font-display text-3xl text-meru-dark">
                                Email Verified
                            </h1>

                            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-meru-muted">
                                {message}
                            </p>

                            <Link
                                href="/login"
                                className="mt-8 inline-flex w-full items-center justify-center bg-meru-dark px-5 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-meru-white! transition hover:bg-meru-slate"
                            >
                                Continue to Login
                            </Link>
                        </>
                    )}

                    {/* Error */}
                    {status === "error" && (
                        <>
                            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-red-200">
                                <AlertCircle
                                    size={25}
                                    strokeWidth={1.5}
                                    className="text-red-600"
                                />
                            </div>

                            <h1 className="mt-7 font-display text-3xl text-meru-dark">
                                Verification Failed
                            </h1>

                            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-meru-muted">
                                {message}
                            </p>

                            <Link
                                href="/signup"
                                className="mt-8 inline-flex w-full items-center justify-center bg-meru-dark px-5 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-meru-white! transition hover:bg-meru-slate"
                            >
                                Back to Signup
                            </Link>
                        </>
                    )}
                </div>

                <p className="mt-6 text-xs text-meru-muted">
                    © {new Date().getFullYear()} MERU — Fashion & Lifestyle
                </p>
            </div>
        </main>
    );
}

function VerifyEmailFallback() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-meru-stone px-5">
            <div className="w-full max-w-md text-center">
                <Link
                    href="/"
                    className="font-display text-3xl tracking-[0.22em] text-meru-dark"
                >
                    MERU
                </Link>

                <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-meru-muted">
                    Fashion & Lifestyle
                </p>

                <div className="mt-10 border border-meru-border bg-meru-menu px-7 py-10 sm:px-10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center border border-meru-border">
                        <Loader2
                            size={24}
                            strokeWidth={1.5}
                            className="animate-spin text-meru-dark"
                        />
                    </div>

                    <h1 className="mt-7 font-display text-3xl text-meru-dark">
                        Loading
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-meru-muted">
                        Please wait...
                    </p>
                </div>

                <p className="mt-6 text-xs text-meru-muted">
                    © {new Date().getFullYear()} MERU — Fashion & Lifestyle
                </p>
            </div>
        </main>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<VerifyEmailFallback />}>
            <VerifyEmailContent />
        </Suspense>
    );
}