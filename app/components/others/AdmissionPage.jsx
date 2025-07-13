'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase.config';

export default function AdmissionPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [colleges, setColleges] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState('');
    const [formData, setFormData] = useState({
        candidateName: '',
        subject: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        image: ''
    });
    const [hasApplied, setHasApplied] = useState(false);

    // Get logged-in user and check admission
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                const userName = user.displayName || '';
                const userEmail = user.email || '';

                setFormData(prev => ({
                    ...prev,
                    candidateName: userName,
                    email: userEmail,
                }));

                try {
                    const res = await axios.get('https://k-edunest-server.vercel.app/admissions');
                    const userAdmission = res.data.find(item => item.email === user.email);
                    if (userAdmission) {
                        setHasApplied(true);
                    }
                } catch (err) {
                    console.error('Error checking admission:', err);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    // Get college list
    useEffect(() => {
        axios.get('https://k-edunest-server.vercel.app/college')
            .then(res => setColleges(res.data))
            .catch(err => console.error('Error fetching colleges:', err));
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('https://k-edunest-server.vercel.app/admissions', {
                collegeId: selectedCollege,
                ...formData,
            });
            alert('Admission submitted successfully!');
            setHasApplied(true);
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to submit admission.');
        }
    };

    // 🔒 Show login card if user is not authenticated
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 px-4">
                <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">You're not logged in</h1>
                    <p className="text-gray-600 mb-6">
                        To access the admission form and submit your details, please sign in to your account.
                    </p>
                    <button
                        onClick={() => router.push('/login')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-3xl mx-auto py-12 md:py-28 px-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Admission Form</h2>

                {hasApplied ? (
                    <div className="text-center text-red-600 text-lg font-semibold">
                        You have already submitted an admission request.
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Select College</label>
                            <select
                                className="w-full border border-gray-300 rounded px-4 py-2"
                                value={selectedCollege}
                                onChange={e => setSelectedCollege(e.target.value)}
                            >
                                <option value="">-- Select a College --</option>
                                {colleges.map(college => (
                                    <option key={college._id} value={college._id}>{college.name}</option>
                                ))}
                            </select>
                        </div>

                        {selectedCollege && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input name="candidateName" placeholder="Candidate Name" required className="w-full border px-4 py-2 rounded" onChange={handleChange} value={formData.candidateName} />


                                <input name="subject" placeholder="Subject" required className="w-full border px-4 py-2 rounded" onChange={handleChange} value={formData.subject} />


                                <input name="email" type="email" placeholder="Email" required className="w-full border px-4 py-2 rounded bg-gray-100" value={formData.email} />


                                <input name="phone" placeholder="Phone Number" required className="w-full border px-4 py-2 rounded" onChange={handleChange} value={formData.phone} />


                                <input name="address" placeholder="Address" required className="w-full border px-4 py-2 rounded" onChange={handleChange} value={formData.address} />


                                <input name="dob" type="date" placeholder="Date of Birth" required className="w-full border px-4 py-2 rounded" onChange={handleChange} value={formData.dob} />


                                <input name="image" placeholder="Image URL" required className="w-full border px-4 py-2 rounded" onChange={handleChange} value={formData.image} />

                                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-semibold">
                                    Submit Admission
                                </button>
                            </form>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
