'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { data: session } = useSession()

    const isActive = (path) => pathname === path

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/my-bookings", label: "My-Bookings" },
        { href: "/blogs", label: "Blogs" },
        { href: "/contact", label: "Contact Us" },
        { href: "/doctor/dashboard", label: "Doctor" },
    ]

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="w-11/12 mx-auto">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold cursor-pointer flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">+</span>
                        </div>
                        <span className="text-gray-900">DocTalk</span>
                    </Link>

                    {/* Navigation Links - Horizontal (Desktop) */}
                    <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href}
                                href={link.href} 
                                className={`text-base font-medium transition-colors ${
                                    isActive(link.href) || 
                                    (link.href.includes('/doctor') && pathname?.startsWith("/doctor/")) ||
                                    (link.href.includes('/stylist') && pathname?.startsWith("/stylist/")) 
                                        ? "text-blue-600" 
                                        : "text-gray-700 hover:text-blue-600"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Authentication Actions (Desktop) */}
                    <div className="hidden lg:flex items-center gap-4">
                      {session?.user ? (
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="btn bg-red-500 hover:bg-red-600 text-white border-none px-5 rounded-full transition-colors"
                        >
                          Sign Out
                        </button>
                      ) : (
                        <>
                          <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600">
                            Login
                          </Link>
                          <Link 
                            href="/auth/register" 
                            className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-5 rounded-full transition-colors"
                          >
                            Register
                          </Link>
                        </>
                      )}
                    </div>

                    {/* Emergency Button (Desktop) */}
                    <div className="hidden lg:flex flex-shrink-0">
                        <Link 
                            href="/emergency" 
                            className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-6 rounded-full transition-colors"
                        >
                            Emergency
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`text-base font-medium transition-colors ${
                                        isActive(link.href) || 
                                        (link.href.includes('/doctor') && pathname?.startsWith("/doctor/")) ||
                                        (link.href.includes('/stylist') && pathname?.startsWith("/stylist/")) 
                                            ? "text-blue-600" 
                                            : "text-gray-700 hover:text-blue-600"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {session?.user ? (
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false)
                                        signOut({ callbackUrl: '/' })
                                    }}
                                    className="w-full rounded-full bg-red-500 text-white py-3 hover:bg-red-600 transition-colors"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/signin"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-base font-medium text-gray-700 hover:text-blue-600"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-6 rounded-full transition-colors w-fit"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                            <Link 
                                href="/emergency"
                                onClick={() => setMobileMenuOpen(false)}
                                className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-6 rounded-full transition-colors w-fit"
                            >
                                Emergency
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

