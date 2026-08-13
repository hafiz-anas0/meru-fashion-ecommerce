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
            <div className="mx-auto max-w-[1600px] px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16">

                {/* Main Footer */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-12 md:grid-cols-4 lg:grid-cols-5 lg:gap-12">

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <Link
                            href="/"
                            className="font-display text-3xl tracking-[0.12em] transition-colors duration-200 hover:text-meru-accent"
                        >
                            MERU
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-meru-border lg:max-w-xs">
                            A considered approach to modern fashion and everyday
                            style. Thoughtfully curated for the way you live.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-xs font-medium tracking-[0.14em]">
                            SHOP
                        </h3>

                        <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
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

                        <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
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

                        <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
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

                        <div className="mt-4 flex items-center gap-5 sm:mt-5">
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
                <div className="mt-10 flex flex-col items-center gap-4 border-t border-[#4A4943] pt-6 text-center text-xs text-meru-border sm:mt-12 sm:gap-5 sm:flex-row sm:justify-between sm:text-left">

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