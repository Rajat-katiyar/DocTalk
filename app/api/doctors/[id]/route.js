import mongoose from 'mongoose'
import connectToDatabase from '@/lib/mongodb'
import Doctor from '@/models/Doctor'

export async function GET(req, { params }) {
  try {
    const { id } = params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Doctor id is invalid' }), { status: 400 })
    }

    await connectToDatabase()
    const doctor = await Doctor.findById(id).populate('user', 'name email').lean()
    if (!doctor) {
      return new Response(JSON.stringify({ error: 'Doctor not found' }), { status: 404 })
    }

    const transformedDoctor = {
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
      bio: doctor.bio,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
      user: doctor.user,
    }

    return new Response(JSON.stringify(transformedDoctor), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('[GET /api/doctors/[id]] error', error)
    return new Response(JSON.stringify({ error: 'Unable to load doctor' }), { status: 500 })
  }
}
