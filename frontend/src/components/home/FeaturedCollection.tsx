import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";

import featuredProducts from "@/data/featuredProducts";

export default function FeaturedCollection() {
    return (
        <section className="bg-meru-stone px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-[1600px]">
                {/* Section Header */}
                <div className="border-b border-meru-border pb-8 text-center sm:pb-10">
                    <div className="mx-auto flex max-w-2xl flex-col items-center">
                        <h2 className="font-display text-5xl leading-[0.95] text-meru-dark sm:text-6xl lg:text-7xl">
                            Featured Collection
                        </h2>

                        <h3 className="mt-4 font-display text-2xl italic text-meru-muted sm:text-3xl">
                            The Autumn Edit
                        </h3>

                        <p className="mt-5 max-w-lg text-sm leading-7 text-meru-muted sm:text-base">
                            A considered selection of pieces designed for everyday elegance.
                        </p>

                        <Link
                            href="/collections"
                            className="group mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-meru-dark transition-colors duration-200 hover:text-meru-accent"
                        >
                            VIEW ALL
                            <ArrowUpRight
                                size={16}
                                className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>
                    </div>
                </div>
                {/* Products Grid */}
                <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6">
                    {featuredProducts.map((product) => (
                        <article
                            key={product.id}
                            className="group overflow-hidden bg-meru-menu shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-4/5 overflow-hidden">
                                <Link
                                    href={`/products/${product.id}`}
                                    className="block h-full w-full"
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                    />
                                </Link>

                                {/* Wishlist Button */}
                                <button
                                    type="button"
                                    aria-label={`Add ${product.name} to wishlist`}
                                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-meru-menu/95 text-meru-dark shadow-sm transition-all duration-200 hover:bg-meru-dark hover:text-meru-white"
                                >
                                    <Heart size={18} strokeWidth={1.5} />
                                </button>
                            </div>

                            {/* Product Information */}
                            <div className="p-4 sm:p-5">
                                <p className="text-[10px] font-medium tracking-[0.14em] text-meru-accent sm:text-xs">
                                    {product.category.toUpperCase()}
                                </p>

                                <Link
                                    href={`/products/${product.id}`}
                                    className="mt-2 block font-body text-sm font-medium text-meru-dark transition-colors duration-200 hover:text-meru-accent sm:text-base"
                                >
                                    {product.name}
                                </Link>

                                <p className="mt-1 text-sm text-meru-muted">
                                    Rs. {product.price.toLocaleString()}
                                </p>

                                {/* Add To Bag */}
                                <button
                                    type="button"
                                    className="mt-5 flex w-full items-center justify-center gap-4 bg-meru-slate px-4 py-3 font-medium tracking-[0.12em] text-white! transition-colors duration-200 hover:bg-meru-accent"
                                >
                                    <ShoppingBag size={16} strokeWidth={1.5} />
                                    <span className="text-sm">
                                        ADD TO BAG
                                    </span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}