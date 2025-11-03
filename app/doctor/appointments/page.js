'use client'

import { useEffect } from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default function DoctorAppointments() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Appointments | DocTalk'
        }
    }, [])

    const doctorData = {
        name: "Dr. Marttin Deo",
        qualification: "MBBS, FCPS - MD (Medicine), MCPS",
        image: "https://i.postimg.cc/1XmpxyVH/logo.png"
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <DashboardSidebar userType="doctor" userData={doctorData} />
            <div className="flex-1 lg:ml-0">
                <DashboardHeader title="Appointments" />
                <main className="p-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
                        <p className="text-gray-600">Appointment management page coming soon...</p>
                    </div>
                </main>
            </div>
        </div>
    )
}

