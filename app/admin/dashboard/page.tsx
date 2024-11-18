'use client'

import { useState } from 'react'
import Link from "next/link"
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AdminNavbar from '@/components/AdminNavBar'

// Mock data for orphanages
const initialOrphanages = [
    { id: 1, name: "Sunshine Orphanage", location: "New York, NY", phone: "+1 (555) 123-4567" },
    { id: 2, name: "Hope Haven", location: "Los Angeles, CA", phone: "+1 (555) 987-6543" },
    { id: 3, name: "Little Angels Home", location: "Chicago, IL", phone: "+1 (555) 456-7890" },
]

export default function AdminOrphanagesPage() {
    const router = useRouter()

    const [orphanages, setOrphanages] = useState(initialOrphanages)
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [newOrphanage, setNewOrphanage] = useState({ name: '', location: '', phone: '' })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleAdd = () => {
        if (!newOrphanage.name || !newOrphanage.location || !newOrphanage.phone) {
            setError('All fields are required')
            return
        }
        const id = Math.max(...orphanages.map(o => o.id), 0) + 1
        setOrphanages([...orphanages, { ...newOrphanage, id }])
        setNewOrphanage({ name: '', location: '', phone: '' })
        setIsAdding(false)
        setSuccess('Orphanage added successfully')
        setTimeout(() => setSuccess(''), 3000)
    }

    const handleUpdate = (id: number) => {
        const updatedOrphanages = orphanages.map(orphanage =>
            orphanage.id === id ? { ...orphanage, ...newOrphanage } : orphanage
        )
        setOrphanages(updatedOrphanages)
        setEditingId(null)
        setNewOrphanage({ name: '', location: '', phone: '' })
        setSuccess('Orphanage updated successfully')
        setTimeout(() => setSuccess(''), 3000)
    }

    const handleDelete = (id: number) => {
        setOrphanages(orphanages.filter(orphanage => orphanage.id !== id))
        setSuccess('Orphanage deleted successfully')
        setTimeout(() => setSuccess(''), 3000)
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
                    {isAdding && (
                        <div className="mb-4 p-4 border border-blue-200 rounded-md">
                            <h3 className="text-lg font-semibold text-blue-700 mb-2">Add New Orphanage</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newOrphanage.name}
                                    onChange={(e) => setNewOrphanage({ ...newOrphanage, name: e.target.value })}
                                    className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={newOrphanage.location}
                                    onChange={(e) => setNewOrphanage({ ...newOrphanage, location: e.target.value })}
                                    className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    value={newOrphanage.phone}
                                    onChange={(e) => setNewOrphanage({ ...newOrphanage, phone: e.target.value })}
                                    className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={handleAdd}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                    <ul className="space-y-4">
                        {orphanages.map((orphanage) => (
                            <li key={orphanage.id} className="border-b border-blue-100 pb-4 last:border-b-0">
                                {editingId === orphanage.id ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                        <input
                                            type="text"
                                            value={newOrphanage.name}
                                            onChange={(e) => setNewOrphanage({ ...newOrphanage, name: e.target.value })}
                                            className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <input
                                            type="text"
                                            value={newOrphanage.location}
                                            onChange={(e) => setNewOrphanage({ ...newOrphanage, location: e.target.value })}
                                            className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <input
                                            type="text"
                                            value={newOrphanage.phone}
                                            onChange={(e) => setNewOrphanage({ ...newOrphanage, phone: e.target.value })}
                                            className="w-full h-10 px-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                        <span className="font-semibold text-blue-700">{orphanage.name}</span>
                                        <span className="text-blue-600">{orphanage.location}</span>
                                        <span className="text-blue-600">{orphanage.phone}</span>
                                    </div>
                                )}
                                <div className="flex justify-end space-x-2 mt-2">
                                    {editingId === orphanage.id ? (
                                        <>
                                            <button
                                                onClick={() => handleUpdate(orphanage.id)}
                                                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingId(null)
                                                    setNewOrphanage({ name: '', location: '', phone: '' })
                                                }}
                                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
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
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
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