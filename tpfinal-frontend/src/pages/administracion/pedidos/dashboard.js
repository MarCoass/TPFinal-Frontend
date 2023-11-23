import { columns } from './columns'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Tabla from '../../../components/Tablas/data-table'
import { ContadorPedidos, TabsPedidos } from '../../../components/Pedidos'

const fetchPedidos = async () => {
    try {
        const response = await axios.get('/api/administracion/agruparPorEstado')
        return response.data
    } catch (error) {
        console.error('Error al obtener pedidos:', error)
        return []
    }
}
const fetchConteo = async () => {
    try {
        const response = await axios.get('/api/administracion/pedidosConteo')
        
        return response.data
    } catch (error) {
        console.error('Error al obtener pedidos:', error)
        return []
    }
}

export default function PedidosDashboard() {
    const [pedidos, setPedidos] = useState(null)
    const [conteo, setConteo] = useState(null)

    useEffect(() => {
        async function obtenerPedidos() {
            const data = await fetchPedidos()
            setPedidos(data)
            const conteo = await fetchConteo()
            setConteo(conteo)
        }
        obtenerPedidos()
    }, [])

    return (
        <>
            <div className=" bg-naranja-200 rounded-[5px] p-5 border-2 border-black">
                Pedidos personalizados
                {pedidos && conteo ? (
                    <TabsPedidos pedidos={pedidos}></TabsPedidos>
                ) : (
                    <p>Cargando datos...</p>
                )}
            </div>{' '}
        </>
    )
}

{
    /* <div className="text-lg">
                        <ContadorPedidos
                            titulo="Cotizacion pendiente"
                            className="bg-rosado-400"
                            cantidad={conteo[0]}></ContadorPedidos>
                        <p> Pedidos por comenzar: {conteo[2]}</p>
                        <p> Pedidos empezados: {conteo[3]}</p>
                        <p> Pedidos por entregar: {conteo[4]}</p>
                    </div> */
}
