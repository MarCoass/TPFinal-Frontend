import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import Tabla from '../../../components/Tablas/data-table'
import { columnsClientes } from './columns'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'

const fetchClientes = async () => {
    try {
        const response = await axios.get('/api/administracion/clientes/')
        return response.data
    } catch (error) {
        console.error('Error al obtener clientes:', error)
        return []
    }
}

const Dashboard = () => {

    const [clientes, setClientes] = useState(null)

    useEffect(() => {
        async function obtenerClientes() {
            const data = await fetchClientes()
            setClientes(data)
        }
        obtenerClientes()
    }, [])
    return (
        <AdminLayout
            header={
                <h2 className="font-bold text-xl text-gray-800 leading-tight">
                    Clientes - Mar Nails
                </h2>
            }>
            <Head>
                <title>Clientes - Mar Nails</title>
            </Head>

            <div className="py-12">
                    <div className="sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className=" bg-white border-b border-gray-200">
                                <div className="container mx-auto py-10">
                                    {clientes ? (
                                        <Tabla
                                        filtrar={true}
                                            columns={columnsClientes}
                                            data={clientes}
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
    )
}

export default Dashboard
