import Link from "next/link"
import { Heart, Search, Calendar, UserPlus } from "lucide-react"
import Navbar from "@/components/NavBar"
import Footer from "@/components/Footer"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      <Navbar /> 
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-pink-100">
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
              <div className="flex flex-col items-center text-center p-6 bg-pink-50 rounded-lg border border-pink-100">
                <Heart className="h-10 w-10 text-pink-500 mb-2" />
                <h2 className="text-xl font-bold text-pink-700 mb-2">Our Mission</h2>
                <p className="text-pink-600">
                  ADOPTIVE is dedicated to simplifying the adoption process, making it easier for prospective parents to connect with children in need of loving homes. We strive to create a supportive community that celebrates the beauty of adoption.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-pink-50 rounded-lg border border-pink-100">
                <UserPlus className="h-10 w-10 text-pink-500 mb-2" />
                <h2 className="text-xl font-bold text-pink-700 mb-2">Who We Are</h2>
                <p className="text-pink-600">
                  We are a team of passionate individuals with diverse backgrounds in technology, social work, and child welfare. Our experiences have driven us to create a platform that addresses the challenges in the adoption process.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-pink-50 rounded-lg border border-pink-100">
                <Search className="h-10 w-10 text-pink-500 mb-2" />
                <h2 className="text-xl font-bold text-pink-700 mb-2">What We Do</h2>
                <p className="text-pink-600">
                  ADOPTIVE provides a comprehensive digital platform that centralizes the adoption process. We offer tools for orphanage search, detailed orphanage profiles, and streamlined appointment scheduling, all designed to make adoption more accessible.
                </p>
              </div>
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
                <h3 className="text-xl font-bold text-pink-700 mb-2">Extensive Profiles</h3>
                <p className="text-pink-600">
                  Access comprehensive profiles of orphanages, including photos, videos, and learn more about their volunteering activities.
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
                <Link 
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-pink-500 text-white hover:bg-pink-600 h-10 py-2 px-4"
                >
                  Sign Up Now
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-pink-200 text-pink-700 hover:bg-pink-100 h-10 py-2 px-4"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    <Footer /> 
    </div>
  )
}