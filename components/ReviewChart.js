'use client'

const ReviewChart = ({ type = 'doctor' }) => {
    const reviews = [
        { label: 'Excellent', value: 85, color: 'bg-blue-500' },
        { label: 'Great', value: 60, color: 'bg-green-500' },
        { label: 'Good', value: 35, color: 'bg-orange-500' },
        { label: 'Average', value: 15, color: 'bg-teal-500' },
    ]

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
                {type === 'doctor' ? 'Patients Review' : 'Clients Review'}
            </h3>
            <div className="space-y-4">
                {reviews.map((review, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{review.label}</span>
                            <span className="text-sm font-semibold text-gray-800">{review.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                className={`${review.color} h-3 rounded-full transition-all`}
                                style={{ width: `${review.value}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewChart

