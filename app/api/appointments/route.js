import { getServerSession } from 'next-auth/next'
import mongoose from 'mongoose'
import connectToDatabase from '@/lib/mongodb'
import Appointment from '@/models/Appointment'
import Doctor from '@/models/Doctor'
import User from '@/models/User'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

function serializeAppointment(appointment) {
  return {
    id: appointment._id.toString(),
    patient: appointment.patient,
    doctor: appointment.doctor,
    date: appointment.date,
    status: appointment.status,
    notes: appointment.notes,
    createdAt: appointment.createdAt,
    updatedAt: appointment.updatedAt,
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    await connectToDatabase()

    const user = await User.findById(session.user.id)
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }

    let appointments
    if (user.role === 'Doctor') {
      const doctorRecord = await Doctor.findOne({ user: user._id })
      if (!doctorRecord) {
        return new Response(JSON.stringify({ error: 'Doctor profile not found' }), { status: 404 })
      }
      appointments = await Appointment.find({ doctor: doctorRecord._id })
        .populate('patient', 'name email')
        .populate('doctor', 'name specialization consultationFee')
        .lean()
    } else {
      appointments = await Appointment.find({ patient: user._id })
        .populate('doctor', 'name specialization consultationFee')
        .lean()
    }

    const transformed = appointments.map((appointment) => ({
      id: appointment._id.toString(),
      patient: appointment.patient,
      doctor: appointment.doctor,
      date: appointment.date,
      status: appointment.status,
      notes: appointment.notes,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    }))

    return new Response(JSON.stringify({ appointments: transformed }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('[GET /api/appointments] error', error)
    return new Response(JSON.stringify({ error: 'Unable to load appointments' }), { status: 500 })
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const body = await req.json()
    const { doctorId, date, notes = '' } = body

    if (!doctorId || !date) {
      return new Response(JSON.stringify({ error: 'Doctor ID and date are required' }), { status: 400 })
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return new Response(JSON.stringify({ error: 'Invalid doctor ID' }), { status: 400 })
    }

    const appointmentDate = new Date(date)
    if (Number.isNaN(appointmentDate.getTime())) {
      return new Response(JSON.stringify({ error: 'Invalid appointment date' }), { status: 400 })
    }

    await connectToDatabase()

    const doctor = await Doctor.findById(doctorId)
    if (!doctor) {
      return new Response(JSON.stringify({ error: 'Doctor not found' }), { status: 404 })
    }

    const requestedDay = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' })
    if (doctor.workingDays?.length && !doctor.workingDays.includes(requestedDay)) {
      return new Response(JSON.stringify({ error: `Doctor is unavailable on ${requestedDay}` }), { status: 400 })
    }

    const existingAppointment = await Appointment.findOne({
      patient: session.user.id,
      doctor: doctorId,
      date: appointmentDate,
    })

    if (existingAppointment) {
      return new Response(JSON.stringify({ error: 'You already have an appointment with this doctor at the same time' }), { status: 409 })
    }

    const newAppointment = await Appointment.create({
      patient: session.user.id,
      doctor: doctorId,
      date: appointmentDate,
      status: 'Pending',
      notes: notes.trim(),
    })

    const populatedAppointment = await newAppointment.populate('doctor', 'name specialization consultationFee')

    return new Response(JSON.stringify({ appointment: serializeAppointment(populatedAppointment) }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('[POST /api/appointments] error', error)
    return new Response(JSON.stringify({ error: 'Unable to create appointment' }), { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const url = new URL(req.url)
    const appointmentId = url.searchParams.get('id')
    if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
      return new Response(JSON.stringify({ error: 'Valid appointment id is required' }), { status: 400 })
    }

    await connectToDatabase()

    const appointment = await Appointment.findById(appointmentId)
    if (!appointment) {
      return new Response(JSON.stringify({ error: 'Appointment not found' }), { status: 404 })
    }

    const user = await User.findById(session.user.id)
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }

    const isPatientOwner = appointment.patient.toString() === user._id.toString()
    if (!isPatientOwner) {
      return new Response(JSON.stringify({ error: 'Not authorized to cancel this appointment' }), { status: 403 })
    }

    await appointment.deleteOne()

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    console.error('[DELETE /api/appointments] error', error)
    return new Response(JSON.stringify({ error: 'Unable to delete appointment' }), { status: 500 })
  }
}
