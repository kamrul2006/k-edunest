'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaExternalLinkAlt, FaUser } from 'react-icons/fa';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const researchPapers = [
    {
        title: 'AI in Modern Education',
        author: 'Jane Doe',
        link: 'https://example.com/ai-in-edu',
    },
    {
        title: 'Sustainable Campus Models',
        author: 'John Smith',
        link: 'https://example.com/sustainable-campus',
    },
    {
        title: 'Robotics and Automation Projects',
        author: 'Sarah Khan',
        link: 'https://example.com/robotics-projects',
    },
    {
        title: 'Climate Change Studies',
        author: 'Michael Brown',
        link: 'https://example.com/climate-studies',
    },
    {
        title: 'Mental Health in Colleges',
        author: 'Emily Zhang',
        link: 'https://example.com/mental-health-research',
    },
];

const ResearchPapers = () => {
    return (
        <section className="py-20 bg-black text-blue-300 relative">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2
                    className="text-4xl font-extrabold text-center mb-4 text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    variants={fadeIn}
                >
                    Student Research Papers
                </motion.h2>
                <motion.p
                    className="text-center text-blue-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    variants={fadeIn}
                >
                    Explore innovative research works published by our outstanding students on emerging topics.
                </motion.p>

                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {researchPapers.map((paper, index) => (
                        <motion.div
                            key={index}
                            className="border border-blue-600/50 rounded-2xl p-6 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow-lg hover:shadow-blue-700/40 transition duration-300"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            variants={fadeIn}
                        >
                            <h3 className="text-xl font-bold text-blue-200 mb-3">{paper.title}</h3>
                            <p className="flex items-center text-sm text-blue-400 mb-5 gap-2">
                                <FaUser className="text-blue-500" /> {paper.author}
                            </p>
                            <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-400 hover:text-blue-200 font-medium transition-colors"
                            >
                                Read Full Paper <FaExternalLinkAlt className="ml-2" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ---------- Decorative Circles ---------- */}
            <Image
                src="/circle.svg"
                alt="decorative circle"
                width={300}
                height={300}
                className="absolute bottom-0 -right-20 opacity-30 hidden lg:block"
            />
            <Image
                src="/circle.svg"
                alt="decorative circle"
                width={200}
                height={200}
                className="absolute top-0 -left-20 opacity-30 hidden lg:block"
            />
        </section>
    );
};

export default ResearchPapers;
