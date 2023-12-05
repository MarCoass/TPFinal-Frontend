import { columns } from './columns'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Tabla from '../../../components/Tablas/data-table'
import AdminLayout from '../../../components/Layouts/AdminLayout'
import Head from 'next/head'
import CustomSpinner from '@/components/CustomSpinner'

const fetchPedidos = async () => {
    try {
        const response = await axios.get('/api/administracion/pedidos/')
        /* console.log(response) */
        return response.data
    } catch (error) {
        console.error('Error al obtener pedidos:', error)
        return []
    }
}

export default function Pedidos() {
    const [pedidos, setPedidos] = useState(null)

    useEffect(() => {
        if (pedidos === null || !pedidos) {
            obtenerDatos()
        }
    }, [pedidos])

    const obtenerDatos = async () => {
        try {
            const data = await fetchPedidos()
            setPedidos(data)
        } catch (error) {
            console.error('Hubo un problema obteniendo los datos: ', error)
        }
    }

    return (
        <>
            <AdminLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Pedidos
                    </h2>
                }>
                <Head>
                    <title>Pedidos - Mar Nails</title>
                </Head>
                <div className="py-12">
                    <div className="sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className=" bg-white border-b border-gray-200">
                                <div className="container mx-auto py-10">
                                    {pedidos ? (
                                        <Tabla
                                            columns={columns}
                                            data={pedidos}
                                            obtenerDatos={obtenerDatos}
                                        />
                                    ) : (
                                        <CustomSpinner></CustomSpinner>
                                    )}
                                </div>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
