'use client'

import { Users, Calendar, Clock } from 'lucide-react'

const DashboardStats = ({ stats, type = 'doctor' }) => {
    const doctorStats = [
        {
            title: 'Total Patient',
            value: stats?.totalPatients || '2000+',
            subtitle: 'Till Today',
            icon: Users,
            color: 'bg-blue-500'
        },
        {
            title: 'Today Patient',
            value: stats?.todayPatients || '068',
            subtitle: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            icon: Users,
            color: 'bg-blue-500'
        },
        {
            title: 'Today Appointments',
            value: stats?.todayAppointments || '085',
            subtitle: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            icon: Calendar,
            color: 'bg-blue-500'
        }
    ]

    const stylistStats = [
        {
            title: 'Total Clients',
            value: stats?.totalClients || '500+',
            subtitle: 'Till Today',
            icon: Users,
            color: 'bg-purple-500'
        },
        {
            title: 'Today Clients',
            value: stats?.todayClients || '012',
            subtitle: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            icon: Users,
            color: 'bg-purple-500'
        },
        {
            title: 'Today Appointments',
            value: stats?.todayAppointments || '015',
            subtitle: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            icon: Calendar,
            color: 'bg-purple-500'
        }
    ]

    const statCards = type === 'doctor' ? doctorStats : stylistStats

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {statCards.map((stat, index) => {
                const Icon = stat.icon
                return (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <Icon size={24} className="text-white" />
                            </div>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                        <p className="text-gray-500 text-xs">{stat.subtitle}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default DashboardStats

