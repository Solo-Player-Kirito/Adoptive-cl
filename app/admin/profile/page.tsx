'use client'

import { useState } from 'react'
import { User, Mail, Eye, EyeOff } from 'lucide-react'
import AdminNavbar from '@/components/AdminNavBar'
import Footer from '@/components/Footer'

// Mock admin data
const adminData = {
  username: "admin123",
  email: "admin@adoptive.org"
}

export default function AdminProfilePage() {
  const [admin] = useState(adminData)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      return
    }

    try {
        // API call to change password admin
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Password change request:', { currentPassword, newPassword })
      
      setSuccess('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error('Error changing password:', error)
      setError('An error occurred while changing the password. Please try again.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
        <AdminNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Admin Profile</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Account Information</h2>
            <div className="flex items-center mb-3">
              <User className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-blue-700 mr-2">Username:</span>
              <span className="text-blue-600">{admin.username}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-blue-700 mr-2">Email:</span>
              <span className="text-blue-600">{admin.email}</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-blue-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-500 hover:text-blue-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-blue-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}