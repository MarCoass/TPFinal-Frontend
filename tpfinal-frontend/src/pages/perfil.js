import React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import DatosUsuario from '../components/Formularios/datosUsuario'
import Head from 'next/head'

export default function Perfil() {
    return (
        <AppLayout>
            <Head><title>Mi Perfil - Mar Nails</title> </Head>
            <DatosUsuario></DatosUsuario>
        </AppLayout>
    )
}
