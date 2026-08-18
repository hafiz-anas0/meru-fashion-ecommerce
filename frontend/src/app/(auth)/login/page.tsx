"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { user, loading: authLoading, refreshUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Redirect authenticated users away from login
    useEffect(() => {
        if (!authLoading && user) {
            router.replace("/");
        }
    }, [user, authLoading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        const { email, password } = formData;

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Unable to log in.");
                return;
            }

            // Update global authentication state
            await refreshUser();

            // Redirect to homepage
            router.replace("/");
        } catch (error) {
            console.error("Login error:", error);

            setError(
                "Unable to connect to the server. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    // Prevent login form from flashing while checking authentication
    if (authLoading || user) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-meru-stone">
                <p className="text-xs uppercase tracking-[0.18em] text-meru-muted">
                    Loading...
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen lg:h-screen">
            <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row">

                {/* LEFT — BRANDING */}
                <section className="relative hidden w-1/2 items-center overflow-hidden bg-meru-dark px-16 lg:flex xl:px-24">

                    {/* Decorative circles */}
                    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-meru-accent/30" />

                    <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full border border-meru-accent/20" />

                    <div className="relative z-10 max-w-lg">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="inline-block font-display text-5xl tracking-[0.18em] text-meru-white! transition-opacity hover:opacity-80 sm:text-6xl"
                        >
                            MERU
                        </Link>

                        {/* Brand descriptor */}
                        <div className="mt-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-meru-accent" />

                            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-meru-accent">
                                Fashion & Lifestyle
                            </span>

                            <span className="h-px w-10 bg-meru-accent" />
                        </div>

                        {/* Main message */}
                        <div className="mt-14">
                            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-meru-accent">
                                Welcome back
                            </p>

                            <h2 className="mt-5 font-display text-3xl leading-tight text-meru-white sm:text-4xl xl:text-5xl">
                                Your style, your way.
                            </h2>

                            <p className="mt-7 max-w-md text-sm leading-7 text-[#B9B5AD]">
                                Step back into a considered world of fashion,
                                where simplicity meets individuality.
                            </p>
                        </div>

                        {/* Supporting statement */}
                        <div className="mt-10 max-w-sm border-l border-meru-accent/60 pl-5">
                            <p className="text-xs leading-6 text-[#A9A59D]">
                                Continue discovering pieces designed for the
                                way you live, move, and express yourself.
                            </p>
                        </div>
                    </div>
                </section>

                {/* RIGHT — LOGIN FORM */}
                <section className="flex min-h-screen w-full items-center bg-meru-stone px-6 py-12 sm:px-10 lg:min-h-0 lg:w-1/2 lg:px-16 lg:py-10 xl:px-24">
                    <div className="mx-auto w-full max-w-xl">

                        {/* Heading */}
                        <div className="mb-9">
                            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-meru-accent">
                                Welcome back
                            </p>

                            <h1 className="mt-3 font-display text-4xl text-meru-dark sm:text-5xl">
                                Sign in
                            </h1>

                            <p className="mt-4 max-w-md text-sm leading-6 text-meru-muted">
                                Sign in to your MERU account to continue
                                shopping.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-7"
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
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                    autoComplete="email"
                                    className="w-full border-0 border-b border-meru-border bg-transparent px-0 py-3 text-sm text-meru-dark outline-none placeholder:text-meru-muted/60 transition-colors focus:border-meru-accent"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-[10px] font-medium uppercase tracking-[0.14em] text-meru-dark"
                                    >
                                        Password
                                    </label>

                                    <Link
                                        href="/forgot-password"
                                        className="text-[10px] uppercase tracking-[0.08em] text-meru-muted transition hover:text-meru-accent"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
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
                                    ? "Signing in..."
                                    : "Sign in"}

                                {!loading && (
                                    <ArrowRight
                                        size={16}
                                        strokeWidth={1.5}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                )}
                            </button>
                        </form>

                        {/* Signup */}
                        <p className="mt-7 text-center text-sm text-meru-muted">
                            Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="font-medium text-meru-dark underline decoration-meru-accent underline-offset-4 transition hover:text-meru-accent"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}