'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import {
    FaCalendarAlt,
    FaFlask,
    FaRunning,
    FaUniversity,
    FaStar,
    FaBookOpen,
    FaCalendarCheck,
    FaTrophy
} from 'react-icons/fa';
import { Slide, Fade } from 'react-awesome-reveal';
import Navbar from '@/app/components/Fixed/NavBar';
import Footer from '@/app/components/Fixed/Footer';
import { auth } from '@/app/firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

export default function CollegeDetails() {
    const { id } = useParams();
    const router = useRouter();

    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;
        axios.get(`https://k-edunest-server.vercel.app/college/${id}`)
            .then(res => {
                setCollege(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('College not found');
                setLoading(false);
            });
    }, [id, user]);

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 flex flex-col items-center justify-center text-white px-4">
                <Navbar />


                <Fade>
                    <div className='min-h-screen flex items-center justify-center'>
                        <div className="bg-white text-center text-gray-800 rounded-3xl shadow-2xl p-10 max-w-md w-full">
                            <h1 className="text-3xl font-bold mb-3">You’re not logged in</h1>
                            <p className="text-gray-600 mb-6">
                                Please sign in to view the details of this college and access more features.
                            </p>
                            <button
                                onClick={() => router.push('/login')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-300"
                            >
                                Go to Login
                            </button>
                        </div>
                    </div>
                </Fade>


                <Footer />
            </div>
        );
    }

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
                <Fade>
                    <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-80 object-cover rounded-xl shadow-xl mb-10"
                    />
                </Fade>

                <Slide direction="up">
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
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <FaBookOpen className="text-indigo-600" /> Description
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{college.description}</p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCalendarCheck className="text-blue-500" /> Events
                        </h2>
                        <ul className="space-y-3">
                            {college.events?.map((event, i) => (
                                <li key={i} className="bg-blue-50 px-4 py-3 rounded shadow-sm text-gray-700">
                                    {event}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTrophy className="text-yellow-500" /> Sports
                        </h2>
                        <p className="text-gray-700">{college.sports?.join(', ')}</p>
                    </section>
                </Slide>
            </div>


            <Footer />
        </div>
    );
}
