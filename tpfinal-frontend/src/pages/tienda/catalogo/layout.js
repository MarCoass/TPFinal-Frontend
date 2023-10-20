import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
//esto no sirve de nada xd
export default function FilterLayout({ children }) {
    const router = useRouter()
    return (
        <>
            <StoreLayout
                header={
                    <nav className="bg-white border-b border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                       filtroooos
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>}>

                {children}
            </StoreLayout>
        </>
    )
}


