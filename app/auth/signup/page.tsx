'use client'

import { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone)
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(event.currentTarget)
    const fullName = formData.get('fullName') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!validatePhoneNumber(phone)) {
      setError('Please enter a valid phone number.')
      setIsLoading(false)
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      setIsLoading(false)
      return
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long.')
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setIsLoading(false)
      return
    }

    try {
      // Here you would typically make an API call to your backend
      // For demonstration, we're just simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulating a successful signup
      console.log('Signup successful', { fullName, phone, email })
      router.push('/dashboard')
    } catch (error) {
      console.error('Signup error:', error)
      setError('An error occurred during signup. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white shadow-sm">
        <Link className="flex items-center justify-center" href="/">
          <Heart className="h-6 w-6 text-pink-500" />
          <span className="ml-2 text-2xl font-bold text-pink-600">ADOPTIVE</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-pink-800">Sign up for ADOPTIVE</CardTitle>
            <CardDescription className="text-center text-pink-600">
              Create an account to start your adoption journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName" className="text-pink-700">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    type="text"
                    autoCapitalize="words"
                    autoComplete="name"
                    disabled={isLoading}
                    className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-pink-700">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1234567890"
                    type="tel"
                    autoCapitalize="none"
                    autoComplete="tel"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-pink-700">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-pink-700">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword" className="text-pink-700">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                >
                  {isLoading ? "Signing up..." : "Sign Up"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-center text-pink-600 w-full">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-pink-700 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
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