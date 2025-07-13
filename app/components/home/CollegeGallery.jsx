'use client';

import { useEffect, useState } from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import axios from 'axios';

const CollegeGallery = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const res = await axios.get('https://k-edunest-server.vercel.app/college');
                setColleges(res.data); // Full college objects
            } catch (error) {
                console.error('Failed to fetch colleges:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchColleges();
    }, []);

    return (
        <section className="py-20 bg-gray-100 lg:mt-10">
            <div className="max-w-7xl mx-auto px-4">
                <Fade cascade duration={500}  >
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
                        College Image Gallery
                    </h2>
                    <p className="text-center text-gray-500 mb-12">
                        A glimpse of our proud graduates and cherished memories.
                    </p>
                </Fade>

                {loading ? (
                    <p className="text-center text-gray-600">Loading gallery...</p>
                ) : colleges.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {colleges.map((college, idx) => (
                            <Zoom key={college._id || idx}  >
                                <div className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105">
                                    <img
                                        src={college.image}
                                        alt={college.name || `College ${idx + 1}`}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <span className="text-white text-lg font-semibold">
                                            {college.name}
                                        </span>
                                    </div>
                                </div>
                            </Zoom>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No college images found.</p>
                )}
            </div>
        </section>
    );
};

export default CollegeGallery;
