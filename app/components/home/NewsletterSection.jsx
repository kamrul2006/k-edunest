'use client';

import React from 'react';
import { Slide } from 'react-awesome-reveal';

export const NewsletterSection = () => {
    return (
        <section className="bg-blue-800 text-white py-20 px-6 relative overflow-hidden max-w-5xl mx-auto my-10 rounded-3xl">
            <div className="max-w-5xl mx-auto text-center space-y-10">
                <Slide direction="up" triggerOnce>
                    <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-bold text-pink-200">
                            Subscribe to Our Newsletter
                        </h2>
                        <p className="text-pink-100 text-lg max-w-2xl mx-auto leading-relaxed">
                            Stay informed with the latest educational insights, courses, and K-Edunest updates—delivered straight to your inbox.
                        </p>
                    </div>
                </Slide>

                <Slide direction="up" delay={100} triggerOnce>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="px-5 py-3 w-full sm:w-2/3 rounded-xl border border-blue-200 text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-pink-300"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Subscribe
                        </button>
                    </form>
                </Slide>
            </div>

            {/* Decorative SVG or BG */}
            <img
                src="/circle.svg"
                alt="decorative circle"
                className="absolute opacity-20 -bottom-10 -left-10 w-60 hidden lg:block"
            />
            <img
                src="/circle.svg"
                alt="decorative circle"
                className="absolute opacity-20 -top-10 -right-10 w-40 hidden lg:block"
            />
        </section>
    );
};
