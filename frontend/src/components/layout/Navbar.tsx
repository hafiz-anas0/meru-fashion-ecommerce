"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    Heart,
    LogOut,
    Menu,
    Search,
    ShoppingCart,
    User,
    X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
    { label: "NEW IN", href: "/new-in" },
    { label: "WOMEN", href: "/women" },
    { label: "MEN", href: "/men" },
    { label: "BEAUTY", href: "/beauty" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);

    const pathname = usePathname();

    const { user, loading, logout } = useAuth();

    const handleLogout = async () => {
        setIsAccountOpen(false);
        setIsMenuOpen(false);

        await logout();
    };

    return (
        <header className="sticky top-0 z-50 border-b border-meru-border bg-meru-stone">
            <div className="mx-auto flex h-20 max-w-[1600px] items-center px-5 sm:px-6 lg:px-12">
                {/* Logo */}
                <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <span className="font-display text-2xl tracking-[0.18em] text-meru-dark/75 sm:text-3xl">
                        MERU
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`relative py-2 text-xs tracking-widest transition-colors duration-200 hover:text-meru-accent ${isActive
                                        ? "text-meru-accent"
                                        : "text-meru-dark"
                                    }`}
                            >
                                {link.label}

                                <span
                                    className={`absolute bottom-0 left-0 h-px bg-meru-accent transition-all duration-200 ${isActive ? "w-full" : "w-0"
                                        }`}
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions */}
                <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
                    {/* Desktop Search */}
                    <div className="hidden items-center border-b border-meru-border pb-1 lg:flex">
                        <Search
                            size={17}
                            strokeWidth={1.5}
                            className="text-meru-muted"
                        />

                        <input
                            type="text"
                            placeholder="Search"
                            className="ml-2 w-28 bg-transparent text-sm outline-none placeholder:text-meru-muted"
                        />
                    </div>

                    {/* Wishlist */}
                    <Link
                        href="/wishlist"
                        aria-label="Wishlist"
                        className="transition-colors duration-200 hover:text-meru-accent"
                    >
                        <Heart size={20} strokeWidth={1.5} />
                    </Link>

                    {/* Cart */}
                    <Link
                        href="/cart"
                        aria-label="Shopping cart"
                        className="transition-colors duration-200 hover:text-meru-accent"
                    >
                        <ShoppingCart size={20} strokeWidth={1.5} />
                    </Link>

                    {/* Desktop Account */}
                    {!loading && (
                        <>
                            {!user ? (
                                <Link
                                    href="/login"
                                    className="hidden items-center gap-2 text-xs tracking-[0.08em] transition-colors duration-200 hover:text-meru-accent lg:flex"
                                >
                                    <User
                                        size={18}
                                        strokeWidth={1.5}
                                    />
                                    <span>SIGN IN</span>
                                </Link>
                            ) : (
                                <div className="relative hidden lg:block">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsAccountOpen(
                                                !isAccountOpen
                                            )
                                        }
                                        className="flex items-center gap-2 text-xs tracking-[0.08em] transition-colors duration-200 hover:text-meru-accent"
                                        aria-expanded={isAccountOpen}
                                    >
                                        <User
                                            size={18}
                                            strokeWidth={1.5}
                                        />

                                        <span>
                                            {user.name.toUpperCase()}
                                        </span>
                                    </button>

                                    {/* Account Dropdown */}
                                    {isAccountOpen && (
                                        <div className="absolute right-0 top-full mt-4 w-56 border border-meru-border bg-meru-menu p-2 shadow-lg">
                                            <div className="border-b border-meru-border px-4 py-3">
                                                <p className="text-xs font-medium text-meru-dark">
                                                    {user.name}
                                                </p>

                                                <p className="mt-1 truncate text-[11px] text-meru-muted">
                                                    {user.email}
                                                </p>
                                            </div>

                                            <Link
                                                href="/account"
                                                onClick={() =>
                                                    setIsAccountOpen(false)
                                                }
                                                className="mt-1 block px-4 py-3 text-xs tracking-[0.08em] transition-colors hover:bg-meru-stone hover:text-meru-accent"
                                            >
                                                MY ACCOUNT
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-3 px-4 py-3 text-xs tracking-[0.08em] text-meru-dark transition-colors hover:bg-meru-stone hover:text-meru-accent"
                                            >
                                                <LogOut
                                                    size={16}
                                                    strokeWidth={1.5}
                                                />

                                                SIGN OUT
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() =>
                            setIsMenuOpen(!isMenuOpen)
                        }
                        aria-label={
                            isMenuOpen
                                ? "Close menu"
                                : "Open menu"
                        }
                        className="flex items-center justify-center transition-colors duration-200 hover:text-meru-accent lg:hidden"
                    >
                        {isMenuOpen ? (
                            <X
                                size={22}
                                strokeWidth={1.5}
                            />
                        ) : (
                            <Menu
                                size={22}
                                strokeWidth={1.5}
                            />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute left-0 right-0 top-full border-b border-meru-border bg-meru-menu shadow-lg lg:hidden">
                    <div className="mx-auto max-w-[1600px] px-6 py-7">
                        {/* Search */}
                        <div className="flex items-center border-b border-meru-border pb-3">
                            <Search
                                size={18}
                                strokeWidth={1.5}
                                className="text-meru-muted"
                            />

                            <input
                                type="text"
                                placeholder="Search products"
                                className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-meru-muted"
                            />
                        </div>

                        {/* Navigation */}
                        <nav className="mt-7 flex flex-col">
                            {navLinks.map((link) => {
                                const isActive =
                                    pathname === link.href;

                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() =>
                                            setIsMenuOpen(false)
                                        }
                                        className={`border-b border-meru-border py-4 text-sm tracking-widest transition-colors duration-200 hover:text-meru-accent ${isActive
                                                ? "text-meru-accent"
                                                : "text-meru-dark"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile Account */}
                        {!loading && (
                            <>
                                {!user ? (
                                    <Link
                                        href="/login"
                                        onClick={() =>
                                            setIsMenuOpen(false)
                                        }
                                        className="mt-7 flex items-center gap-3 text-sm tracking-[0.08em] transition-colors duration-200 hover:text-meru-accent"
                                    >
                                        <User
                                            size={19}
                                            strokeWidth={1.5}
                                        />
                                        SIGN IN
                                    </Link>
                                ) : (
                                    <div className="mt-7">
                                        <div className="flex items-center gap-3">
                                            <User
                                                size={19}
                                                strokeWidth={1.5}
                                            />

                                            <div>
                                                <p className="text-sm font-medium text-meru-dark">
                                                    {user.name}
                                                </p>

                                                <p className="mt-0.5 text-[11px] text-meru-muted">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href="/account"
                                            onClick={() =>
                                                setIsMenuOpen(false)
                                            }
                                            className="mt-5 block border-t border-meru-border pt-4 text-sm tracking-[0.08em] transition-colors hover:text-meru-accent"
                                        >
                                            MY ACCOUNT
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="mt-4 flex items-center gap-3 text-sm tracking-[0.08em] transition-colors hover:text-meru-accent"
                                        >
                                            <LogOut
                                                size={18}
                                                strokeWidth={1.5}
                                            />
                                            SIGN OUT
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}