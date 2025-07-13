'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase.config';
import { useRouter } from 'next/navigation';

export default function MyCollege() {
    const [admissionInfo, setAdmissionInfo] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [allReviews, setAllReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserEmail(user.email);

                try {
                    const [admissionRes, reviewRes] = await Promise.all([
                        axios.get('https://k-edunest-server.vercel.app/admissions'),
                        axios.get('https://k-edunest-server.vercel.app/review')
                    ]);

                    const userAdmission = admissionRes.data.find(item => item.candidateName === user.displayName);
                    setAdmissionInfo(userAdmission || null);
                    setAllReviews(reviewRes.data || []);
                } catch (err) {
                    console.error('Error fetching data:', err);
                }
            }

            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://k-edunest-server.vercel.app/review', {
                userEmail,
                collegeId: admissionInfo.collegeId,
                reviewText,
                rating
            });
            setSuccess(true);
            setReviewText('');
            setRating(5);

            const reviewRes = await axios.get('https://k-edunest-server.vercel.app/review');
            setAllReviews(reviewRes.data || []);
        } catch (err) {
            console.error('Review submission failed:', err);
        }
    };

    const filteredReviews = admissionInfo
        ? allReviews.filter(review => review.collegeId === admissionInfo.collegeId)
        : [];

    // Show loading
    if (isLoading) return <div className="text-center py-20 text-xl text-gray-600">Loading your college info...</div>;

    // Show login prompt if not logged in
    if (!userEmail) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
                <div className="bg-white rounded-xl shadow-xl p-10 max-w-md text-center">
                    <h2 className="text-3xl font-bold text-blue-700 mb-4">You're not logged in</h2>
                    <p className="text-gray-600 mb-6">
                        Please log in to view your college details and submit a review.
                    </p>
                    <button
                        onClick={() => router.push('/login')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-300"
                    >
                        Login Now
                    </button>
                </div>
            </div>
        );
    }

    // Show message if logged in but no admission info
    if (!admissionInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center px-4">
                <div className="bg-white p-10 rounded-lg shadow-md max-w-lg">
                    <h2 className="text-2xl font-semibold text-red-600 mb-2">No Admission Found</h2>
                    <p className="text-gray-600">We couldn't find your admission information in our records.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
            {/* College Info */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6">
                <img
                    src={admissionInfo.image}
                    alt="Candidate"
                    className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 shadow"
                />
                <div className="text-left">
                    <h2 className="text-3xl font-bold text-blue-800 mb-2">{admissionInfo.collegeName}</h2>
                    <p className="text-gray-700"><strong>Name:</strong> {admissionInfo.candidateName}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {admissionInfo.email}</p>
                    <p className="text-gray-700"><strong>Subject:</strong> {admissionInfo.subject}</p>
                    <p className="text-gray-700"><strong>DOB:</strong> {admissionInfo.dob}</p>
                    <p className="text-gray-700"><strong>Address:</strong> {admissionInfo.address}</p>
                </div>
            </div>

            {/* Review Form */}
            <form onSubmit={handleSubmitReview} className="bg-white p-8 rounded-xl shadow-lg space-y-4 border border-blue-100">
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">Leave a Review</h3>
                <textarea
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    className="w-full border border-gray-300 rounded p-3 resize-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Write your review here..."
                    rows={4}
                    required
                ></textarea>
                <div className="flex items-center gap-4">
                    <label className="font-medium">Rating:</label>
                    <select
                        value={rating}
                        onChange={e => setRating(Number(e.target.value))}
                        className="border rounded px-3 py-2 bg-white shadow-sm"
                    >
                        {[5, 4, 3, 2, 1].map(r => (
                            <option key={r} value={r}>{r} ⭐</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition duration-300"
                >
                    Submit Review
                </button>
                {success && <p className="text-green-600 font-medium animate-pulse">✅ Review submitted successfully!</p>}
            </form>

            {/* College Reviews */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">Reviews for {admissionInfo.collegeName}</h3>
                {filteredReviews.length > 0 ? (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {filteredReviews.map((review, index) => (
                            <div key={index} className="border-b pb-4">
                                <p className="text-gray-800">{review.reviewText}</p>
                                <div className="text-yellow-500">
                                    {'⭐'.repeat(review.rating)} <span className="text-sm text-gray-500">by {review.userEmail}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet for this college.</p>
                )}
            </div>
        </div>
    );
}
