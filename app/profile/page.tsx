'use client'

import { useState } from 'react'
import Link from "next/link"
import { User, Mail, Phone, Calendar, Edit, Eye, EyeOff } from 'lucide-react'
import Navbar from '@/components/NavBar'

// Mock user data
const initialUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567"
}

// Mock scheduling data
const schedulings = [
  { id: 1, orphanage: "Sunshine Orphanage", date: "2024-03-15", time: "10:00 AM" },
  { id: 2, orphanage: "Hope Haven", date: "2024-03-20", time: "2:00 PM" },
  { id: 3, orphanage: "Little Angels Home", date: "2024-03-25", time: "11:30 AM" },
]

export default function UserProfilePage() {
  const [userData, setUserData] = useState(initialUserData)
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [newName, setNewName] = useState(userData.name)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUserData({ ...userData, name: newName })
    setIsEditingName(false)
    setSuccess('Name updated successfully')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setIsEditingPassword(false)
    setNewPassword('')
    setConfirmPassword('')
    setSuccess('Password updated successfully')
    setTimeout(() => setSuccess(''), 3000)
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
            {isEditingName ? (
              <form onSubmit={handleNameSubmit} className="flex items-center">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="flex-grow h-10 px-3 rounded-md border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="flex items-center">
                <span className="text-pink-600">{userData.name}</span>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="ml-2 text-pink-500 hover:text-pink-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            )}
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-pink-800 mb-4">My Schedulings</h2>
          {schedulings.length > 0 ? (
            <ul className="space-y-4">
              {schedulings.map((scheduling) => (
                <li key={scheduling.id} className="border-b border-pink-100 pb-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="font-semibold text-pink-700">{scheduling.orphanage}</span>
                  </div>
                  <div className="text-pink-600">
                    Date: {scheduling.date} | Time: {scheduling.time}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-pink-600">No schedulings found.</p>
          )}
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