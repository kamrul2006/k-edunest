import { notFound } from 'next/navigation';

const collegeData = [
    {
        id: 'greenfield-university',
        name: 'Greenfield University',
        image: '/colleges/greenfield.jpg',
        admissionProcess: 'Submit online form, attend interview, receive acceptance letter.',
        events: [
            { title: 'Science Fair', date: 'Sep 5, 2025', description: 'Students exhibit scientific innovations.' },
            { title: 'Hackathon', date: 'Oct 12, 2025', description: '24-hour coding competition.' },
        ],
        researchWorks: [
            'AI in Agriculture',
            'Smart Traffic Systems',
            'Green Energy Solutions',
        ],
        sports: ['Football', 'Basketball', 'Swimming'],
    },
    {
        id: 'blue-ocean-college',
        name: 'Blue Ocean College',
        image: '/colleges/blueocean.jpg',
        admissionProcess: 'Apply through the college portal, upload documents, await confirmation.',
        events: [
            { title: 'Marine Fest', date: 'Jul 20, 2025', description: 'Celebrate marine life and conservation.' },
            { title: 'Environmental Summit', date: 'Aug 18, 2025', description: 'Talks on sustainability.' },
        ],
        researchWorks: ['Coral Reef Restoration', 'Plastic Alternatives', 'Deep Sea Exploration'],
        sports: ['Water Polo', 'Rowing', 'Beach Volleyball'],
    },
    {
        id: 'technova-institute',
        name: 'TechNova Institute',
        image: '/colleges/technova.jpg',
        admissionProcess: 'Register online, take entrance test, submit fees after selection.',
        events: [
            { title: 'Robotics Expo', date: 'Nov 10, 2025', description: 'Robotic models by students.' },
            { title: 'Tech Talks', date: 'Dec 2, 2025', description: 'Lectures from industry experts.' },
        ],
        researchWorks: ['Quantum Computing', 'IoT in Healthcare', 'Self-Driving Cars'],
        sports: ['Esports', 'Badminton', 'Cricket'],
    },
];

export async function generateStaticParams() {
    return collegeData.map((college) => ({
        id: college.id,
    }));
}

export default function CollegeDetails({ params }) {
    const college = collegeData.find((c) => c.id === params.id);

    if (!college) return notFound();

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="mb-10">
                <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                />
            </div>

            <h1 className="text-4xl font-bold text-blue-800 mb-4">{college.name}</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">🎓 Admission Process</h2>
                <p className="text-gray-700">{college.admissionProcess}</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">📅 Events</h2>
                <ul className="space-y-2">
                    {college.events.map((event, idx) => (
                        <li key={idx} className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-bold text-blue-700">{event.title}</h3>
                            <p className="text-sm text-gray-500">{event.date}</p>
                            <p className="text-gray-600">{event.description}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">📚 Research Works</h2>
                <ul className="list-disc list-inside text-gray-700">
                    {college.researchWorks.map((r, i) => (
                        <li key={i}>{r}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">🏆 Sports Facilities</h2>
                <p className="text-gray-700">{college.sports.join(', ')}</p>
            </section>
        </div>
    );
}
