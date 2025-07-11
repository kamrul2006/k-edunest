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
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-blue-900/60 text-white shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-3xl font-extrabold tracking-widest text-white hover:text-cyan-300 transition-all duration-300"
                >
                    <span className="text-cyan-400">K-</span>EduNest
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-semibold uppercase transition duration-300 ${pathname === link.href
                                ? 'text-cyan-300 underline underline-offset-4'
                                : 'hover:text-cyan-300'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* User Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <button
                                onClick={() => router.push('/profile')}
                                className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow-md"
                            >
                                {user.displayName || 'Profile'}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-sm px-3 py-1 border border-cyan-400 rounded hover:bg-cyan-400 hover:text-white transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow-md"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-blue-900/80 backdrop-blur-lg px-6 py-4 space-y-3">
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
                                className="block w-full text-left bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-md font-medium"
                            >
                                {user.displayName || 'Profile'}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="block mt-2 bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-md text-center font-medium"
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
