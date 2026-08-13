"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            setMessage("Please enter your email address.");
            return;
        }

        setMessage("Thank you for joining the MERU Circle.");
        setEmail("");
    };

    return (
        <section className="bg-meru-menu px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-32">
            <div className="mx-auto max-w-4xl text-center">
                {/* Eyebrow */}
                <div className="flex items-center gap-4">
                    <span className="h-px flex-1 bg-meru-border" />

                    <p className="shrink-0 text-[10px] font-medium tracking-[0.22em] text-meru-accent sm:text-xs">
                        THE MERU CIRCLE
                    </p>

                    <span className="h-px flex-1 bg-meru-border" />
                </div>

                {/* Heading */}
                <h2 className="mt-8 font-display text-5xl leading-[0.95] text-meru-dark sm:text-6xl lg:text-7xl">
                    Stay closer to
                    <br />
                    <span className="italic text-meru-accent">
                        what inspires you.
                    </span>
                </h2>

                {/* Description */}
                <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-meru-muted sm:text-base">
                    New collections, thoughtful edits, and occasional inspiration from
                    the world of MERU — delivered when there&apos;s something worth
                    sharing.
                </p>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto mt-10 flex max-w-2xl flex-col sm:flex-row sm:items-center"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setMessage("");
                        }}
                        placeholder="Enter your email address"
                        className="min-h-16 flex-1 border border-meru-border bg-meru-stone px-5 text-sm text-meru-dark outline-none placeholder:text-meru-muted transition-colors duration-300 focus:border-meru-dark"
                        required
                    />

                    <button
                        type="submit"
                        className="group flex min-h-16 shrink-0 items-center justify-center gap-2 bg-meru-dark px-6 text-xs font-medium tracking-[0.14em] text-meru-white transition-all duration-300 hover:bg-meru-accent"
                    >
                        STAY CLOSE

                        <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </button>
                </form>

                {/* Feedback */}
                {message && (
                    <p className="mt-4 text-sm text-meru-accent">
                        {message}
                    </p>
                )}

                {/* Bottom Statement */}
                <p className="mx-auto mt-7 max-w-md text-xs leading-6 text-meru-muted">
                    A considered inbox. Only when there&apos;s something worth sharing.
                </p>
            </div>
        </section>
    );
}