import Link from "next/link"
import { Heart, Search, Calendar, UserPlus } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white shadow-sm">
        <Link className="flex items-center justify-center" href="/">
          <Heart className="h-6 w-6 text-pink-500" />
          <span className="ml-2 text-2xl font-bold text-pink-600">ADOPTIVE</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-pink-600 hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/home_bg.webp')] bg-cover bg-center bg-no-repeat text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-shadow-md bg-blue-600">

                  Connecting Hearts, Creating Families
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl bg-blue-600">
                  ADOPTIVE simplifies the adoption process, helping you find and connect with children waiting for their forever homes.
                </p>
              </div>
              <div className="flex space-x-4">
                <Link href="/auth/signup" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-pink-500 text-white hover:bg-pink-600 h-10 py-2 px-4">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-pink-800">Our Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center p-6 bg-pink-50 rounded-lg border border-pink-100">
                <Search className="h-10 w-10 text-pink-500 mb-2" />
                <h3 className="text-xl font-bold text-pink-700 mb-2">Orphanage Search</h3>
                <p className="text-pink-600">
                  Easily find orphanages based on location criteria such as city, state, or country.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-pink-50 rounded-lg border border-pink-100">
                <UserPlus className="h-10 w-10 text-pink-500 mb-2" />
                <h3 className="text-xl font-bold text-pink-700 mb-2">Extensive Profiles</h3>
                <p className="text-pink-600">
                  Access comprehensive profiles of orphanages, including photos, videos, and learn more about their volunteering activities.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-pink-50 rounded-lg border border-pink-100">
                <Calendar className="h-10 w-10 text-pink-500 mb-2" />
                <h3 className="text-xl font-bold text-pink-700 mb-2">Appointment Scheduling</h3>
                <p className="text-pink-600">
                  Book visits to orphanages directly through our platform with ease.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-pink-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-800">About ADOPTIVE</h2>
                <p className="mx-auto max-w-[700px] text-pink-700 md:text-xl">
                  ADOPTIVE is a digital adoption assistance platform designed to centralize the adoption process. We make it easier for prospective parents to connect with orphanages and explore profiles of children available for adoption.
                </p>
              </div>
              <Link href="/about" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-pink-300 text-pink-700 hover:bg-pink-200 h-10 py-2 px-4">
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-pink-500 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Your Journey?</h2>
                <p className="mx-auto max-w-[600px] text-pink-100 md:text-xl">
                  Join ADOPTIVE today and take the first step towards growing your family through adoption.
                </p>
              </div>
              <Link href="/auth/signup" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-white text-pink-600 hover:bg-pink-100 h-10 py-2 px-4">
                Sign Up Now
              </Link>
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