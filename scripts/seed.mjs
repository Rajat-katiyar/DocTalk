import fs from 'fs'
import path from 'path'

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local')
  const fallbackPath = path.resolve(process.cwd(), '.env.local.example')
  const filePath = fs.existsSync(envPath) ? envPath : fallbackPath
  const envContents = fs.readFileSync(filePath, 'utf8')

  envContents.split('\n').forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    const [key, ...rest] = trimmed.split('=')
    const value = rest.join('=').trim().replace(/^"|"$/g, '')
    if (!process.env[key]) {
      process.env[key] = value
    }
  })
}

loadEnv()

if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not set in .env.local or .env.local.example')
  process.exit(1)
}

const bcrypt = await import('bcrypt')
const connectToDatabase = (await import('../lib/mongodb.js')).default
const User = (await import('../models/User.js')).default
const Doctor = (await import('../models/Doctor.js')).default
const Appointment = (await import('../models/Appointment.js')).default
const Blog = (await import('../models/Blog.js')).default
const SuccessMetric = (await import('../models/SuccessMetric.js')).default

async function seed() {
  await connectToDatabase()

  console.log('Clearing existing collections...')
  await Appointment.deleteMany({})
  await Doctor.deleteMany({})
  await User.deleteMany({})
  await Blog.deleteMany({})
  await SuccessMetric.deleteMany({})

  console.log('Creating users...')
  const patientPassword = await bcrypt.default.hash('patient123', 10)
  const doctorPassword = await bcrypt.default.hash('doctor123', 10)
  const adminPassword = await bcrypt.default.hash('admin123', 10)

  const [patientUser, doctorUser1, doctorUser2, adminUser] = await User.create([
    {
      name: 'John Patient',
      email: 'patient@example.com',
      password: patientPassword,
      role: 'Patient',
    },
    {
      name: 'Dr. Sarah Anderson',
      email: 'dr.sarah@example.com',
      password: doctorPassword,
      role: 'Doctor',
    },
    {
      name: 'Dr. Michael Chen',
      email: 'dr.michael@example.com',
      password: doctorPassword,
      role: 'Doctor',
    },
    {
      name: 'System Admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'Admin',
    },
  ])

  console.log('Creating doctor profiles...')
  const [doctor1, doctor2] = await Doctor.create([
    {
      user: doctorUser1._id,
      name: 'Dr. Sarah Anderson',
      specialization: 'Cardiology',
      qualification: 'MBBS, MD - Cardiology, DNB',
      experience: '8+ Years Experience',
      registration: 'Reg No: BD 12451001',
      availability: 'Available',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      image: 'https://i.postimg.cc/jjQNC6Zd/YOhcf41xol-NNa-YTkhhho-OKWNe3-Wko-VXugkme2-JZP.jpg',
      hospital: 'TMSS Medical College & Rafatullah Community Hospital, Dhaka',
      consultationFee: 575,
      bio: 'Experienced cardiologist focused on preventive care and patient-centered treatment plans.',
    },
    {
      user: doctorUser2._id,
      name: 'Dr. Michael Chen',
      specialization: 'Neurology',
      qualification: 'MBBS, MD - Neurology, DNB',
      experience: '10+ Years Experience',
      registration: 'Reg No: BD 12451002',
      availability: 'Available',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      image: 'https://i.postimg.cc/P56nH0kt/Kh4-Qs3-Af-Huevqv-Bq0o-ASMNW2-Co-FTk-QU6-Ylx-Zzr-Uw.jpg',
      hospital: 'TMSS Medical College & Rafatullah Community Hospital, Dhaka',
      consultationFee: 600,
      bio: 'Neurologist with expertise in chronic headache management and neurological rehabilitation.',
    },
  ])

  console.log('Creating sample appointments...')
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfterTomorrow = new Date()
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

  await Appointment.create([
    {
      patient: patientUser._id,
      doctor: doctor1._id,
      date: tomorrow,
      status: 'Pending',
      notes: 'Initial consultation for hypertension management.',
    },
    {
      patient: patientUser._id,
      doctor: doctor2._id,
      date: dayAfterTomorrow,
      status: 'Confirmed',
      notes: 'Neurology follow-up appointment.',
    },
  ])

  console.log('Creating sample blogs...')
  await Blog.create([
    {
      title: 'What is useState and how does it work in React?',
      content: {
        introduction: 'useState is a fundamental React Hook that enables state management in functional components. It provides a way to add state to function components without converting them to class components, returning both the current state value and a function to update it.',
        codeExample: "const [count, setCount] = useState(0);\n\n// Using the state with proper event handling\nfunction Counter() {\n    const [count, setCount] = useState(0);\n    return (\n        <button onClick={() => setCount(prevCount => prevCount + 1)}>\n            Count is: {count}\n        </button>\n    );\n}",
        keyPoints: [
          'State updates trigger re-renders to reflect changes in the UI',
          'Initial state is only used during the first render',
          'State updates are batched and processed asynchronously for performance',
          'Multiple state variables can be used in a single component for different concerns',
          'State updates using the updater function (prevState => newState) ensure reliable updates',
          'useState preserves state between re-renders'
        ],
      },
    },
    {
      title: 'What is the purpose of useEffect in React?',
      content: {
        introduction: 'useEffect is a powerful React Hook that handles side effects in functional components. It serves as a replacement for lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount, allowing you to perform data fetching, subscriptions, DOM manipulations, and other side effects.',
        codeExample: "useEffect(() => {\n    // Effect code for data fetching\n    const fetchData = async () => {\n        const response = await fetch('https://api.example.com/data');\n        const data = await response.json();\n        setData(data);\n    };\n    \n    fetchData();\n    \n    // Cleanup function\n    return () => {\n        // Cleanup code here (e.g., cancel subscriptions)\n    };\n}, [dependency]); // Re-run effect when dependency changes",
        useCases: [
          'API calls and data fetching with proper cleanup',
          'Managing subscriptions and event listeners with automatic cleanup',
          'DOM manipulations and third-party library integrations',
          'Cleanup operations to prevent memory leaks',
          'Syncing with external systems or APIs',
          'Handling real-time data updates'
        ],
      },
    },
  ])

  console.log('Creating success metrics...')
  await SuccessMetric.create([
    {
      title: 'Total Doctors',
      count: 199,
      image: 'https://i.postimg.cc/vT05bCWd/success-doctor.png',
    },
    {
      title: 'Total Reviews',
      count: 467,
      image: 'https://i.postimg.cc/YC5Yr6mj/success-review.png',
    },
    {
      title: 'Patients',
      count: 1900,
      image: 'https://i.postimg.cc/fRtYQ2y6/success-patients.png',
    },
    {
      title: 'Total Staffs',
      count: 300,
      image: 'https://i.postimg.cc/mr7MtPQj/success-staffs.png',
    },
  ])

  console.log('Seed completed successfully.')
  console.log('Sample login credentials:')
  console.log('Patient -> patient@example.com / patient123')
  console.log('Doctor -> dr.sarah@example.com / doctor123')
  console.log('Admin -> admin@example.com / admin123')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
