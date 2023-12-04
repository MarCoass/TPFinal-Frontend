import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { PedidoCard } from '../../components/ProductCard'

const fetchPedidosUsuario = id => {
    return axios.get('/api/pedidos/' + id).then(res => res.data)
}

const PedidosUsuario = () => {
    const { user } = useAuth()
    const [pedidos, setPedidos] = useState(null)

    useEffect(() => {
        async function obtenerPedidos() {
            if (user && user.id) {
                const data = await fetchPedidosUsuario(user.id)
                setPedidos(data)
            }
        }
        obtenerPedidos()
    }, [user])

    return (
        <div className="font-bold ">
            {pedidos  ? (
                <div className=" flex flex-col gap-4 flex-wrap justify-around">
                    {pedidos.map(pedido => (
                        <PedidoCard
                            pedido={pedido}
                            key={pedido.id}></PedidoCard>
                    ))}
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    )
}

export default PedidosUsuario
