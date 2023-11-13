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

            <div className="font-bold grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 divide-x-2 divide-black border-y-2 border-black">
                
                <CrearPedido></CrearPedido>
                <div className='bg-violeta-200'>Informacion importante</div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
