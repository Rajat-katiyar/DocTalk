'use client'

import { Check, X, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const AppointmentRequests = ({ requests = [], type = 'doctor' }) => {
    const sampleRequests = requests.length > 0 ? requests : [
        { id: 1, name: "Maria Sarafat", reason: "Cold", image: "https://via.placeholder.com/40" },
        { id: 2, name: "Jhon Deo", reason: "Over sweating", image: "https://via.placeholder.com/40" },
        { id: 3, name: "Sarah Smith", reason: "Haircut", image: "https://via.placeholder.com/40" },
    ]

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                    {type === 'doctor' ? 'Appointment Request' : 'Booking Request'}
                </h3>
                <Link href={`/${type}/appointments`} className="text-blue-600 text-sm hover:underline">
                    See All
                </Link>
            </div>
            <div className="space-y-4">
                {sampleRequests.map((request) => (
                    <div key={request.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            <img 
                                src={request.image} 
                                alt={request.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800">{request.name}</p>
                            <p className="text-sm text-gray-600">{request.reason}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                                <Check size={18} />
                            </button>
                            <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                                <X size={18} />
                            </button>
                            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                                <MessageCircle size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AppointmentRequests

