'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaStar, FaCalendarAlt, FaFlask } from 'react-icons/fa';
import { Zoom } from 'react-awesome-reveal';

export default function CollegesPage() {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/college')
            .then(res => {
                setColleges(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch colleges:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-20 text-xl font-semibold text-gray-600 min-h-screen">
                Loading colleges...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-500 to-purple-600 mb-12">
                Explore Top Colleges
            </h1>
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {colleges.map(college => (
                    <Zoom key={college.id} triggerOnce>
                        <div className="bg-white/20 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl overflow-hidden hover:shadow-blue-500/40 transition duration-500 transform hover:-translate-y-2">
                            <img
                                src={college.image}
                                alt={college.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6 space-y-3">
                                <h2 className="text-2xl font-bold text-white drop-shadow-md">
                                    {college.name}
                                </h2>
                                <div className="flex items-center text-sm text-gray-200 space-x-3">
                                    <span className="flex items-center gap-1">
                                        <FaStar className="text-yellow-300" /> {college.rating}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaCalendarAlt className="text-green-300" /> {college.admissionDate}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-100 flex items-center gap-2">
                                    <FaFlask className="text-cyan-300" /> Research Publications: {college.researchCount}
                                </p>
                                <Link
                                    href={`/college/${college._id}`}
                                    className="inline-block mt-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:brightness-110 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </Zoom>
                ))}
            </div>
        </div>
    );
}
