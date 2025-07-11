'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase.config';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            setErrorMsg('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-800 px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
                {/* Page Title & Description */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-blue-900">Welcome Back!</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to access your personalized K-Edunest dashboard and explore top colleges.
                    </p>
                </div>

                {/* Error Message */}
                {errorMsg && (
                    <div className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm shadow-sm">
                        {errorMsg}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                    >
                        Sign In
                    </button>
                </form>

                {/* Redirect to Register */}
                <p className="text-sm text-center text-gray-600">
                    New here?{' '}
                    <span
                        className="text-blue-600 hover:underline font-medium cursor-pointer"
                        onClick={() => router.push('/register')}
                    >
                        Create an account
                    </span>
                </p>
            </div>
        </div>
    );
}
