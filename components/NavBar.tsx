'use client'
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white shadow-sm">
      <Link className="flex items-center justify-center" href="/">
        <Heart className="h-6 w-6 text-pink-500" />
        <span className="ml-2 text-2xl font-bold text-pink-600">ADOPTIVE</span>
      </Link>
      <nav className="flex gap-4 sm:gap-6 items-center">
        <Link className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4" href="/">
          Home
        </Link>
        <Link className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4" href="/about">
          About
        </Link>
        <Link className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4" href="/contact">
          Contact
        </Link>
        <Link
          className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4 flex items-center gap-2"
          href="/profile"
        >
          {/* <img
            src="/profile-placeholder.png" // dynamic user profile image 
            alt="Profile"
            className="h-6 w-6 rounded-full"
          /> */}
          <span>Profile</span>
        </Link>
      </nav>
    </header>
  );
}
