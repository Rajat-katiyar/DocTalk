'use client'

import { useState, useEffect } from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardHeader from '@/components/DashboardHeader'
import DashboardStats from '@/components/DashboardStats'
import PatientSummaryChart from '@/components/PatientSummaryChart'
import TodayAppointments from '@/components/TodayAppointments'
import NextPatientDetails from '@/components/NextPatientDetails'
import ReviewChart from '@/components/ReviewChart'
import AppointmentRequests from '@/components/AppointmentRequests'
import DashboardCalendar from '@/components/DashboardCalendar'

export default function DoctorDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [stats] = useState({
        totalPatients: '2000+',
        todayPatients: '068',
        todayAppointments: '085'
    })

    useEffect(() => {
        document.title = 'Doctor Dashboard | DocTalk'
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
                <DashboardHeader title="Dashboard" onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 sm:p-6">
                    <DashboardStats stats={stats} type="doctor" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <PatientSummaryChart type="doctor" />
                        <TodayAppointments type="doctor" />
                        <NextPatientDetails type="doctor" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <ReviewChart type="doctor" />
                        <AppointmentRequests type="doctor" />
                        <DashboardCalendar />
                    </div>
                </main>
            </div>
        </div>
    )
}
