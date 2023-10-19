import { Proveedor, columns } from './columns'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Tabla from '../../../components/Tablas/data-table'
import AdminLayout from '../../../components/layouts/AdminLayout'
import Head from 'next/head'

const fetchProveedores = async () => {
    try {
        const response = await axios.get('/api/proveedores/')
        return response.data
    } catch (error) {
        console.error('Error al obtener proveedores:', error)
        return []
    }
}

export default function TablaProveedores() {
    const [proveedores, setProveedores] = useState(null)

    useEffect(() => {
        async function obtenerProveedores() {
            const data = await fetchProveedores()
            setProveedores(data)
              console.log(data)
        }
        obtenerProveedores()
    }, [])

    return (
        <>
            <AdminLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Proveedores
                    </h2>
                }>
                <Head>
                    <title>Proveedores - Mar Nails</title>
                </Head>
                <div className="py-12">
                    <div className="sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className=" bg-white border-b border-gray-200">
                                <div className="container mx-auto py-10">
                                    {proveedores ? (
                                        <Tabla
                                            columns={columns}
                                            data={proveedores}
                                        />
                                    ) : (
                                        <p>Cargando datos...</p>
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
