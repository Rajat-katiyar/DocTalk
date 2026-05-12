import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import connectToDatabase from '@/lib/mongodb'
import User from '@/models/User'
import Doctor from '@/models/Doctor'

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, password, role = 'Patient', doctorProfile } = body

    if (!name || !email || !password) {
      return json({ error: 'Name, email and password are required' }, 400)
    }

    if (!['Patient', 'Doctor'].includes(role)) {
      return json({ error: 'Invalid role' }, 400)
    }

    if (role === 'Doctor') {
      if (!doctorProfile) {
        return json({ error: 'Doctor profile is required' }, 400)
      }
      const { specialization, qualification, consultationFee } = doctorProfile
      if (!specialization?.trim() || !qualification?.trim()) {
        return json({ error: 'Specialization and qualification are required' }, 400)
      }
      const feeNumber = Number(consultationFee)
      if (consultationFee === '' || consultationFee === null || consultationFee === undefined || Number.isNaN(feeNumber) || feeNumber < 0) {
        return json({ error: 'Consultation fee must be a non-negative number' }, 400)
      }
    }

    await connectToDatabase()

    const normalizedEmail = email.toLowerCase().trim()
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return json({ error: 'Email is already registered' }, 409)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    let createdUser
    const session = await mongoose.startSession()
    try {
      await session.withTransaction(async () => {
        const [user] = await User.create(
          [{
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role,
          }],
          { session }
        )
        createdUser = user

        if (role === 'Doctor') {
          const dp = doctorProfile
          await Doctor.create(
            [{
              user: user._id,
              name: user.name,
              specialization: dp.specialization.trim(),
              qualification: dp.qualification.trim(),
              experience: dp.experience?.trim() ?? '',
              registration: dp.registration?.trim() ?? '',
              availability: dp.availability?.trim() || 'Available',
              workingDays: Array.isArray(dp.workingDays) ? dp.workingDays : [],
              image: dp.image?.trim() ?? '',
              hospital: dp.hospital?.trim() ?? '',
              consultationFee: Number(dp.consultationFee),
              bio: dp.bio?.trim() ?? '',
            }],
            { session }
          )
        }
      })
    } finally {
      session.endSession()
    }

    return json({
      success: true,
      user: {
        id: createdUser._id.toString(),
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
      },
    }, 201)
  } catch (error) {
    console.error('[register] error', error)
    if (error?.code === 11000) {
      return json({ error: 'Email is already registered' }, 409)
    }
    return json({ error: 'Registration failed' }, 500)
  }
}
