'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase.config';
import axios from 'axios';

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const res = await axios.get(`http://localhost:5000/Users`);
                    const matchedUser = res.data.find(u => u.email === firebaseUser.email);

                    if (matchedUser) {
                        setUser(matchedUser);
                        setFormData({
                            name: matchedUser.name || '',
                            email: matchedUser.email || '',
                            university: matchedUser.university || '',
                            address: matchedUser.address || '',
                            photoURL: matchedUser.photoURL || firebaseUser.photoURL || '',
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
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/Users/${user._id}`, formData);
            setUser((prev) => ({ ...prev, ...formData }));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (loading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-16 p-6 bg-white shadow-md rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">👤 User Profile</h1>
                <button
                    onClick={() => router.push('/')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    ← Back to Home
                </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <img
                    src={formData.photoURL || '/default-avatar.png'}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-2 border-blue-600 object-cover"
                />
                {!isEditing && <h2 className="text-xl font-semibold">{user?.name}</h2>}
            </div>

            {isEditing ? (
                <div className="grid grid-cols-1 gap-4">
                    {['name', 'email', 'university', 'address', 'photoURL'].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                    ))}
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 text-gray-700">
                    <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
                    <p><strong>University:</strong> {user?.university || 'N/A'}</p>
                    <p><strong>Address:</strong> {user?.address || 'N/A'}</p>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
