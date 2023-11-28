import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import Tabla from '../../../components/Tablas/data-table'
import { columnsClientes } from './columns'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import CustomSpinner from '@/components/CustomSpinner'

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
        if (clientes === null || !clientes) {
            obtenerDatos()
        }
    }, [clientes])

    const obtenerDatos = async () => {
        try {
            const data = await fetchClientes()
            setClientes(data)
        } catch (error) {
            console.error('Hubo un problema obteniendo los datos: ', error)
        }
    }
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

            <div className="">
                <div className="sm:px-6 lg:px-8">
                    <div className="overflow-hidden container md:mx-auto py-2">
                        {clientes ? (
                            <Tabla
                                obtenerDatos={obtenerDatos}
                                filtrar={true}
                                columns={columnsClientes}
                                data={clientes}
                            />
                        ) : (
                            <CustomSpinner
                                mensaje={
                                    'Cargando clientes...'
                                }></CustomSpinner>
                        )}
                    </div>{' '}
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard
