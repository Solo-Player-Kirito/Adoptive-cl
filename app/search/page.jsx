'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Search, MapPin } from "lucide-react"
import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes)

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date)
}

export default function OrphanageSearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [orphanages, setOrphanages] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrphanages = async () => {
      try {
        const token = localStorage.getItem('authTokenUser')

        if (!token) {
          setError('Unauthorized access. Please log in.')
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orphanages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch orphanages')
        }

        const data = await response.json()
        setOrphanages(data)
        setSearchResults(data) // Set initial search results
      } catch (error) {
        console.error('Error fetching orphanages:', error)
        setError(error.message || 'An unexpected error occurred.')
      }
    }

    fetchOrphanages()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const results = orphanages.filter(orphanage =>
      orphanage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orphanage.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-pink-800 mb-6 text-center">Find Nearby Orphanages</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
                <span>{orphanage.address}</span>
              </div>
              <p className="text-pink-600 mb-2">Visiting Hours: {formatTime(orphanage.visiting_hours_start)} To {formatTime(orphanage.visiting_hours_end)}</p>
              <p className="text-pink-600 mb-4">{orphanage.volunteeringInfo}</p>
              <Link
                href={`/schedule?id=${orphanage.id}`}
                className="inline-block w-full text-center py-2 px-4 bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200 transition-colors duration-300"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
        {searchResults.length === 0 && !error && (
          <p className="text-center text-pink-600 mt-8">No orphanages found. Please try a different search term.</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
