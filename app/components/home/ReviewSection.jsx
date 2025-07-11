'use client';

import { useState } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaStar } from 'react-icons/fa';

const ReviewSection = () => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: 'Ayesha Rahman',
            college: 'Dhaka University',
            review: 'Great campus and excellent research environment!',
            rating: 5,
        },
        {
            id: 2,
            name: 'Tanvir Hossain',
            college: 'BUET',
            review: 'Professors are supportive and the labs are well-equipped.',
            rating: 4,
        },
        {
            id: 3,
            name: 'Farzana Akter',
            college: 'NSU',
            review: 'Loved the campus life and events.',
            rating: 4.5,
        },
    ]);

    const [formData, setFormData] = useState({
        name: '',
        college: '',
        review: '',
        rating: 0,
    });

    const [hoverRating, setHoverRating] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, college, review, rating } = formData;
        if (!name || !college || !review || rating === 0) return;

        setReviews((prev) => [
            ...prev,
            {
                ...formData,
                id: prev.length + 1,
            },
        ]);
        setFormData({ name: '', college: '', review: '', rating: 0 });
        setHoverRating(0);
    };

    return (
        <section className="py-20 bg-gradient-to-b from-blue-50 via-white to-blue-100">
            <div className="max-w-6xl mx-auto px-4">

                {/* Add Review Form */}
                <Fade direction="up" triggerOnce>
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 mb-16">
                        <h3 className="text-3xl font-bold text-blue-700 text-center mb-2">📝 Share Your Experience</h3>
                        <p className="text-center text-gray-500 mb-6">Help others by writing about your college journey.</p>

                        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">College</label>
                                <input
                                    type="text"
                                    name="college"
                                    value={formData.college}
                                    onChange={handleChange}
                                    className="mt-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2 flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Review</label>
                                <textarea
                                    name="review"
                                    rows="4"
                                    value={formData.review}
                                    onChange={handleChange}
                                    className="mt-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    required
                                ></textarea>
                            </div>

                            {/* Star Rating */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                                <div className="flex space-x-1 text-2xl text-yellow-400 cursor-pointer">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className={
                                                (hoverRating || formData.rating) >= star
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </Fade>

                {/* Heading */}
                <Fade cascade damping={0.1} triggerOnce>
                    <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-4">
                        💬 Student Reviews & Feedback
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        See what others say about their college life.
                    </p>
                </Fade>

                {/* Reviews */}
                <Slide direction="up" triggerOnce>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white border border-blue-100 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
                                <p className="text-sm text-gray-500 mb-2 italic">{review.college}</p>
                                <div className="flex items-center text-yellow-500 mb-3">
                                    {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                    {review.rating % 1 !== 0 && <FaStar className="opacity-50" />}
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">“{review.review}”</p>
                            </div>
                        ))}
                    </div>
                </Slide>
            </div>
        </section>
    );
};

export default ReviewSection;
