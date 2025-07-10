'use client';
import Image from 'next/image';

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white min-h-[90vh] flex items-center justify-center px-6 md:px-16">
            <div className="absolute inset-0">
                <Image
                    src="/banbg.jpg"
                    alt="College Background"
                    fill
                    className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
            </div>

            <div className="relative z-10 max-w-4xl text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-up">
                    Discover & Book Top Colleges Easily
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto animate-fade-up delay-100">
                    Browse, compare, and apply to the best colleges with just a few clicks. Get started with a smooth admission process today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-200">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300">
                        Explore Colleges
                    </button>
                    <button className="bg-white text-blue-800 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300">
                        Admission Guide
                    </button>
                </div>
            </div>
        </section>
    );
}
