"use client";

import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";

export default function OrdersPage() {
    return (
        <ProtectedRoute>
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
                            <Package
                                size={18}
                                strokeWidth={1.5}
                                className="text-meru-accent"
                            />

                            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-meru-accent">
                                Your purchases
                            </p>
                        </div>

                        <h1 className="mt-4 font-display text-4xl text-meru-dark sm:text-5xl">
                            Orders
                        </h1>

                        <p className="mt-4 text-sm text-meru-muted">
                            View your previous MERU orders here.
                        </p>
                    </div>

                    {/* Empty State */}
                    <div className="mt-12 border border-meru-border bg-[#F8F6F1] px-6 py-16 text-center">
                        <Package
                            size={32}
                            strokeWidth={1}
                            className="mx-auto text-meru-accent"
                        />

                        <h2 className="mt-5 font-display text-2xl text-meru-dark">
                            No orders yet
                        </h2>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-meru-muted">
                            Your orders will appear here once you make your
                            first purchase.
                        </p>

                        <Link
                            href="/"
                            className="mt-7 inline-flex bg-meru-dark px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-meru-white! transition hover:bg-meru-slate"
                        >
                            Start shopping
                        </Link>
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}