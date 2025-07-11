'use client';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const collegeData = [
    {
        id: 1,
        name: 'Greenfield University',
        image: '/llgg.png',
        description: 'A top-tier institution for science and technology.',
    },
    {
        id: 2,
        name: 'Blue Ocean College',
        image: '/llgg.png',
        description: 'Renowned for marine biology and environmental science.',
    },
    {
        id: 3,
        name: 'TechNova Institute',
        image: '/llgg.png',
        description: 'Leading the way in engineering and innovation.',
    },
];

export default function CollegeSearchSection() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredColleges = collegeData.filter((college) =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="pt-32 px-4 max-w-7xl mx-auto text-white">
            {/* Search Input */}
            <div className="mb-10 relative w-full md:w-2/3 lg:w-1/2 mx-auto ">
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredColleges.length ? (
                    filteredColleges.map((college) => (
                        <div
                            key={college.id}
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
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {college.description}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-300 text-lg">
                        No colleges found.
                    </p>
                )}
            </div>
        </section>
    );
}
