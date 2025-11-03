import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ConditionalLayout from '@/components/ConditionalLayout'

export const metadata = {
  title: 'DocTalk - Doctor Appointment Booking Platform',
  description: 'Connect with verified, experienced doctors across various specialties',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <ToastContainer position="top-right" autoClose={2000} />
      </body>
    </html>
  )
}

