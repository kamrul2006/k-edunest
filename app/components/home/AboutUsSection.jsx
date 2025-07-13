'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Slide } from 'react-awesome-reveal';

export const AboutUsSection = () => {
    return (
        <section className="relative bg-black text-blue-200 py-20 overflow-hidden lg:mt-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 px-6 gap-10 items-center ">

                {/* ---------- Text Section ---------- */}
                <Slide direction="left" triggerOnce>
                    <div className="space-y-6">
                        <p className="text-sm uppercase tracking-wide text-blue-300 font-semibold">
                            About K-Edunest
                        </p>
                        <h2 className="text-4xl lg:text-5xl font-bold leading-snug text-white">
                            Empowering Learners, Inspiring Futures
                        </h2>
                        <p className="text-blue-100 text-justify leading-relaxed">
                            At K-Edunest, we’re committed to reshaping the way people learn. Our platform blends creativity, technology,
                            and community to deliver impactful learning experiences. Whether you're a student, educator, or curious mind,
                            your journey starts here — and we're honored to be a part of it.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link href="/about">
                                <button className="btn btn-outline btn-primary hover:text-white hover:font-semibold text-blue-400 transition">
                                    Learn More About Us
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="btn btn-outline btn-primary hover:text-white hover:font-semibold text-blue-400 transition">
                                    Contact Us
                                </button>
                            </Link>
                        </div>
                    </div>
                </Slide>

                {/* ---------- Founder Info ---------- */}
                <Slide direction="right" triggerOnce>
                    <div className="space-y-6">
                        <p className="text-lg text-blue-100 text-justify leading-relaxed px-2 lg:px-0">
                            “K-Edunest was born from a passion to educate and elevate. We believe every learner deserves access to meaningful,
                            modern, and accessible education. Your trust fuels our mission.”
                        </p>

                        <div className="flex items-center gap-4 border border-blue-400 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl w-fit">
                            <Image
                                src="/pp.jpg"
                                alt="Kamrul Islam Apurba"
                                width={64}
                                height={64}
                                className="rounded-full border-2 border-blue-200 object-cover"
                            />
                            <div>
                                <p className="text-lg font-semibold text-white">Kamrul Islam Apurba</p>
                                <p className="text-sm text-blue-200">Founder and CEO, K-Edunest</p>
                            </div>
                        </div>
                    </div>
                </Slide>
            </div>

            {/* ---------- Decorative Circles ---------- */}
            <Image
                src="/circle.svg"
                alt="decorative circle"
                width={300}
                height={300}
                className="absolute bottom-0 -right-20 opacity-30 hidden lg:block"
            />
            <Image
                src="/circle.svg"
                alt="decorative circle"
                width={200}
                height={200}
                className="absolute top-0 -left-20 opacity-30 hidden lg:block"
            />
        </section>
    );
};
