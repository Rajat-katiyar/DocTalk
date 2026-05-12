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
    const [stats, setStats] = useState({
        totalClients: '500+',
        todayClients: '012',
        todayAppointments: '015'
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Tosha Stylist Dashboard | DocTalk'
        }
    }, [])

    const stylistData = {
        name: "Tosha Stylist",
        qualification: "Professional Hair & Beauty Specialist",
        image: "https://i.postimg.cc/1XmpxyVH/logo.png"
    }

    return (
        <div className="flex min-h-screen bg-gray-50" style={{ marginTop: 0, marginBottom: 0 }}>
            {/* Sidebar */}
            <div className={`fixed lg:static inset-y-0 left-0 z-30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300`}>
                <DashboardSidebar userType="stylist" userData={stylistData} />
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-0">
                <DashboardHeader title="Tosha Stylist Dashboard" onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                
                <main className="p-6">
                    {/* Stats Cards */}
                    <DashboardStats stats={stats} type="stylist" />

                    {/* Middle Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <PatientSummaryChart type="stylist" />
                        <TodayAppointments type="stylist" />
                        <NextPatientDetails type="stylist" />
                    </div>

                    {/* Bottom Row */}
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

