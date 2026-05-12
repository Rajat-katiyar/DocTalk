'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Patient')
  const [loading, setLoading] = useState(false)

  const [specialization, setSpecialization] = useState('')
  const [qualification, setQualification] = useState('')
  const [experience, setExperience] = useState('')
  const [registration, setRegistration] = useState('')
  const [consultationFee, setConsultationFee] = useState('')
  const [hospital, setHospital] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')
  const [workingDays, setWorkingDays] = useState([])

  const toggleDay = (day) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const payload = { name, email, password, role }
    if (role === 'Doctor') {
      payload.doctorProfile = {
        specialization,
        qualification,
        experience,
        registration,
        consultationFee,
        hospital,
        bio,
        image,
        workingDays,
        availability: 'Available',
      }
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await response.json()
    if (!response.ok) {
      setLoading(false)
      toast.error(result.error || 'Registration failed')
      return
    }

    const signInResult = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (signInResult?.error) {
      toast.error(signInResult.error)
      return
    }

    toast.success('Registration successful')
    router.push('/my-bookings')
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-gray-700">Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              required
              minLength={6}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Register As</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </label>

          {role === 'Doctor' && (
            <div className="space-y-5 border-t pt-5">
              <h2 className="text-lg font-semibold">Doctor Profile</h2>

              <label className="block">
                <span className="text-gray-700">Specialization *</span>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g. Cardiologist"
                  className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Qualification *</span>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g. MBBS, MD"
                  className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  required
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-700">Experience</span>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 10 years"
                    className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Registration No.</span>
                  <input
                    type="text"
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-gray-700">Consultation Fee (INR) *</span>
                <input
                  type="number"
                  min="0"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Hospital / Clinic</span>
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Profile Image URL</span>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />
              </label>

              <div>
                <span className="text-gray-700 block mb-2">Working Days</span>
                <div className="flex flex-wrap gap-2">
                  {WEEKDAYS.map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1 rounded-full border text-sm ${
                        workingDays.includes(day)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-gray-700">Short Bio</span>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <a href="/auth/signin" className="text-blue-600 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  )
}
