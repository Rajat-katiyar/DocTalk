'use client'

import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
      <ToastContainer position="top-right" autoClose={2000} />
    </SessionProvider>
  )
}
