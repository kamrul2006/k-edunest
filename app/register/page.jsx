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

    // Email/password registration handler
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);

            await updateProfile(user, {
                displayName: `${form.firstName} ${form.lastName}`,
                photoURL: form.photoURL,
            });

            // Send user to backend
            const newUser = {
                name: `${form.firstName} ${form.lastName}`,
                email: form.email,
                photoURL: form.photoURL,
                provider: "email",
            };

            await fetch("http://localhost:5000/Users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    // Google login handler
    const handleGoogleLogin = async () => {
        setError("");
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log(user)

            const newUser = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                provider: "google",
            };

            await fetch("http://localhost:5000/Users", {
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-blue-900">Create Account</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Join K-Edunest to discover and connect with top colleges.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm shadow-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
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
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                    >
                        Register
                    </button>
                </form>

                {/* Google Login */}
                <div className="text-center">
                    <p className="text-gray-500 my-2">or</p>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
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
