'use client'

import { useState } from 'react'
import Link from "next/link"
import { Heart, Plus, Trash2 } from 'lucide-react'
import Footer from '@/components/Footer'

export default function AddOrphanagePage() {
  const [orphanage, setOrphanage] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    visiting_hours_start: '',
    visiting_hours_end: '',
    extra_note: '',
    media_links: ['']
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOrphanage(prev => ({ ...prev, [name]: value }))
  }

  const handleMediaLinkChange = (index, value) => {
    const newMediaLinks = [...orphanage.media_links]
    newMediaLinks[index] = value
    setOrphanage(prev => ({ ...prev, media_links: newMediaLinks }))
  }

  const addMediaLink = () => {
    setOrphanage(prev => ({ ...prev, media_links: [...prev.media_links, ''] }))
  }

  const removeMediaLink = (index) => {
    const newMediaLinks = orphanage.media_links.filter((_, i) => i !== index)
    setOrphanage(prev => ({ ...prev, media_links: newMediaLinks }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Input validation
    if (!orphanage.name || !orphanage.email || !orphanage.phone || !orphanage.address) {
      setError('Please fill in all required fields.')
      return
    }

    try {
      const token = localStorage.getItem('authTokenAdmin')
      if (!token) {
        throw new Error('Unauthorized. Please log in.')
      }

      const response = await fetch(`${apiUrl}/admin/orphanages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orphanage)
      })

      if (!response.ok) {
        throw new Error('Failed to add orphanage. Please try again.')
      }

      const result = await response.json()
      setSuccess('Orphanage added successfully!')
      console.log('Orphanage added:', result)

      // Reset form after successful submission
      setOrphanage({
        name: '',
        email: '',
        phone: '',
        address: '',
        visiting_hours_start: '',
        visiting_hours_end: '',
        extra_note: '',
        media_links: ['']
      })
    } catch (error) {
      console.error('Error adding orphanage:', error)
      setError(error.message || 'An error occurred while adding the orphanage.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white shadow-sm">
        <Link className="flex items-center justify-center" href="/">
          <Heart className="h-6 w-6 text-blue-500" />
          <span className="ml-2 text-2xl font-bold text-blue-600">ADOPTIVE</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4" href="/admin">
            Admin Dashboard
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4" href="/admin/profile">
            Admin Profile
          </Link>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Add New Orphanage</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-blue-700 mb-1">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={orphanage.name}
                onChange={handleInputChange}
                required
                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={orphanage.email}
                onChange={handleInputChange}
                required
                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-blue-700 mb-1">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={orphanage.phone}
                onChange={handleInputChange}
                required
                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-blue-700 mb-1">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={orphanage.address}
                onChange={handleInputChange}
                required
                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="visiting_hours_start" className="block text-sm font-medium text-blue-700 mb-1">Visiting Hours Start</label>
              <input
                type="time"
                id="visiting_hours_start"
                name="visiting_hours_start"
                value={orphanage.visiting_hours_start}
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="visiting_hours_end" className="block text-sm font-medium text-blue-700 mb-1">Visiting Hours End</label>
              <input
                type="time"
                id="visiting_hours_end"
                name="visiting_hours_end"
                value={orphanage.visiting_hours_end}
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="extra_note" className="block text-sm font-medium text-blue-700 mb-1">Extra Note</label>
            <textarea
              id="extra_note"
              name="extra_note"
              value={orphanage.extra_note}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-blue-700 mb-1">Media Links</label>
            {orphanage.media_links.map((link, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => handleMediaLinkChange(index, e.target.value)}
                  className="flex-grow h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  onClick={() => removeMediaLink(index)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMediaLink}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-5 w-5 inline-block mr-1" /> Add Media Link
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Orphanage
            </button>
          </div>
        </form>
      </main>
     <Footer /> 
    </div>
  )
}
