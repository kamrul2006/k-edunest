'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/app/firebase/firebase.config';
import { FaArrowLeft } from 'react-icons/fa';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            setErrorMsg('Invalid email or password. Please try again.');
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const newUser = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                provider: "google",
            };

            await fetch('https://k-edunest-server.vercel.app/Users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            router.push('/');
        } catch (err) {
            setErrorMsg('Google sign-in failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 space-y-6 relative">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-blue-900">Welcome Back!</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to your K-Edunest account to explore top colleges.
                    </p>
                </div>

                {errorMsg && (
                    <div className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm shadow-sm text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
                    >
                        Sign In
                    </button>
                </form>

                {/* Google Login */}
                <div className="text-center">
                    <p className="text-gray-500 my-3">or</p>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200 shadow"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span className="font-medium text-gray-700">Sign in with Google</span>
                    </button>
                </div>

                <p className="text-sm text-center text-gray-600">
                    New here?{' '}
                    <span
                        className="text-blue-600 hover:underline font-medium cursor-pointer"
                        onClick={() => router.push('/register')}
                    >
                        Create an account
                    </span>
                </p>

                {/* Back to Home Button */}
                <button
                    onClick={() => router.push('/')}
                    className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 hover:text-blue-700 flex items-center gap-1 transition duration-200  btn btn-info"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>
            </div>
        </div>
    );
}
