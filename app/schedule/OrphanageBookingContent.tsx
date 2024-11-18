'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import { Heart, MapPin, Phone, Calendar, Clock } from "lucide-react"


interface Orphanage {
  id: number
  name: string
  description: string
  location: string
  phone: string
  email: string
  image: string
}

// Mock data for orphanages
const orphanages: Orphanage[] = [
  { id: 1, name: "Sunshine Orphanage", description: "Sunshine Orphanage is a loving home for children in need, providing care, education, and support to help them thrive and grow into happy, healthy adults.", location: "Model Town, Jalandhar", phone: "+91 98765 12345", email: "info@sunshineorphanage.org", image: "/placeholder.svg?height=200&width=400" },
  { id: 2, name: "Hope Haven", description: "Hope Haven is dedicated to creating a nurturing environment for children, offering education and healthcare services to support their growth.", location: "Urban Estate Phase II, Jalandhar", phone: "+91 98765 67890", email: "contact@hopehaven.org", image: "/placeholder.svg?height=200&width=400" },
  { id: 3, name: "Little Angels Home", description: "Little Angels Home provides a safe and loving space where children can learn and play while receiving the care they need.", location: "Basti Sheikh, Jalandhar", phone: "+91 98765 45678", email: "littleangels@home.org", image: "/placeholder.svg?height=200&width=400" },
  { id: 4, name: "Rainbow Kids Center", description: "Rainbow Kids Center is focused on fostering a joyful and supportive environment for underprivileged children in the community.", location: "Adarsh Nagar, Jalandhar", phone: "+91 98765 23456", email: "info@rainbowkids.org", image: "/placeholder.svg?height=200&width=400" },
  { id: 5, name: "Loving Hearts Orphanage", description: "Loving Hearts Orphanage helps children build brighter futures through education, mentorship, and a caring atmosphere.", location: "Maqsudan, Jalandhar", phone: "+91 98765 87654", email: "info@lovinghearts.org", image: "/placeholder.svg?height=200&width=400" }
]

export default function OrphanageBookingContent() {
  const searchParams = useSearchParams()
  const idParam = searchParams ? searchParams.get('id') : null
  const [orphanage, setOrphanage] = useState<Orphanage | null>(null)
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    if (idParam) {
      const foundOrphanage = orphanages.find(o => o.id === parseInt(idParam, 10))
      if (foundOrphanage) {
        setOrphanage(foundOrphanage)
      } else {
        setOrphanage(null)
      }
    }
  }, [idParam])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    if (!date || !time) {
      setError('Please select both date and time.')
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Appointment booked:', { date, time })
      setSuccess(true)
    } catch (error) {
      console.error('Booking error:', error)
      setError('An error occurred while booking. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!orphanage) {
    return <p className="text-center text-pink-600">Orphanage not found or loading...</p>
  }

  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white shadow-sm">
        <Link className="flex items-center justify-center" href="/">
          <Heart className="h-6 w-6 text-pink-500" />
          <span className="ml-2 text-2xl font-bold text-pink-600">ADOPTIVE</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4" href="/search">
            Search
          </Link>
          <Link className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-pink-800 mb-6 text-center">Book an Appointment</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
                <img
                  src={orphanage.image}
                  alt={orphanage.name}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <div className="md:w-1/2 md:pl-4">
                <h2 className="text-2xl font-semibold text-pink-700 mb-2">{orphanage.name}</h2>
                <p className="text-pink-600 mb-4">{orphanage.description}</p>
                <div className="flex items-center text-pink-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{orphanage.location}</span>
                </div>
                <div className="flex items-center text-pink-600 mb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{orphanage.phone}</span>
                </div>
                <div className="flex items-center text-pink-600">
                  <Heart className="h-4 w-4 mr-2" />
                  <span>{orphanage.email}</span>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-pink-700 mb-4">Select Appointment Date and Time</h3>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-pink-700 mb-1">
                Date
              </label>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="time" className="block text-sm font-medium text-pink-700 mb-1">
                Time
              </label>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-pink-500 mr-2" />
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mb-4">
                Appointment booked successfully! We&apos;ll contact you to confirm the details.
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
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
 