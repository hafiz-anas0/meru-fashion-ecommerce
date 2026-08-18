"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-meru-stone">
                <p className="text-xs uppercase tracking-[0.18em] text-meru-muted">
                    Loading...
                </p>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}