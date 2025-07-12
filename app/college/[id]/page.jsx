'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { FaCalendarAlt, FaFlask, FaRunning, FaUniversity, FaStar } from 'react-icons/fa';
import { Slide, Fade } from 'react-awesome-reveal';
import Navbar from '@/app/components/Fixed/NavBar';
import Footer from '@/app/components/Fixed/Footer';

export default function CollegeDetails() {
    const { id } = useParams();
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/college/${id}`)
            .then(res => {
                setCollege(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError('College not found');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center py-24 text-xl text-gray-600">Loading college details...</div>;
    }

    if (error || !college) {
        return <div className="text-center py-24 text-red-500 text-xl font-semibold">{error || 'Something went wrong'}</div>;
    }

    return (
        <div className='bg-white'>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-16 text-black bg-white">
                <Fade triggerOnce>
                    <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-80 object-cover rounded-xl shadow-xl mb-10"
                    />
                </Fade>

                <Slide direction="up" triggerOnce>
                    <h1 className="text-4xl font-bold text-blue-800 flex items-center gap-3 mb-2">
                        <FaUniversity className="text-blue-600" /> {college.name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-700 mb-8">
                        <p className="flex items-center gap-2">
                            <FaCalendarAlt className="text-green-600" /> Admission Date: {college.admissionDate}
                        </p>
                        <p className="flex items-center gap-2">
                            <FaFlask className="text-red-600" /> Research: {college.researchCount}+ Publications
                        </p>
                        <p className="flex items-center gap-2">
                            <FaStar className="text-yellow-500" /> Rating: {college.rating}
                        </p>
                    </div>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📖 Description</h2>
                        <p className="text-gray-700 leading-relaxed">{college.description}</p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎉 Events</h2>
                        <ul className="space-y-3">
                            {college.events?.map((event, i) => (
                                <li key={i} className="bg-blue-50 px-4 py-3 rounded shadow-sm text-gray-700">
                                    {event}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🏅 Sports</h2>
                        <p className="text-gray-700">{college.sports?.join(', ')}</p>
                    </section>
                </Slide>
            </div>
            <Footer />
        </div>
    );
}
