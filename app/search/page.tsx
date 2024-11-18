'use client'

import { useState } from 'react'
import Link from "next/link"
import { Search, MapPin } from "lucide-react"
import Navbar from '@/components/NavBar'

// Mock data for orphanages
const orphanages = [
  { id: 1, name: "Sunshine Orphanage", location: "Model Town, Jalandhar", visitingHours: "10 AM - 5 PM", volunteeringInfo: "Accepting volunteers and donations" },
  { id: 2, name: "Hope Haven", location: "Urban Estate Phase II, Jalandhar", visitingHours: "9 AM - 4 PM", volunteeringInfo: "Open for volunteering; donations welcome" },
  { id: 3, name: "Little Angels Home", location: "Basti Sheikh, Jalandhar", visitingHours: "10 AM - 6 PM", volunteeringInfo: "Volunteers needed; accepting donations" },
  { id: 4, name: "Rainbow Kids Center", location: "Adarsh Nagar, Jalandhar", visitingHours: "11 AM - 5 PM", volunteeringInfo: "Volunteering opportunities available; donations appreciated" },
  { id: 5, name: "Loving Hearts Orphanage", location: "Maqsudan, Jalandhar", visitingHours: "10 AM - 4 PM", volunteeringInfo: "Accepting both volunteers and donations" },
]

export default function OrphanageSearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(orphanages)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const results = orphanages.filter(orphanage => 
      orphanage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orphanage.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      <Navbar /> 
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-pink-800 mb-6 text-center">Find Nearby Orphanages</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Search by name or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md h-12 px-4 rounded-l-md border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-r-md bg-pink-500 text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((orphanage) => (
            <div key={orphanage.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-pink-700 mb-2">{orphanage.name}</h2>
              <div className="flex items-center text-pink-600 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{orphanage.location}</span>
              </div>
              <p className="text-pink-600 mb-2">Visiting Hours: {orphanage.visitingHours}</p>
              <p className="text-pink-600 mb-4">{orphanage.volunteeringInfo}</p>
              <Link
                href={`/orphanage/${orphanage.id}`}
                className="inline-block w-full text-center py-2 px-4 bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200 transition-colors duration-300"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
        {searchResults.length === 0 && (
          <p className="text-center text-pink-600 mt-8">No orphanages found. Please try a different search term.</p>
        )}
      </main>
      <footer className="py-6 w-full shrink-0 bg-white border-t border-pink-200">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-pink-600 text-center sm:text-left">© 2024 ADOPTIVE. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="text-xs hover:underline underline-offset-4 text-pink-600 hover:text-pink-700" href="/terms">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4 text-pink-600 hover:text-pink-700" href="/privacy">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
