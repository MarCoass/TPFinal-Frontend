import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { router } from 'next/router'
import Input from '../../components/Input'
import { CrearPedido } from './crearPedido'
import PedidosUsuario from './pedidosUsuario'

const Dashboard = () => {
    const { user } = useAuth()

    return (
        <AppLayout>
            <Head>
                <title>Pedidos Personalizados - Mar Nails</title>
            </Head>
            <div className="px-12">
                <CrearPedido></CrearPedido>

                <PedidosUsuario></PedidosUsuario>
            </div>
        </AppLayout>
    )
}

export default Dashboard
