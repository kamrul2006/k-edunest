'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-cyan-700 text-white px-6">
            <h1 className="text-[8rem] font-extrabold animate-pulse">404</h1>
            <h2 className="text-3xl font-bold mb-4">Oops! Page not found</h2>
            <p className="text-lg text-center max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link href="/">
                <button className="flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition">
                    <FaArrowLeft size={20} /> Go Back Home
                </button>
            </Link>

        </div>
    );
}
