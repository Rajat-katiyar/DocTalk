'use client'

import { useState, useEffect } from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function StylistAppointments() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        document.title = 'Appointments | Tosha Stylist'
    }, [])

    const stylistData = {
        name: "Tosha Stylist",
        qualification: "Professional Hair & Beauty Specialist",
        image: "https://i.postimg.cc/1XmpxyVH/logo.png"
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardSidebar
                userType="stylist"
                userData={stylistData}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="lg:pl-64">
                <DashboardHeader title="Appointments" onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 sm:p-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
                        <p className="text-gray-600">Booking management page coming soon...</p>
                    </div>
                </main>
            </div>
        </div>
    )
}
