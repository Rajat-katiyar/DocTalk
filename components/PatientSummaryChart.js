'use client'

const PatientSummaryChart = ({ type = 'doctor' }) => {
    // Sample data
    const doctorData = {
        newPatients: 35,
        oldPatients: 50,
        totalPatients: 85
    }

    const stylistData = {
        newClients: 25,
        returningClients: 40,
        totalClients: 65
    }

    const data = type === 'doctor' ? doctorData : stylistData

    const total = type === 'doctor' ? data.totalPatients : data.totalClients
    const newPercentage = ((data.newPatients / total) * 100).toFixed(0)
    const oldPercentage = ((data.oldPatients / total) * 100).toFixed(0)

    // Calculate SVG circle paths for donut chart
    const radius = 60
    const circumference = 2 * Math.PI * radius
    const newOffset = circumference - (newPercentage / 100) * circumference
    const oldOffset = circumference - (oldPercentage / 100) * circumference

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
                {type === 'doctor' ? 'Patients Summary' : 'Clients Summary'} {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <svg width="150" height="150" className="transform -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx="75"
                            cy="75"
                            r={radius}
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="20"
                        />
                        {/* New Patients/Clients */}
                        <circle
                            cx="75"
                            cy="75"
                            r={radius}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="20"
                            strokeDasharray={circumference}
                            strokeDashoffset={newOffset}
                            strokeLinecap="round"
                        />
                        {/* Old Patients/Clients */}
                        <circle
                            cx="75"
                            cy="75"
                            r={radius}
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="20"
                            strokeDasharray={circumference}
                            strokeDashoffset={oldOffset}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-2xl font-bold">{total}</p>
                            <p className="text-xs text-gray-500">Total</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-600">
                            {type === 'doctor' ? 'New Patients' : 'New Clients'}
                        </span>
                    </div>
                    <span className="font-semibold">{data.newPatients}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                        <span className="text-sm text-gray-600">
                            {type === 'doctor' ? 'Old Patients' : 'Returning Clients'}
                        </span>
                    </div>
                    <span className="font-semibold">{data.oldPatients}</span>
                </div>
            </div>
        </div>
    )
}

export default PatientSummaryChart

