'use client'

const DashboardCalendar = () => {
    const today = new Date()
    const currentMonth = today.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    const currentDay = today.getDate()

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    // Get first day of month
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

    const days = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        days.push(null)
    }
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">{currentMonth}</h3>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`text-center py-2 rounded-lg text-sm ${
                            day === currentDay
                                ? 'bg-blue-600 text-white font-semibold'
                                : day
                                ? 'text-gray-700 hover:bg-gray-100'
                                : 'text-transparent'
                        }`}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DashboardCalendar

