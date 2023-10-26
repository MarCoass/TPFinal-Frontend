import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import Tabla from '../../../../components/Tablas/data-table'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { columns } from './columnsCategoriaInsumos'

const fetchCategorias = async () => {
    try {
        const response = await axios.get(
            '/api/administracion/categoriasInsumos',
        )
        return response.data
    } catch (error) {
        console.error('Error al obtener categorias:', error)
        return []
    }
}

export default function index() {
    const [categorias, setCategorias] = useState(null)

    useEffect(() => {
        async function obtenerCategorias() {
            const data = await fetchCategorias()
            setCategorias(data)
            /* console.log(data) */
        }
        obtenerCategorias()
    }, [])

    return (
        <>
            <AdminLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Categorias de insumos
                    </h2>
                }>
                <Head>
                    <title>Categorias de insumos - Mar Nails</title>
                </Head>

                <div className="py-12">
                    <div className="sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className=" bg-white border-b border-gray-200">
                                <div className="flex justify-between m-2">
                                    <div className="container mx-auto py-10">
                                        {categorias ? (
                                            <Tabla
                                                columns={columns}
                                                data={categorias}
                                            />
                                        ) : (
                                            <p>Cargando datos...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
