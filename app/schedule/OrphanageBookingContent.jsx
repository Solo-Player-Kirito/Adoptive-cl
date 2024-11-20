'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import { Heart, MapPin, Phone, Calendar, Clock } from "lucide-react"
import { formatTime } from '../search/page'
import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'



export default function OrphanageBookingContent() {
  const searchParams = useSearchParams()
  const idParam = searchParams ? searchParams.get('id') : null
  const [orphanage, setOrphanage] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchOrphanage = async () => {
      if (!idParam) return
      try {
        const token = localStorage.getItem('authTokenUser')
        if (!token) {
          setError('Unauthorized. Please log in.')
          setIsLoading(false)
          return
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orphanages/${idParam}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok) throw new Error('Failed to fetch orphanage')
        const data = await response.json()
        setOrphanage(data)
      } catch (err) {
        console.error('Error fetching orphanage:', err)
        setError('Unable to load orphanage details. Please try again later.')
      }
    }
    fetchOrphanage()
  }, [idParam])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    if (!date || !time) {
      setError('Please select both date and time.')
      setIsLoading(false)
      return
    }

    // Combine date and time into a single Date object
    const selectedDateTime = new Date(`${date}T${time}`)
    const now = new Date()

    if (selectedDateTime <= now) {
      setError('Selected date and time must be in the future.')
      setIsLoading(false)
      return
    }

    // Validate time against visiting hours
    const visitingStart = new Date(`1970-01-01T${orphanage.visiting_hours_start}`)
    const visitingEnd = new Date(`1970-01-01T${orphanage.visiting_hours_end}`)
    const selectedTime = new Date(`1970-01-01T${time}`)

    if (selectedTime < visitingStart || selectedTime > visitingEnd) {
      setError('Selected time is outside the visiting hours range.')
      setIsLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('authTokenUser')
      if (!token) {
        setError('Unauthorized. Please log in.')
        setIsLoading(false)
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orphanage_id: orphanage?.id,
          scheduled_at: `${date} ${time}:00`,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to schedule appointment')
      }

      setSuccess(true)
      setDate('')
      setTime('')
    } catch (err) {
      console.error('Booking error:', err)
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
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-pink-800 mb-6 text-center">Book an Appointment</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row">

              <div className="md:w-1/2 md:pl-4">
                <h2 className="text-2xl font-semibold text-pink-700 mb-2">{orphanage.name}</h2>
                <p className="text-pink-600 mb-4">Visiting Hours: {formatTime(orphanage.visiting_hours_start)} To {formatTime(orphanage.visiting_hours_end)} </p>
                <div className="flex items-center text-pink-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{orphanage.address}</span>
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
      <Footer />
    </div>
  )
}
