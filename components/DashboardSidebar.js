'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
    LayoutDashboard, 
    Calendar, 
    CreditCard, 
    User, 
    Settings, 
    LogOut,
    FileText,
    X
} from 'lucide-react'

const DashboardSidebar = ({ userType = 'doctor', userData, isOpen = true, onClose }) => {
    const pathname = usePathname()
    
    const isActive = (path) => pathname === path

    const doctorMenu = [
        { path: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/doctor/appointments', label: 'Appointment', icon: Calendar },
        { path: '/doctor/appointment-page', label: 'Appointment Page', icon: FileText },
        { path: '/doctor/payment', label: 'Payment', icon: CreditCard },
        { path: '/doctor/profile', label: 'Profile', icon: User },
        { path: '/doctor/settings', label: 'Settings', icon: Settings },
    ]

    const stylistMenu = [
        { path: '/stylist/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/stylist/appointments', label: 'Appointments', icon: Calendar },
        { path: '/stylist/services', label: 'Services', icon: FileText },
        { path: '/stylist/clients', label: 'Clients', icon: User },
        { path: '/stylist/payment', label: 'Payment', icon: CreditCard },
        { path: '/stylist/profile', label: 'Profile', icon: User },
        { path: '/stylist/settings', label: 'Settings', icon: Settings },
    ]

    const menu = userType === 'doctor' ? doctorMenu : stylistMenu

    return (
        <div className="w-64 bg-white h-screen fixed lg:static left-0 top-0 shadow-lg overflow-y-auto z-30">
            {/* Close Button for Mobile */}
            <div className="lg:hidden flex justify-end p-4 border-b border-gray-200">
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X size={20} className="text-gray-600" />
                </button>
            </div>

            {/* Profile Section */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-3 bg-gray-200">
                        <img 
                            src={userData?.image || "https://via.placeholder.com/80"} 
                            alt={userData?.name || "Profile"} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">{userData?.name || "Dr. John Doe"}</h3>
                    <p className="text-sm text-gray-600 text-center">{userData?.qualification || "MBBS, FCPS - MD (Medicine)"}</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4">
                <ul className="space-y-2">
                    {menu.map((item) => {
                        const Icon = item.icon
                        return (
                            <li key={item.path}>
                                <Link 
                                    href={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive(item.path)
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Logout */}
            <div className="absolute bottom-4 left-0 right-0 px-4">
                <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default DashboardSidebar

