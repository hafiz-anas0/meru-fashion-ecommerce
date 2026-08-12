import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const shopLinks = [
    { label: "New In", href: "/new-in" },
    { label: "Women", href: "/women" },
    { label: "Men", href: "/men" },
    { label: "Beauty", href: "/beauty" },
];

const helpLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "FAQ", href: "/faq" },
];

const accountLinks = [
    { label: "Sign In", href: "/login" },
    { label: "Create Account", href: "/signup" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Order Tracking", href: "/orders" },
];

export default function Footer() {
    return (
        <footer className="bg-meru-dark text-meru-stone">
            <div className="mx-auto max-w-[1600px] px-6 py-12 sm:px-10 lg:px-12">
                {/* Main Footer */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-5">

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link
                            href="/"
                            className="font-display text-3xl tracking-[0.12em] transition-colors duration-200 hover:text-meru-accent"
                        >
                            MERU
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-meru-border">
                            A considered approach to modern fashion and everyday style.
                            Thoughtfully curated for the way you live.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-xs font-medium tracking-[0.14em]">
                            SHOP
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {shopLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-meru-border transition-colors duration-200 hover:text-meru-accent"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="text-xs font-medium tracking-[0.14em]">
                            HELP
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {helpLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-meru-border transition-colors duration-200 hover:text-meru-accent"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-xs font-medium tracking-[0.14em]">
                            ACCOUNT
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {accountLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-meru-border transition-colors duration-200 hover:text-meru-accent"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Follow */}
                    <div>
                        <h3 className="text-xs font-medium tracking-[0.14em]">
                            FOLLOW
                        </h3>

                        <div className="mt-5 flex items-center gap-5">
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-lg text-meru-border transition-colors duration-200 hover:text-meru-accent"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="text-lg text-meru-border transition-colors duration-200 hover:text-meru-accent"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="#"
                                aria-label="Twitter"
                                className="text-lg text-meru-border transition-colors duration-200 hover:text-meru-accent"
                            >
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#4A4943] pt-6 text-xs text-meru-border">
                    <p>© 2026 MERU. All rights reserved.</p>

                    <p>
                        Powered by{" "}
                        <a
                            href="https://hafizanasmajid.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-meru-stone transition-colors duration-200 hover:text-meru-accent"
                        >
                            HAM
                        </a>
                    </p>

                    <div className="flex items-center gap-5">
                        <Link
                            href="/privacy"
                            className="transition-colors duration-200 hover:text-meru-accent"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition-colors duration-200 hover:text-meru-accent"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}