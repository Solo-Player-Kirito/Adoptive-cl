'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { User, Mail, Phone, Calendar, Eye, EyeOff } from 'lucide-react'
import Navbar from '@/components/NavBar'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import apiUrl from '../apiUrls'

export default function UserProfilePage() {

  const router = useRouter();

  const [userData, setUserData] = useState(null)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [schedulings, setSchedulings] = useState([])

  // Fetch user data and schedulings on load
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authTokenUser')
      if (!token) {
        setError('Unauthorized. Please log in.')
        router.push('/auth/login');
        return
      }

      try {
        const response = await fetch(`${apiUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }

        const data = await response.json()
        setUserData(data)

        // Fetch schedulings after user data is loaded
        fetchSchedulings(token)
      } catch (error) {
        setError(error.message)
      }
    }

    const fetchSchedulings = async (token) => {
      try {
        const response = await fetch(`${apiUrl}/schedules`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch schedulings')
        }

        const data = await response.json()
        setSchedulings(data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchUserData()
  }, [])

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const token = localStorage.getItem('authTokenUser')
    if (!token) {
      setError('Unauthorized. Please log in.')
      return
    }

    try {
      const response = await fetch(`${apiUrl}}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ new_password: newPassword, current_password: currentPassword }),
      })

      if (!response.ok) {
        throw new Error('Invalid Credentials. Failed to update password')
      }

      setIsEditingPassword(false)
      setNewPassword('')
      setConfirmPassword('')
      setSuccess('Password updated successfully')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError(error.message)
    }
  }

  if (!userData) {
    return <div className="text-center text-pink-500">Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-pink-800 mb-6">User Profile</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <User className="h-5 w-5 text-pink-500 mr-2" />
              <span className="text-lg font-semibold text-pink-700">Name:</span>
            </div>
            <div className="flex items-center">
              <span className="text-pink-600">{userData.name}</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Mail className="h-5 w-5 text-pink-500 mr-2" />
              <span className="text-lg font-semibold text-pink-700">Email:</span>
            </div>
            <span className="text-pink-600">{userData.email}</span>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Phone className="h-5 w-5 text-pink-500 mr-2" />
              <span className="text-lg font-semibold text-pink-700">Phone:</span>
            </div>
            <span className="text-pink-600">{userData.phone}</span>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <span className="text-lg font-semibold text-pink-700">Password:</span>
            </div>
            {isEditingPassword ? (
              <form onSubmit={handlePasswordSubmit} className="space-y-2">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-pink-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full h-10 px-3 rounded-md border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-pink-500 hover:text-pink-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-pink-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-pink-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Update Password
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsEditingPassword(true)}
                className="text-pink-500 hover:text-pink-600"
              >
                Change Password
              </button>
            )}
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>

        {/* My Schedulings Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-pink-800 mb-4">My Schedulings</h2>
          {schedulings.length > 0 ? (
            <ul className="space-y-4">
              {schedulings.map((scheduling) => (
                <li key={scheduling.id} className="border-b border-pink-100 pb-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                    <Link href={`schedule?id=${scheduling.orphanage_id}`}>
                      <span className="font-semibold text-pink-700">{scheduling.orphanage_name}</span>
                    </Link>
                  </div>
                  <div className="text-pink-600">
                    Date And Time: {scheduling.scheduled_at}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-pink-600">No schedulings found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
