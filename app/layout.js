import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'K-EduNest',
  description: 'Learn to learn',
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" foxified="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <AuthProvider>
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        </AuthProvider>
      </body>
    </html>
  );
}


