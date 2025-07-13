'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase.config';
import axios from 'axios';
import {
    FaCheckCircle,
    FaTimesCircle,
    FaEdit,
    FaSave,
    FaTimes,
    FaSignOutAlt,
    FaHome,
} from 'react-icons/fa';
import Footer from '../components/Fixed/Footer';
import Navbar from '../components/Fixed/NavBar';

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
            if (fbUser) {
                setFirebaseUser(fbUser);
                try {
                    const res = await axios.get('https://k-edunest-server.vercel.app/Users');
                    const matchedUser = res.data.find(u => u.name === fbUser.displayName);
                    if (matchedUser) {
                        setUser(matchedUser);
                        setFormData({
                            name: matchedUser.name || '',
                            email: matchedUser.email || '',
                            university: matchedUser.university || '',
                            address: matchedUser.address || '',
                            photoURL: matchedUser.photoURL || fbUser.photoURL || '',
                        });
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`https://k-edunest-server.vercel.app/Users/${user._id}`, formData);
            setUser(prev => ({ ...prev, ...formData }));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    if (loading) return <p className="text-center mt-20 text-white">Loading...</p>;

    return (
        <div className="bg-gradient-to-b from-slate-950 to-blue-950 min-h-screen text-white">
            <Navbar />

            <div className="max-w-4xl mx-auto my-16 p-8 bg-slate-900 shadow-2xl rounded-2xl border border-blue-800">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold">👤 My Profile</h1>
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.push('/')}
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
                        >
                            <FaHome /> Home
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>

                {/* Profile Image + Basic Info */}
                <div className="flex items-center gap-6 mb-8">
                    <img
                        src={formData.photoURL || '/default-avatar.png'}
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover shadow-lg"
                    />
                    <div>
                        <h2 className="text-3xl font-semibold mb-1">{formData.name}</h2>
                        <p className="text-md text-gray-300 flex items-center gap-2">
                            {firebaseUser?.email}
                            {firebaseUser?.emailVerified ? (
                                <FaCheckCircle className="text-green-400" title="Verified Email" />
                            ) : (
                                <FaTimesCircle className="text-red-400" title="Email Not Verified" />
                            )}
                        </p>
                    </div>
                </div>

                {/* Editable Fields */}
                {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                        {['name', 'email', 'university', 'address', 'photoURL'].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium capitalize mb-1">{field}</label>
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                        <div className="md:col-span-2 flex gap-4 justify-center mt-4">
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2"
                            >
                                <FaSave /> Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded flex items-center gap-2"
                            >
                                <FaTimes /> Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="my-6 space-y-4 text-lg">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>University:</strong> {formData.university || 'N/A'}</p>
                        <p><strong>Address:</strong> {formData.address || 'N/A'}</p>
                        <p><strong>Email Verified:</strong> {firebaseUser?.emailVerified ? 'Yes ✅' : 'No ❌'}</p>

                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2"
                        >
                            <FaEdit /> Edit Profile
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
