"use client";

import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}

function ProfileContent() {
    const { user, logout } = useAuth();

    return (
        <main className="min-h-screen bg-meru-stone px-6 py-12 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-meru-muted transition hover:text-meru-dark"
                    >
                        <ArrowLeft size={15} strokeWidth={1.5} />
                        Back to store
                    </Link>

                    <span className="font-display text-2xl tracking-[0.14em] text-meru-dark">
                        MERU
                    </span>
                </div>

                {/* Title */}
                <div className="mt-16">
                    <div className="flex items-center gap-3">
                        <User
                            size={18}
                            strokeWidth={1.5}
                            className="text-meru-accent"
                        />

                        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-meru-accent">
                            My account
                        </p>
                    </div>

                    <h1 className="mt-4 font-display text-4xl text-meru-dark sm:text-5xl">
                        Profile
                    </h1>

                    <p className="mt-4 text-sm text-meru-muted">
                        Your MERU account information.
                    </p>
                </div>

                {/* User Information */}
                <div className="mt-12 border border-meru-border bg-[#F8F6F1]">
                    <div className="border-b border-meru-border px-6 py-5">
                        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-meru-muted">
                            Account details
                        </p>
                    </div>

                    <div className="grid gap-6 px-6 py-7 sm:grid-cols-2">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.14em] text-meru-muted">
                                Full name
                            </p>

                            <p className="mt-2 text-sm text-meru-dark">
                                {user?.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] uppercase tracking-[0.14em] text-meru-muted">
                                Email address
                            </p>

                            <p className="mt-2 text-sm text-meru-dark">
                                {user?.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] uppercase tracking-[0.14em] text-meru-muted">
                                Account status
                            </p>

                            <p className="mt-2 text-sm text-meru-dark">
                                {user?.isVerified
                                    ? "Verified"
                                    : "Not verified"}
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] uppercase tracking-[0.14em] text-meru-muted">
                                Account type
                            </p>

                            <p className="mt-2 text-sm capitalize text-meru-dark">
                                {user?.role}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                        href="/orders"
                        className="bg-meru-dark px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-meru-white! transition hover:bg-meru-slate"
                    >
                        View orders
                    </Link>

                    <button
                        onClick={logout}
                        className="border border-meru-border px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-meru-dark transition hover:border-meru-dark"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </main>
    );
}