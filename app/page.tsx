import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-pink-100 to-pink-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-pink-800">
                  Connecting Hearts, Creating Families
                </h1>
                <p className="mx-auto max-w-[700px] text-pink-700 md:text-xl">
                  ADOPTIVE simplifies the adoption process, helping you find and connect with children waiting for their forever homes.
                </p>
              </div>
              <div className="flex space-x-4">
                <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-100">
                  <Link href="/auth/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-pink-800">Our Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-pink-50 border-pink-100 flex flex-col items-center text-center">
                <CardHeader>
                  <Search className="h-10 w-10 text-pink-500 mb-2" />
                  <CardTitle className="text-pink-700">Orphanage Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pink-600">
                    Easily find orphanages based on location criteria such as city, state, or country.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-pink-50 border-pink-100 flex flex-col items-center text-center">
                <CardHeader>
                  <UserPlus className="h-10 w-10 text-pink-500 mb-2" />
                  <CardTitle className="text-pink-700">Child Profiles</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pink-600">
                    Access comprehensive profiles of children, including photos, videos, and personal stories.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-pink-50 border-pink-100 flex flex-col items-center text-center">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-pink-500 mb-2" />
                  <CardTitle className="text-pink-700">Appointment Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pink-600">
                    Book visits to orphanages directly through our platform with ease.
                  </CardDescription>
                </CardContent>
              </Card>
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
              <Button asChild variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-200">
                <Link href="/about">Learn More About Us</Link>
              </Button>
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
              <Button asChild variant="secondary" size="lg" className="bg-white text-pink-600 hover:bg-pink-100">
                <Link href="/auth/signup">Sign Up Now</Link>
              </Button>
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