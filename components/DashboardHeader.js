'use client'

import { Search, Bell, Mail, Menu } from 'lucide-react'
import { useState } from 'react'

const DashboardHeader = ({ title = "Dashboard", onMenuClick }) => {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
                {/* Left section */}
                <div className="flex items-center gap-3 min-w-0">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Open sidebar"
                    >
                        <Menu size={24} className="text-gray-600" />
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{title}</h1>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                        <Search size={18} className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm w-40"
                        />
                    </div>

                    <button className="p-2 hover:bg-gray-100 rounded-lg relative" aria-label="Messages">
                        <Mail size={22} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg relative" aria-label="Notifications">
                        <Bell size={22} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default DashboardHeader
