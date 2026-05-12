'use client'

import { useState, useEffect } from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function DoctorAppointments() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        document.title = 'Appointments | DocTalk'
    }, [])

    const doctorData = {
        name: "Dr. Marttin Deo",
        qualification: "MBBS, FCPS - MD (Medicine), MCPS",
        image: "https://i.postimg.cc/1XmpxyVH/logo.png"
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardSidebar
                userType="doctor"
                userData={doctorData}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="lg:pl-64">
                <DashboardHeader title="Appointments" onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 sm:p-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
                        <p className="text-gray-600">Appointment management page coming soon...</p>
                    </div>
                </main>
            </div>
        </div>
    )
}
