'use client'

import { useEffect } from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function StylistAppointments() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Appointments | Tosha Stylist'
        }
    }, [])

    const stylistData = {
        name: "Tosha Stylist",
        qualification: "Professional Hair & Beauty Specialist",
        image: "https://i.postimg.cc/1XmpxyVH/logo.png"
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <DashboardSidebar userType="stylist" userData={stylistData} />
            <div className="flex-1 lg:ml-0">
                <DashboardHeader title="Appointments" />
                <main className="p-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
                        <p className="text-gray-600">Booking management page coming soon...</p>
                    </div>
                </main>
            </div>
        </div>
    )
}

