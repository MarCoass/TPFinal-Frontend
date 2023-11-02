import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { router } from 'next/router'
import { PedidoCard } from '../../components/ProductCard'
import { fetchPedidosUsuario } from '../../lib/producto'

const Dashboard = () => {
    const { user } = useAuth()
    const [pedidos, setPedidos] = useState()

    useEffect(() => {
        if (user) {
            async function obtenerPedidos() {
                const data = await fetchPedidosUsuario(user.id)
                setPedidos(data)
                /* console.log(data) */
            }
            obtenerPedidos()
        }
    }, [user])

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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {pedidos ? (
                        <>
                            {pedidos.map(pedido => (
                                <PedidoCard pedido={pedido} key={pedido.id}></PedidoCard>
                            ))}
                        </>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
