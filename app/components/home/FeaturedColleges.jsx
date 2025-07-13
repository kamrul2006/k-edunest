'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function FeaturedColleges() {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const res = await axios.get('https://k-edunest-server.vercel.app/college');
                setColleges(res.data);
            } catch (error) {
                console.error('Error fetching colleges:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchColleges();
    }, []);

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-100 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
                Featured Colleges
            </h2>

            {loading ? (
                <p className="text-center text-gray-600">Loading featured colleges...</p>
            ) : (
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {colleges.map((college) => (
                        <div
                            key={college._id}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                        >
                            <img
                                src={college.image}
                                alt={college.name}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6 space-y-3">
                                <h3 className="text-2xl font-semibold text-blue-800">
                                    {college.name}
                                </h3>

                                {college.admissionDates && (
                                    <p>
                                        <span className="font-semibold text-gray-700">Admission Dates:</span>{' '}
                                        {college.admissionDates}
                                    </p>
                                )}

                                {college.events?.length > 0 && (
                                    <p>
                                        <span className="font-semibold text-gray-700">Events:</span>{' '}
                                        {college.events.join(', ')}
                                    </p>
                                )}

                                {college.research && (
                                    <p>
                                        <span className="font-semibold text-gray-700">Research:</span>{' '}
                                        {college.research}
                                    </p>
                                )}

                                {college.sports?.length > 0 && (
                                    <p>
                                        <span className="font-semibold text-gray-700">Sports:</span>{' '}
                                        {college.sports.join(', ')}
                                    </p>
                                )}

                                <Link href={`/college/${college._id}`}>
                                    <button className="mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
