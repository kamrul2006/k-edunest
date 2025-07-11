'use client';

// import { Gallery } from 'react-photo-gallery';
import { motion } from 'framer-motion';
import Gallery from 'react-photo-gallery';

const photos = [
    {
        src: '/graduates/grad1.jpg',
        width: 4,
        height: 3,
    },
    {
        src: '/graduates/grad2.jpg',
        width: 3,
        height: 2,
    },
    {
        src: '/graduates/grad3.jpg',
        width: 3,
        height: 4,
    },
    {
        src: '/graduates/grad4.jpg',
        width: 4,
        height: 3,
    },
    {
        src: '/graduates/grad5.jpg',
        width: 3,
        height: 2,
    },
    {
        src: '/graduates/grad6.jpg',
        width: 3,
        height: 2,
    },
];

const imageRenderer = ({ index, left, top, key, photo }) => (
    <motion.div
        key={key}
        style={{ position: 'absolute', left, top }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="group overflow-hidden rounded-lg shadow-md"
    >
        <img
            src={photo.src}
            alt={`Graduate ${index + 1}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white text-lg font-semibold">🎓 Graduate Group</span>
        </div>
    </motion.div>
);

export default function CollegeGallery() {
    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-blue-800 mb-4">🎉 College Graduates Gallery</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Take a look at some memorable group photos from past graduation ceremonies.
                </p>
            </div>

            <div className="relative" style={{ height: 'auto' }}>
                <Gallery photos={photos} renderImage={imageRenderer} />
            </div>
        </section>
    );
}
