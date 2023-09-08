import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { useEffect } from 'react'
import { router } from 'next/router'

export default function adminIndex() {
    const { user } = useAuth()
   
    const rolesAutorizados = [2]
    useEffect(() => {
        
        if (user) {
            console.log(user.idRol)
            console.log(rolesAutorizados.includes(2))
            if(!rolesAutorizados.includes(user.idRol)){
                router.push('/dashboard');
            }
        }
    }, [user])

    return (
        <>
            <Head>
                <title>Cliente</title>
            </Head>
            cliente index
        </>
    )
}
