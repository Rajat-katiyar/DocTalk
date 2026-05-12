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

export default function StylistDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [stats] = useState({
        totalClients: '500+',
        todayClients: '012',
        todayAppointments: '015'
    })

    useEffect(() => {
        document.title = 'Tosha Stylist Dashboard | DocTalk'
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
                <DashboardHeader title="Tosha Stylist Dashboard" onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 sm:p-6">
                    <DashboardStats stats={stats} type="stylist" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <PatientSummaryChart type="stylist" />
                        <TodayAppointments type="stylist" />
                        <NextPatientDetails type="stylist" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <ReviewChart type="stylist" />
                        <AppointmentRequests type="stylist" />
                        <DashboardCalendar />
                    </div>
                </main>
            </div>
        </div>
    )
}
