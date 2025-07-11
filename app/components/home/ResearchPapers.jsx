'use client';

import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

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
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    variants={fadeIn}
                >
                    📚 Student Research Papers
                </motion.h2>
                <motion.p
                    className="text-center text-gray-500 mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    variants={fadeIn}
                >
                    Discover innovative research by our talented students.
                </motion.p>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {researchPapers.map((paper, index) => (
                        <motion.div
                            key={index}
                            className="border rounded-lg p-6 shadow-md bg-gray-50 hover:shadow-xl transition-shadow duration-300"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            variants={fadeIn}
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{paper.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">By {paper.author}</p>
                            <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 font-medium hover:underline"
                            >
                                Read Full Paper <FaExternalLinkAlt className="ml-2 text-sm" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResearchPapers;
