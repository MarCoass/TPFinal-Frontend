import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { useEffect } from 'react'

export default function adminIndex() {
    const { user } = useAuth()

    const rolesAutorizados = [1]
    useEffect(() => {
        if (user) {
            if(!rolesAutorizados.includes(user.idRol)){
                router.push('/dashboard');
            }
        }
    }, [user])


    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>
            {user ? (
                <>admin index</>
            ) : (
                // Puedes mostrar un mensaje o redirigir al usuario si no está autenticado
                <div>No estás autenticado.</div>
            )}
        </>
    )
}
