'use client'

import Link from 'next/link'

const TodayAppointments = ({ appointments = [], type = 'doctor' }) => {
    const sampleAppointments = appointments.length > 0 ? appointments : [
        { id: 1, name: "M.J. Mical", diagnosis: "Health Checkup", time: "On Going", image: "https://via.placeholder.com/40" },
        { id: 2, name: "Sanath Deo", diagnosis: "Health Checkup", time: "12:30 PM", image: "https://via.placeholder.com/40" },
        { id: 3, name: "Loeara Phanj", diagnosis: "Report", time: "01:00 PM", image: "https://via.placeholder.com/40" },
        { id: 4, name: "Komola Haris", diagnosis: "Common Cold", time: "01:30 PM", image: "https://via.placeholder.com/40" },
    ]

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                    {type === 'doctor' ? 'Today Appointment' : 'Today Bookings'}
                </h3>
                <Link href={`/${type}/appointments`} className="text-blue-600 text-sm hover:underline">
                    See All
                </Link>
            </div>
            <div className="space-y-4">
                {sampleAppointments.slice(0, 4).map((appointment) => (
                    <div key={appointment.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            <img 
                                src={appointment.image} 
                                alt={appointment.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-500">Patient</p>
                            <p className="font-semibold text-gray-800">{appointment.name}</p>
                            <p className="text-sm text-gray-600">{appointment.diagnosis || appointment.service}</p>
                        </div>
                        <div className="text-right">
                            {appointment.time === "On Going" ? (
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    On Going
                                </span>
                            ) : (
                                <p className="text-sm font-medium text-gray-700">{appointment.time}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodayAppointments

