import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { useEffect } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import {Link} from "@nextui-org/react";

export default function adminIndex() {
    const { user } = useAuth()

    const rolesAutorizados = [1]
    useEffect(() => {
        if (user) {
            if (!rolesAutorizados.includes(user.id_rol)) {
                router.push('/dashboard')
            }
        }
    }, [user])

    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>
            {user ? (
                <AppLayout
                    header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Productos
                        </h2>
                    }>
                    <Head>
                        <title>Catalogo - Mar Nails</title>
                    </Head>

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                <Link href="/administracion/nuevo-producto">Cargar producto</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </AppLayout>
            ) : (
                // Puedes mostrar un mensaje o redirigir al usuario si no está autenticado
                <div>No estás autenticado.</div>
            )}
        </>
    )
}
