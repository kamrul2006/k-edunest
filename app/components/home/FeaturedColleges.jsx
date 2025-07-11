'use client';

import Link from 'next/link';

const featuredColleges = [
    {
        id: 'greenfield-university',
        name: 'Greenfield University',
        image: '/colleges/greenfield.jpg',
        admissionDate: 'Aug 10 - Sep 15',
        events: ['Science Fair', 'Hackathon'],
        research: 'Focus on AI, Machine Learning, Renewable Energy',
        sports: ['Football', 'Basketball', 'Swimming'],
    },
    {
        id: 'blue-ocean-college',
        name: 'Blue Ocean College',
        image: '/colleges/blueocean.jpg',
        admissionDate: 'Jul 01 - Aug 20',
        events: ['Marine Fest', 'Environmental Summit'],
        research: 'Marine Biology, Ocean Cleanup Tech',
        sports: ['Water Polo', 'Rowing', 'Beach Volleyball'],
    },
    {
        id: 'technova-institute',
        name: 'TechNova Institute',
        image: '/colleges/technova.jpg',
        admissionDate: 'Sep 01 - Oct 10',
        events: ['Robotics Expo', 'Tech Talks'],
        research: 'Robotics, Quantum Computing, IoT',
        sports: ['Esports', 'Badminton', 'Cricket'],
    },
];

export default function FeaturedColleges() {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-100 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
                🌟 Featured Colleges
            </h2>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {featuredColleges.map((college) => (
                    <div
                        key={college.id}
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
                            <p>
                                <span className="font-semibold text-gray-700">Admission Dates:</span>{' '}
                                {college.admissionDate}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Events:</span>{' '}
                                {college.events.join(', ')}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Research:</span>{' '}
                                {college.research}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Sports:</span>{' '}
                                {college.sports.join(', ')}
                            </p>
                            <Link href={`/college/${college.id}`}>
                                <button className="mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
