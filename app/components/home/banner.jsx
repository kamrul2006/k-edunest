'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Fade, Slide } from 'react-awesome-reveal';

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white min-h-[90vh] flex items-center justify-center px-6 md:px-16 lg:min-h-screen overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="/banbg.jpg"
                    alt="College Background"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl text-center space-y-6 px-4">
                <Slide direction="up" cascade damping={0.2}  >
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 animate-text-shine">
                        Discover & Book Top Colleges Easily
                    </h1>
                    <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
                        Browse, compare, and apply to the best colleges with just a few clicks. Get started with a smooth admission process today!
                    </p>
                </Slide>

                <Fade cascade delay={300}  >

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6">
                        <Link href={'/colleges'} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-xl transition-all duration-300 ring-2 ring-blue-400 hover:ring-cyan-300">
                            Explore Colleges
                        </Link>

                        <Link href={'/admission'} className="bg-white text-blue-800 font-semibold py-3 px-8 rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 ring-2 ring-blue-400 hover:ring-cyan-300">
                            Admission Guide
                        </Link>
                    </div>

                </Fade>
            </div>

            {/* Text shine animation */}
            <style jsx>{`
                @keyframes textShine {
                    0% {
                        background-position: -200%;
                    }
                    100% {
                        background-position: 200%;
                    }
                }
                .animate-text-shine {
                    background-size: 200% 100%;
                    animation: textShine 3s linear infinite;
                }
            `}</style>
        </section>
    );
}
