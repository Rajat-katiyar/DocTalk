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
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [stats, setStats] = useState({
        totalPatients: '2000+',
        todayPatients: '068',
        todayAppointments: '085'
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Doctor Dashboard | DocTalk'
            // Desktop par default open, mobile par default close
            const isMobile = window.innerWidth < 1024
            setSidebarOpen(!isMobile)
        }
    }, [])

    const doctorData = {
        name: "Dr. Marttin Deo",
        qualification: "MBBS, FCPS - MD (Medicine), MCPS",
        image: "https://i.postimg.cc/1XmpxyVH/logo.png"
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <div className="flex min-h-screen bg-gray-50" style={{ marginTop: 0, marginBottom: 0 }}>
            {/* Sidebar */}
            <div className={`fixed lg:relative inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <DashboardSidebar 
                    userType="doctor" 
                    userData={doctorData}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
                <DashboardHeader title="Dashboard" onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
                
                <main className="p-6">
                    {/* Stats Cards */}
                    <DashboardStats stats={stats} type="doctor" />

                    {/* Middle Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <PatientSummaryChart type="doctor" />
                        <TodayAppointments type="doctor" />
                        <NextPatientDetails type="doctor" />
                    </div>

                    {/* Bottom Row */}
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

