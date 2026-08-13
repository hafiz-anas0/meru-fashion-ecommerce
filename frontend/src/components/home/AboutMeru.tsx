import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutMeru() {
    return (
        <section className="bg-meru-stone px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-[1600px]">
                {/* Section Header */}
                <div className="mb-10 text-center lg:mb-14">
                    <p className="text-xs font-medium tracking-[0.16em] text-meru-accent">
                        ABOUT MERU
                    </p>

                    <h2 className="mt-4 font-display text-5xl leading-[0.95] text-meru-dark sm:text-6xl lg:text-7xl">
                        The MERU Story
                    </h2>

                    <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-meru-muted sm:text-base">
                        Discover the inspiration, heritage, and modern perspective behind
                        the world of MERU.
                    </p>
                </div>

                {/* Editorial Content */}
                <div className="grid overflow-hidden lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative min-h-80 sm:min-h-112.5 lg:min-h-155">
                        <Image
                            src="/images/about-meru.png"
                            alt="MERU heritage and contemporary fashion"
                            fill
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex items-center bg-meru-menu px-6 py-14 sm:px-12 sm:py-16 lg:px-16 xl:px-20">
                        <div className="max-w-xl">
                            <p className="text-xs font-medium tracking-[0.16em] text-meru-accent">
                                OUR PHILOSOPHY
                            </p>

                            <h3 className="mt-5 font-display text-4xl leading-[1.05] text-meru-dark sm:text-5xl lg:text-6xl">
                                Heritage, reimagined
                                <br />
                                <span className="italic">for today.</span>
                            </h3>

                            <p className="mt-7 max-w-lg text-sm leading-7 text-meru-muted sm:text-base">
                                MERU brings together the richness of Pakistani heritage and the
                                simplicity of contemporary design, creating a world of fashion
                                and lifestyle made for modern everyday expression.
                            </p>

                            <Link
                                href="/about"
                                className="group mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-meru-dark transition-colors duration-200 hover:text-meru-accent"
                            >
                                DISCOVER OUR STORY
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}