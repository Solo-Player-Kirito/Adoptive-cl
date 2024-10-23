import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Search, Calendar, UserPlus } from "lucide-react"
import 'react'

export default function AboutPage() {
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
          <Link className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4" href="/signup">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-pink-100 to-pink-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-pink-800">
                  About ADOPTIVE
                </h1>
                <p className="mx-auto max-w-[700px] text-pink-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connecting hearts and creating families through innovative adoption solutions
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-pink-50 border-pink-100">
                <CardHeader>
                  <Heart className="h-10 w-10 text-pink-500 mb-2" />
                  <CardTitle className="text-pink-700">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pink-600">
                    ADOPTIVE is dedicated to simplifying the adoption process, making it easier for prospective parents to connect with children in need of loving homes. We strive to create a supportive community that celebrates the beauty of adoption.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-pink-50 border-pink-100">
                <CardHeader>
                  <UserPlus className="h-10 w-10 text-pink-500 mb-2" />
                  <CardTitle className="text-pink-700">Who We Are</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pink-600">
                    We are a team of passionate individuals with diverse backgrounds in technology, social work, and child welfare. Our experiences have driven us to create a platform that addresses the challenges in the adoption process.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-pink-50 border-pink-100">
                <CardHeader>
                  <Search className="h-10 w-10 text-pink-500 mb-2" />
                  <CardTitle className="text-pink-700">What We Do</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pink-600">
                    ADOPTIVE provides a comprehensive digital platform that centralizes the adoption process. We offer tools for orphanage search, detailed child profiles, and streamlined appointment scheduling, all designed to make adoption more accessible.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-100">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-pink-800">Our Key Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center">
                <Search className="h-12 w-12 text-pink-500 mb-4" />
                <h3 className="text-xl font-bold text-pink-700 mb-2">Orphanage Search</h3>
                <p className="text-pink-600">
                  Easily find and connect with orphanages based on location, making it simpler to explore adoption opportunities near you.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <UserPlus className="h-12 w-12 text-pink-500 mb-4" />
                <h3 className="text-xl font-bold text-pink-700 mb-2">Child Profiles</h3>
                <p className="text-pink-600">
                  Access comprehensive profiles of children available for adoption, including photos, videos, and personal stories.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Calendar className="h-12 w-12 text-pink-500 mb-4" />
                <h3 className="text-xl font-bold text-pink-700 mb-2">Appointment Scheduling</h3>
                <p className="text-pink-600">
                  Seamlessly book visits to orphanages directly through our platform, streamlining the process of meeting potential adoptees.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pink-800">Join Our Community</h2>
                <p className="mx-auto max-w-[700px] text-pink-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Be part of a supportive network of adoptive parents, children, and professionals. Together, we can make a difference in the lives of children waiting for their forever homes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white">
                  <Link href="/signup">Sign Up Now</Link>
                </Button>
                <Button asChild variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-100">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
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