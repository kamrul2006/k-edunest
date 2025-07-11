'use client';

import { Fade, Zoom } from "react-awesome-reveal";

const CollegeGallery = () => {
    const images = [
        { src: '/llgg.png', alt: 'Graduates Group 1' },
        { src: '/llgg.png', alt: 'Graduates Group 2' },
        { src: '/llgg.png', alt: 'Graduates Group 3' },
        { src: '/llgg.png', alt: 'Graduates Group 4' },
        { src: '/llgg.png', alt: 'Graduates Group 5' },
        { src: '/llgg.png', alt: 'Graduates Group 6' },
    ];

    return (
        <section className="py-20 bg-gray-100 lg:mt-10">
            <div className="max-w-7xl mx-auto px-4">
                <Fade cascade duration={500} triggerOnce>
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
                        🎓 College Image Gallery
                    </h2>
                    <p className="text-center text-gray-500 mb-12">
                        A glimpse of our proud graduates and cherished memories.
                    </p>
                </Fade>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((img, idx) => (
                        <Zoom key={idx} triggerOnce>
                            <div className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="text-white text-lg font-semibold">{img.alt}</span>
                                </div>
                            </div>
                        </Zoom>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CollegeGallery;
