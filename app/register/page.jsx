'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { FaGoogle, FaArrowLeft } from "react-icons/fa";

export default function Register() {
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        photoURL: "",
    });
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);

            await updateProfile(user, {
                displayName: `${form.firstName} ${form.lastName}`,
                photoURL: form.photoURL,
            });

            const newUser = {
                name: `${form.firstName} ${form.lastName}`,
                email: form.email,
                photoURL: form.photoURL,
                provider: "email",
            };

            await fetch("https://k-edunest-server.vercel.app/Users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
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

            await fetch("https://k-edunest-server.vercel.app/Users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-purple-900 to-cyan-900 px-4 py-16">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 relative">
                {/* Back to Home */}
                <button
                    onClick={() => router.push('/')}
                    className="absolute -top-4 -left-4 bg-blue-700 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-800"
                    title="Back to Home"
                >
                    <FaArrowLeft /> Home
                </button>

                <div className="text-center mt-6">
                    <h1 className="text-3xl font-extrabold text-blue-900">Create Account</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Join <span className="font-semibold text-blue-600">K-Edunest</span> and explore top colleges.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-2 rounded text-sm shadow-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            required
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />

                    <input
                        type="url"
                        placeholder="Profile Image URL (optional)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                        value={form.photoURL}
                        onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
                    />

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-lg"
                    >
                        Register
                    </button>
                </form>

                {/* Google Login */}
                <div className="text-center">
                    <p className="text-gray-500 my-3">or</p>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                        <FaGoogle className="text-red-500" />
                        <span>Sign in with Google</span>
                    </button>
                </div>

                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <span
                        className="text-blue-600 hover:underline font-medium cursor-pointer"
                        onClick={() => router.push('/login')}
                    >
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
}
