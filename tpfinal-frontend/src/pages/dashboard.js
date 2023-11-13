import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { useEffect } from 'react'
import { router } from 'next/router'

const Dashboard = () => {
    const { user } = useAuth()


    return (
        <AppLayout
            header={
                <div>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tienda
                    </h2>
                    <ul>
                        <li>
                            {/* <NavLink
                            href="/catalogo"
                            active={router.pathname === '/dashboard'}>
                            Tienda
                        </NavLink> */}
                        </li>
                    </ul>
                </div>
            }>
            <Head>
                <title>Catalogo - Mar Nails</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
