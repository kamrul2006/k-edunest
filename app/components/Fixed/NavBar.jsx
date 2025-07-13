'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { FaBars, FaTimes } from 'react-icons/fa';
import { auth } from '@/app/firebase/firebase.config';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        router.push('/');
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Colleges', href: '/colleges' },
        { name: 'Admission', href: '/admission' },
        { name: 'My College', href: '/my-college' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-blue-900/70 text-white shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
                    <img
                        src="/llgg.png"
                        alt="Logo"
                        className="lg:w-10 w-7 h-7 lg:h-10  rounded-full shadow-md "
                    />
                    <span className="text-2xl md:text-3xl font-extrabold tracking-wide hover:text-cyan-300 transition hidden md:block">
                        <span className="text-cyan-400">K-</span>EduNest
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`relative group text-sm font-semibold uppercase transition duration-300 ${pathname === link.href
                                ? 'text-cyan-300'
                                : 'hover:text-cyan-300'
                                }`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>

                {/* User Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <button
                                onClick={() => router.push('/profile')}
                                className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow-md transform hover:scale-105 transition"
                            >
                                {user.displayName || 'Profile'}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-sm px-3 py-1 border border-cyan-400 rounded hover:bg-cyan-400 hover:text-white transform hover:scale-105 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow-md transform hover:scale-105 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="hover:text-cyan-300 transition">
                        {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-blue-900/90 backdrop-blur-lg px-6 py-4 space-y-4 transition-all duration-300 ease-in-out">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`block text-sm font-semibold uppercase transition duration-300 ${pathname === link.href
                                ? 'text-cyan-300 underline underline-offset-4'
                                : 'hover:text-cyan-300'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Mobile Profile/Login */}
                    {user ? (
                        <div className="mt-4 space-y-2">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push('/profile');
                                }}
                                className="block w-full text-left bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-md font-medium transform hover:scale-105 transition"
                            >
                                {user.displayName || 'Profile'}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md font-medium transform hover:scale-105 transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="block mt-2 bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-md text-center font-medium transform hover:scale-105 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
