import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import categories from "@/data/categories";

export default function ShopByCategory() {
    return (
        <section className="bg-meru-stone px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-[1600px]">
                {/* Section Header */}
                <div className="mb-10 text-center lg:mb-14">
                    <p className="text-xs font-medium tracking-[0.16em] text-meru-accent">
                        DISCOVER MERU
                    </p>

                    <h2 className="mt-4 font-display text-5xl leading-[0.95] text-meru-dark sm:text-6xl lg:text-7xl">
                        Shop by Category
                    </h2>

                    <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-meru-muted sm:text-base">
                        Explore collections designed for every expression of style.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className="group relative block aspect-4/5 overflow-hidden"
                        >
                            <Image
                                src={category.image}
                                alt={`MERU ${category.name} collection`}
                                fill
                                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-meru-dark/80 via-meru-dark/20 to-transparent transition-opacity duration-300 group-hover:from-meru-dark/90" />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">
                                <div>
                                    <p className="mb-2 text-[10px] font-medium tracking-[0.16em] text-meru-white/70 sm:text-xs">
                                        EXPLORE
                                    </p>

                                    <h3 className="font-display text-3xl text-meru-white sm:text-4xl">
                                        {category.name}
                                    </h3>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center border border-meru-white/50 text-meru-white transition-all duration-300 group-hover:bg-meru-white group-hover:text-meru-dark">
                                    <ArrowUpRight
                                        size={19}
                                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}