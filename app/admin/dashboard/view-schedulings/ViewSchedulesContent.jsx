'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Calendar, Clock, User, Phone } from 'lucide-react'
import AdminNavbar from '@/components/AdminNavBar'
import Footer from '@/components/Footer'
import apiUrl from '@/app/apiUrls'

export default function AdminOrphanageSchedulingsPage() {
    const searchParams = useSearchParams()
    const orphanageId = searchParams.get('id') // Get orphanage ID from query parameters
    const router = useRouter()

    const [schedulings, setSchedulings] = useState([])
    const [orphanageName, setOrphanageName] = useState('Orphanage')
    const [error, setError] = useState('')

    // Fetch schedulings and orphanage name
    useEffect(() => {
        if (!orphanageId) {
            setError('No orphanage ID provided.')
            return
        }

        const fetchSchedulings = async () => {
            try {
                const token = localStorage.getItem('authTokenAdmin') // Use admin auth token
                if (!token) {
                    setError('Unauthorized. Please log in.')
                    router.push('/admin/login')
                    return
                }

                const response = await fetch(`${apiUrl}/admin/orphanage/schedules/${orphanageId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch schedulings')
                }

                const data = await response.json()
                console.log("api res", data)
                setSchedulings(data || [])
                setOrphanageName(data.orphanageName || 'Orphanage') // Assuming API provides orphanage name
            } catch (error) {
                setError(error.message)
            }
        }

        fetchSchedulings()
    }, [orphanageId, router])

    if (error) {
        return <div className="text-center text-blue-600">{error}</div>
    }

    return (
        <div className="flex flex-col min-h-screen bg-blue-50">
            <AdminNavbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Orphanage Schedulings</h1>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-blue-700">{orphanageName}</h2>
                    </div>
                    {schedulings.length > 0 ? (
                        <ul className="space-y-4">
                            {schedulings.map((scheduling) => (
                                <li key={scheduling.schedule_id} className="border-b border-blue-100 pb-4 last:border-b-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                                            <span className="text-blue-700 font-medium mr-2">Date:</span>
                                            <span className="text-blue-600">{scheduling.scheduled_at}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-5 w-5 text-blue-500 mr-2" />
                                            <span className="text-blue-700 font-medium mr-2">Schedule Id:</span>
                                            <span className="text-blue-600">{scheduling.schedule_id}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <User className="h-5 w-5 text-blue-500 mr-2" />
                                            <span className="text-blue-700 font-medium mr-2">Visitor:</span>
                                            <span className="text-blue-600">{scheduling.user_name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-5 w-5 text-blue-500 mr-2" />
                                            <span className="text-blue-700 font-medium mr-2">Phone:</span>
                                            <span className="text-blue-600">{scheduling.user_phone}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-blue-600">No schedulings found for this orphanage.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}