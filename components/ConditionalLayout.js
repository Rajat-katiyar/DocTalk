'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function ConditionalLayout({ children }) {
    const pathname = usePathname()
    const isDashboardRoute = pathname?.startsWith('/doctor/') || pathname?.startsWith('/stylist/')

    if (isDashboardRoute) {
        return <>{children}</>
    }

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

