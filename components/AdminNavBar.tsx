'use client'

import { useState } from 'react'
import Link from "next/link"
import { Heart, Menu, X } from 'lucide-react'

export default function AdminNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white shadow-sm">
      <Link className="flex items-center justify-center" href="/">
        <Heart className="h-6 w-6 text-blue-500" />
        <span className="ml-2 text-2xl font-bold text-blue-600">ADOPTIVE</span>
      </Link>

      <button
        onClick={() => setIsNavOpen(!isNavOpen)} 
        className="lg:hidden text-blue-500 hover:text-blue-600 focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {isNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <nav
        className={`lg:flex lg:items-center lg:gap-6 fixed lg:static top-14 left-0 w-full lg:w-auto bg-white lg:bg-transparent z-50 transition-transform duration-300 ease-in-out ${
          isNavOpen ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center p-4 lg:p-0 border-t lg:border-none border-blue-200">
          <Link
            className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4"
            href="/admin/dashboard/users"
            onClick={() => setIsNavOpen(false)} 
          >
            Users
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4"
            href="/admin/dashboard"
            onClick={() => setIsNavOpen(false)}
          >
            Admin Dashboard
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4"
            href="/admin/profile"
            onClick={() => setIsNavOpen(false)}
          >
            Admin Profile
          </Link>
        </div>
      </nav>
    </header>
  )
}
