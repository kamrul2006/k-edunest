import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-950 text-gray-200 px-4 py-10 mt-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        <span className="text-cyan-400">K-</span>Edunest
                    </h2>
                    <p className="mt-3 text-sm text-gray-400">
                        Unlock your future with the best college resources, admissions, and research insights.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="/" className="hover:text-cyan-300">Home</Link></li>
                        <li><Link href="/colleges" className="hover:text-cyan-300">Colleges</Link></li>
                        <li><Link href="/admission" className="hover:text-cyan-300">Admission</Link></li>
                        <li><Link href="/my-college" className="hover:text-cyan-300">My College</Link></li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-4 mt-2 text-xl">
                        <a href="#" className="hover:text-cyan-400"><FaFacebookF /></a>
                        <a href="#" className="hover:text-cyan-400"><FaTwitter /></a>
                        <a href="#" className="hover:text-cyan-400"><FaInstagram /></a>
                        <a href="#" className="hover:text-cyan-400"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Contact</h3>
                    <p className="text-sm">Email: support@kedunest.com</p>
                    <p className="text-sm">Phone: +880 1234-567890</p>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm mt-10 text-gray-500 border-t border-gray-700 pt-5">
                &copy; {new Date().getFullYear()} K-Edunest. All rights reserved.
            </div>
        </footer>
    );
}
