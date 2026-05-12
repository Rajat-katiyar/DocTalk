'use client'

import { Search, Bell, Mail, Menu, X } from 'lucide-react'
import { useState } from 'react'

const DashboardHeader = ({ title = "Dashboard", onMenuClick, sidebarOpen = true }) => {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="px-6 py-4 flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onMenuClick}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                    >
                        {sidebarOpen ? <X size={24} className="text-gray-600" /> : <Menu size={24} className="text-gray-600" />}
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Search */}
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

                    {/* Icons */}
                    <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                        <Mail size={22} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                        <Bell size={22} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                    </button>

                    {/* Mobile Menu */}
                    <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default DashboardHeader

