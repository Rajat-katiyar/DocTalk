import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'DocTalk - Doctor Appointment Booking Platform',
  description: 'Connect with verified, experienced doctors across various specialties',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  )
}

