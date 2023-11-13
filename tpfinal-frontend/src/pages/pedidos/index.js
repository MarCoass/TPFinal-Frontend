import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { router } from 'next/router'
import Input from '../../components/Input'
import { CrearPedido } from './crearPedido'


const Dashboard = () => {
    const { user } = useAuth()

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pedidos personalizados
                </h2>
            }>
            <Head>
                <title>Pedidos Personalizados - Mar Nails</title>
            </Head>

            <div className="py-12">
                <CrearPedido></CrearPedido>
            </div>
        </AppLayout>
    )
}

export default Dashboard
