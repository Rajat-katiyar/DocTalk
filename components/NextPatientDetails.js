'use client'

import { Phone, FileText, MessageCircle } from 'lucide-react'

const NextPatientDetails = ({ patient, type = 'doctor' }) => {
    const samplePatient = patient || {
        id: "0220092020005",
        name: "Sanath Deo",
        image: "https://via.placeholder.com/60",
        dob: "15 January 1989",
        sex: "Male",
        weight: "59 Kg",
        height: "172 cm",
        lastAppointment: "15 Dec - 2021",
        regDate: "10 Dec 2021",
        history: ["Asthma", "Hypertension", "Fever"],
        phone: "(308) 555-0102"
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
                {type === 'doctor' ? 'Next Patient Details' : 'Next Client Details'}
            </h3>
            <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                    <img 
                        src={samplePatient.image} 
                        alt={samplePatient.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-lg">{samplePatient.name}</h4>
                    <p className="text-sm text-gray-500">
                        {type === 'doctor' ? 'Patient' : 'Client'} ID: {samplePatient.id}
                    </p>
                </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">D.O.B:</span>
                    <span className="font-medium">{samplePatient.dob}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Sex:</span>
                    <span className="font-medium">{samplePatient.sex}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">{samplePatient.weight}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-medium">{samplePatient.height}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Last Appointment:</span>
                    <span className="font-medium">{samplePatient.lastAppointment}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Reg. Date:</span>
                    <span className="font-medium">{samplePatient.regDate}</span>
                </div>
            </div>

            {samplePatient.history && samplePatient.history.length > 0 && (
                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                        {type === 'doctor' ? 'Patient History' : 'Client Preferences'}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {samplePatient.history.map((item, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Phone size={18} />
                    <span className="text-sm">{samplePatient.phone}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                    <FileText size={18} />
                    <span className="text-sm">Document</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                    <MessageCircle size={18} />
                    <span className="text-sm">Chat</span>
                </button>
            </div>

            <div className="mt-4">
                <h5 className="text-sm font-semibold text-gray-700 mb-2">
                    Last Prescriptions
                </h5>
                <p className="text-xs text-gray-500">No prescriptions yet</p>
            </div>
        </div>
    )
}

export default NextPatientDetails

