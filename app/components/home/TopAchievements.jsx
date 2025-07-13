'use client';

import { FaAward, FaGraduationCap, FaChalkboardTeacher, FaBriefcase } from 'react-icons/fa';
import CountUp from 'react-countup';
import Image from 'next/image';
import { Fade, Zoom } from 'react-awesome-reveal';

const achievements = [
    {
        icon: <FaAward className="text-4xl text-blue-400" />,
        title: 'Awards Won',
        count: 50,
    },
    {
        icon: <FaGraduationCap className="text-4xl text-blue-400" />,
        title: 'Graduates',
        count: 12000,
    },
    {
        icon: <FaChalkboardTeacher className="text-4xl text-blue-400" />,
        title: 'Qualified Faculty',
        count: 300,
    },
    {
        icon: <FaBriefcase className="text-4xl text-blue-400" />,
        title: 'Placement Rate',
        count: 98,
        suffix: '%',
    },
];

const TopAchievements = () => {
    return (
        <section className="bg-black py-20 px-4 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">
                <Fade cascade damping={0.1}  >
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
                        Top Achievements & Rankings
                    </h2>
                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                        Celebrating milestones that define our excellence in education, research, and placements.
                    </p>
                </Fade>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {achievements.map((item, index) => (
                        <Zoom key={index} delay={index * 100}  >
                            <div className="flex z-50 flex-col items-center bg-gray-900 p-6 rounded-xl shadow-xl hover:shadow-blue-500/40 transition-shadow">
                                {item.icon}
                                <h3 className="text-3xl font-bold text-blue-300 mt-4">
                                    <CountUp end={item.count} duration={2} suffix={item.suffix || ''} />
                                </h3>
                                <p className="text-gray-300 mt-2">{item.title}</p>
                            </div>
                        </Zoom>
                    ))}
                </div>
            </div>

            {/* Decorative Circles */}
            <Image
                src="/circle.svg"
                alt="decorative circle"
                width={100}
                height={100}
                className="absolute z-10 bottom-0 -right-10 opacity-30 hidden lg:block"
            />
            <Image
                src="/circle.svg"
                alt="decorative circle"
                width={200}
                height={200}
                className="absolute z-10 top-0 -left-20 opacity-30 hidden lg:block"
            />
        </section>
    );
};

export default TopAchievements;
