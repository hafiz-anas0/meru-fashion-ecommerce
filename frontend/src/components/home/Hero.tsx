"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        const { left, top, width, height } =
            event.currentTarget.getBoundingClientRect();

        const x = (event.clientX - left) / width - 0.5;
        const y = (event.clientY - top) / height - 0.5;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[calc(100vh-80px)] min-h-125 w-full overflow-hidden bg-meru-stone"
        >
            {/* Hero Image */}
            <div
                className="absolute inset-0 bg-meru-stone/70 sm:bg-linear-to-r sm:from-meru-stone/95 sm:via-meru-stone/65 sm:to-transparent"
                style={{
                    transform: `translate(${position.x * 6}px, ${position.y * 6
                        }px)`,
                }}
            >
                <Image
                    src="/images/hero-model.png"
                    alt="MERU Pakistani fashion collection"
                    fill
                    priority
                    className="object-cover object-[65%_8%] sm:object-top"
                />
            </div>

            {/* Readability overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-meru-stone/95 via-meru-stone/65 to-transparent" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 sm:px-10 lg:px-12">

                {/* MERU Brand */}
                <div
                    className="mb-8 transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${position.x * -8}px, ${position.y * -8
                            }px)`,
                    }}
                >
                    <h2 className="font-display text-7xl leading-none tracking-widest text-meru-dark/60 sm:text-8xl lg:text-[9rem]">
                        MERU
                    </h2>

                    <p className="mt-2 text-[10px] font-medium tracking-[0.28em] text-meru-dark/45 sm:text-2xl">
                        FASHION & LIFESTYLE
                    </p>
                </div>

                {/* Main Hero Content */}
                <div
                    className="max-w-xl transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${position.x * -12}px, ${position.y * -12
                            }px)`,
                    }}
                >
                    <p className="text-xs font-medium tracking-[0.16em] text-meru-accent">
                        NEW COLLECTION — 01
                    </p>

                    <h1 className="mt-5 font-display text-4xl leading-[1.05] text-meru-dark sm:text-5xl lg:text-6xl">
                        Elevated essentials
                        <span className="italic"> for everyday life.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-sm leading-7 text-meru-muted sm:text-base">
                        Thoughtfully designed pieces inspired by tradition,
                        crafted for the rhythm of modern life.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/women"
                            className="hover:bg-meru-slate px-6 py-3 text-xs font-medium tracking-[0.12em] hover:text-white! transition-colors duration-200 bg-meru-accent text-black!"
                        >
                            SHOP WOMEN
                        </Link>

                        <Link
                            href="/men"
                            className="border border-meru-dark bg-meru-stone/40 px-6 py-3 text-xs font-medium tracking-[0.12em] text-meru-dark transition-all duration-200 hover:bg-meru-dark hover:text-white!"
                        >
                            SHOP MEN
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="mt-12 hidden items-center gap-3 text-xs tracking-[0.12em] text-meru-muted lg:flex">
                    <span className="h-px w-10 bg-meru-muted" />
                    SCROLL TO EXPLORE
                    <span className="h-px w-10 bg-meru-muted" />
                </div>
            </div>

            {/* Floating Card */}
            <div
                className="absolute bottom-8 right-6 z-20 hidden max-w-52.5 border border-meru-border bg-meru-menu/95 p-5 shadow-lg transition-transform duration-700 ease-out lg:block lg:right-12"
                style={{
                    transform: `translate(${position.x * -20}px, ${position.y * -20
                        }px)`,
                }}
            >
                <p className="text-xs tracking-[0.14em] text-meru-accent">
                    THE EDIT
                </p>

                <p className="mt-2 font-display text-xl leading-snug text-meru-dark">
                    Tradition, considered differently.
                </p>

                <Link
                    href="/new-in"
                    className="mt-4 inline-block text-xs tracking-widest text-meru-dark transition-colors duration-200 hover:text-meru-accent"
                >
                    VIEW THE EDIT →
                </Link>
            </div>


        </section>
    );
}