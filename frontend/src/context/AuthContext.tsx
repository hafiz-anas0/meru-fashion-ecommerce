"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

interface User {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    isVerified: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
                {
                    credentials: "include",
                }
            );

            if (!response.ok) {
                setUser(null);
                return;
            }

            const data = await response.json();

            setUser(data.user);
        } catch (error) {
            console.error("Failed to fetch authenticated user:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            await refreshUser();
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const logout = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                console.error("Logout failed");
                return;
            }

            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                refreshUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}