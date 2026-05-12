import connectToDatabase from '@/lib/mongodb'
import Doctor from '@/models/Doctor'

export async function GET() {
  try {
    await connectToDatabase()

    const doctors = await Doctor.find().populate('user', 'name email').lean()
    const transformedDoctors = doctors.map((doctor) => ({
      id: doctor._id.toString(),
      name: doctor.name,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      experience: doctor.experience,
      registration: doctor.registration,
      availability: doctor.availability,
      workingDays: doctor.workingDays,
      image: doctor.image,
      hospital: doctor.hospital,
      consultationFee: doctor.consultationFee,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
      user: doctor.user,
    }))

    return new Response(JSON.stringify({ doctors: transformedDoctors }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('[GET /api/doctors] error', error)
    return new Response(JSON.stringify({ error: 'Unable to load doctors' }), { status: 500 })
  }
}
