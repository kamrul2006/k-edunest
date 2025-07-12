'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase.config';

export default function AdmissionPage() {
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

    // Get logged-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userName = user.displayName || '';
                const userEmail = user.email || '';

                // Fill user info in form
                setFormData(prev => ({
                    ...prev,
                    candidateName: userName,
                    email: userEmail,
                }));

                // Check if user already applied
                try {
                    const res = await axios.get(`http://localhost:5000/admissions`);
                    const userAdmission = res.data.find(item => item.email === user.email);
                    console.log(userAdmission)

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

    console.log(hasApplied)


    // Get college list
    useEffect(() => {
        axios.get('http://localhost:5000/college')
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
            await axios.post('http://localhost:5000/admissions', {
                collegeId: selectedCollege,
                ...formData,
            });
            alert('Admission submitted successfully!');
            setHasApplied(true); // prevent further submissions
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to submit admission.');
        }
    };

    return (
        <div className='bg-white min-h-screen'>
            <div className="max-w-3xl mx-auto py-12 md:py-28 px-6 min-h-screen bg-white">
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
                                <input name="email" type="email" placeholder="Email" required className="w-full border px-4 py-2 rounded" onChange={handleChange} value={formData.email} readOnly />
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
