'use client';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CollegeSearchSection() {
    const [searchTerm, setSearchTerm] = useState('');
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const res = await axios.get('https://k-edunest-server.vercel.app/college');
                setColleges(res.data);
            } catch (error) {
                console.error('Failed to fetch colleges:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchColleges();
    }, []);

    const filteredColleges = searchTerm
        ? colleges.filter((college) =>
            college.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : colleges.slice(0, 3); // Show only first 3 if no search

    return (
        <section className="pt-32 px-4 max-w-7xl mx-auto text-white">
            {/* Search Input */}
            <div className="mb-10 relative w-full md:w-2/3 lg:w-1/2 mx-auto">
                <input
                    type="text"
                    placeholder="Search for a college..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-3 text-gray-900 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-400 border-2 border-blue-500"
                />
                <FaSearch className="absolute right-4 top-3 text-gray-500" />
            </div>

            {/* College Cards */}
            {loading ? (
                <p className="text-center text-lg text-gray-300">Loading colleges...</p>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredColleges.length ? (
                        filteredColleges.map((college) => (
                            <div
                                key={college._id}
                                className="bg-gradient-to-br from-white via-gray-50 to-gray-200 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <img
                                    src={college.image}
                                    alt={college.name}
                                    className="w-full h-48 object-cover border-b-4 border-cyan-500"
                                />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-blue-800 mb-3 tracking-wide">
                                        {college.name}
                                    </h3>
                                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                        {college.description}
                                    </p>
                                    <button
                                        onClick={() => router.push(`/college/${college._id}`)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-300 text-lg">
                            No colleges found.
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}
