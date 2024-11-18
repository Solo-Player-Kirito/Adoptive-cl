'use client'

import { useState } from 'react'
import Link from "next/link"
import { Heart } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    // input validation
    if (!username.trim()) {
      setError('Please enter your username.')
      setIsSubmitting(false)
      return
    }

    try {
      // API call to send password reset link
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Password reset request sent for:', username)
      setSuccess('Password reset link sent successfully! Please check your email.')
    } catch (error) {
      console.error('Error sending password reset link:', error)
      setError('An error occurred while processing your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white shadow-sm">
        <Link className="flex items-center justify-center" href="/">
          <Heart className="h-6 w-6 text-blue-500" />
          <span className="ml-2 text-2xl font-bold text-blue-600">ADOPTIVE</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-800">Forgot Password</h1>
            <p className="text-blue-600 mt-2">Enter your username to reset your password</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-blue-700 mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin123"
                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/admin/login" className="text-sm text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-6 w-full shrink-0 bg-white border-t border-blue-200">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-blue-600 text-center sm:text-left">© 2024 ADOPTIVE. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="text-xs hover:underline underline-offset-4 text-blue-600 hover:text-blue-700" href="/terms">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4 text-blue-600 hover:text-blue-700" href="/privacy">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
