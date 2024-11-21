'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Heart } from 'lucide-react'
import Footer from '@/components/Footer'
import apiUrl from '@/app/apiUrls'
import { useSearchParams } from 'next/navigation'

export default function UpdateOrphanagePage() {
    const searchParams = useSearchParams()
    const orphanageId = searchParams.get('id')

    const [orphanage, setOrphanage] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!orphanageId) {
            setError('No orphanage ID provided.')
            return
        }

        const fetchOrphanage = async () => {
            setIsLoading(true)
            setError('')
            try {
                const token = localStorage.getItem('authTokenAdmin')
                if (!token) {
                    throw new Error('Unauthorized. Please log in.')
                }

                const response = await fetch(`${apiUrl}/orphanages/${orphanageId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch orphanage details.')
                }

                const data = await response.json()
                setOrphanage(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchOrphanage()
    }, [orphanageId])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOrphanage(prev => ({ ...prev, [name]: value }))
    }

    const formatTimeToHHmm = (time) => {
        // Ensure time is in HHmm format
        return time.replace(':', '')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try {
            const token = localStorage.getItem('authTokenAdmin')
            if (!token) {
                throw new Error('Unauthorized. Please log in.')
            }

            const response = await fetch(`${apiUrl}/admin/orphanage/edit/${orphanageId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    visiting_hours_start: formatTimeToHHmm(orphanage.visiting_hours_start).slice(0, -3),
                    visiting_hours_end: formatTimeToHHmm(orphanage.visiting_hours_end).slice(0, -3),
                    extra_note: orphanage.extra_note || '',
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update orphanage.')
            }

            setSuccess('Orphanage updated successfully!')
        } catch (err) {
            setError(err.message)
        }
    }

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    if (!orphanage) {
        return <div className="flex items-center justify-center min-h-screen">{error || 'No orphanage found.'}</div>
    }

    return (
        <div className="flex flex-col min-h-screen bg-blue-50">
            <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white shadow-sm">
                <Link className="flex items-center justify-center" href="/">
                    <Heart className="h-6 w-6 text-blue-500" />
                    <span className="ml-2 text-2xl font-bold text-blue-600">ADOPTIVE</span>
                </Link>
                <nav className="flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4" href="/">
                        Home
                    </Link>
                    <Link className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4" href="/admin">
                        Admin Dashboard
                    </Link>
                </nav>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Update Orphanage</h1>
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-blue-700 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={orphanage.name}
                                readOnly
                                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 bg-gray-100 text-gray-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={orphanage.email}
                                readOnly
                                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 bg-gray-100 text-gray-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-blue-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={orphanage.phone}
                                readOnly
                                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 bg-gray-100 text-gray-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-blue-700 mb-1">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={orphanage.address}
                                readOnly
                                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 bg-gray-100 text-gray-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="visiting_hours_start" className="block text-sm font-medium text-blue-700 mb-1">Visiting Hours Start</label>
                            <input
                                type="time"
                                id="visiting_hours_start"
                                name="visiting_hours_start"
                                value={orphanage.visiting_hours_start}
                                onChange={handleInputChange}
                                required
                                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="visiting_hours_end" className="block text-sm font-medium text-blue-700 mb-1">Visiting Hours End</label>
                            <input
                                type="time"
                                id="visiting_hours_end"
                                name="visiting_hours_end"
                                value={orphanage.visiting_hours_end}
                                onChange={handleInputChange}
                                required
                                className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="extra_note" className="block text-sm font-medium text-blue-700 mb-1">Extra Note</label>
                        <textarea
                            id="extra_note"
                            name="extra_note"
                            value={orphanage.extra_note || ''}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></textarea>
                    </div>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    {success && <p className="text-green-500 mt-4">{success}</p>}
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Update Orphanage
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    )
}
