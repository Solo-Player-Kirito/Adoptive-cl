'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Heart, Search, User, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react'
import Footer from '@/components/Footer'

export default function AdminUsersPage() {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortField, setSortField] = useState('name')
    const [sortDirection, setSortDirection] = useState('asc')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true)
            try {
                const token = localStorage.getItem('authTokenAdmin') // Assuming token is stored in localStorage
                if (!token) throw new Error('Unauthorized. Please log in.')

                const response = await fetch(`${apiUrl}/admin/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch users')
                }

                const data = await response.json()
                setUsers(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUsers()
    }, [apiUrl])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    const filteredAndSortedUsers = users
        .filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
            if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
            return 0
        })

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
                    <Link className="text-sm font-medium hover:text-blue-600 hover:underline underline-offset-4" href="/admin/profile">
                        Admin Profile
                    </Link>
                </nav>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">User Management</h1>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {isLoading ? (
                        <p className="text-blue-600">Loading users...</p>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-blue-700">All Users</h2>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="h-10 pl-10 pr-3 rounded-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-blue-100">
                                            <th className="px-4 py-2 text-left">
                                                <button
                                                    className="flex items-center text-blue-700 font-semibold"
                                                    onClick={() => handleSort('name')}
                                                >
                                                    Name
                                                    {sortField === 'name' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                                                    )}
                                                </button>
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                <button
                                                    className="flex items-center text-blue-700 font-semibold"
                                                    onClick={() => handleSort('email')}
                                                >
                                                    Email
                                                    {sortField === 'email' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                                                    )}
                                                </button>
                                            </th>
                                            <th className="px-4 py-2 text-left">Phone</th>
                                            <th className="px-4 py-2 text-left">
                                                <button
                                                    className="flex items-center text-blue-700 font-semibold"
                                                    onClick={() => handleSort('role')}
                                                >
                                                    Role
                                                    {sortField === 'role' && (
                                                        sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                                                    )}
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAndSortedUsers.map((user) => (
                                            <tr key={user.id} className="border-b border-blue-100 last:border-b-0">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <User className="h-5 w-5 text-blue-500 mr-2" />
                                                        <span className="text-blue-600">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <Mail className="h-5 w-5 text-blue-500 mr-2" />
                                                        <span className="text-blue-600">{user.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <Phone className="h-5 w-5 text-blue-500 mr-2" />
                                                        <span className="text-blue-600">{user.phone}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {"User"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filteredAndSortedUsers.length === 0 && (
                                <p className="text-blue-600 mt-4">No users found matching your search criteria.</p>
                            )}
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
