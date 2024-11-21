'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AdminNavbar from '@/components/AdminNavBar'
import Footer from '@/components/Footer'
import apiUrl from '@/app/apiUrls'

export default function AdminOrphanagesPage() {
    const router = useRouter()


    const [orphanages, setOrphanages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [newOrphanage, setNewOrphanage] = useState({ name: '', location: '', phone: '' })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    console.log(isLoading);
    console.log(newOrphanage);
    console.log(setNewOrphanage)

    // Fetch orphanages from the API
    useEffect(() => {
        const fetchOrphanages = async () => {
            setIsLoading(true)
            try {
                const token = localStorage.getItem('authTokenAdmin')
                if (!token) throw new Error('Unauthorized. Please log in.')

                const response = await fetch(`${apiUrl}/admin/orphanages`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (!response.ok) throw new Error('Failed to fetch orphanages')

                const data = await response.json()
                setOrphanages(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchOrphanages()
    }, [])

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('authTokenAdmin')
            if (!token) {
                throw new Error('Unauthorized. Please log in.')
            }

            const response = await fetch(`${apiUrl}/admin/orphanages/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to delete orphanage')
            }

            // Update state to remove the deleted orphanage
            setOrphanages(orphanages.filter((orphanage) => orphanage.id !== id))
            setSuccess('Orphanage deleted successfully')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.message)
            setTimeout(() => setError(''), 3000)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-blue-50">
            <AdminNavbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Manage Orphanages</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-blue-700">Orphanages List</h2>
                        <button
                            onClick={() => router.push('/admin/dashboard/add-orphanage')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Plus className="h-5 w-5 inline-block mr-1" /> Add Orphanage
                        </button>
                    </div>

                    <ul className="space-y-4">
                        {orphanages.map((orphanage) => (
                            <li key={orphanage.id} className="border-b border-blue-100 pb-4 last:border-b-0">

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    <span className="font-semibold text-blue-700">{orphanage.name}</span>
                                    <span className="text-blue-600">{orphanage.address}</span>
                                    <span className="text-blue-600">{orphanage.phone}</span>
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">

                                    <>
                                        <button
                                            onClick={() => {
                                                router.push(`/admin/dashboard/edit-orphanage?id=${orphanage.id}`)
                                            }}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            <Edit className="h-4 w-4 inline-block" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(orphanage.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            <Trash2 className="h-4 w-4 inline-block" />
                                        </button>
                                        <button
                                        onClick={() => router.push(`/admin/dashboard/view-schedulings?id=${orphanage.id}`)}
                                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        <Calendar className="h-4 w-4 inline-block mr-1" /> View Schedulings
                                    </button>
                                    </>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    )
}