import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import CardTarea from '../../../components/CardTarea'
import CrearTarea from './store'

const fetchTareas = () => {
    return axios.get('/api/tareas').then(res => res.data)
}

const IndexTareas = () => {
    const [tareas, setTareas] = useState([])

    useEffect(() => {
        async function obtenerTareas() {
            try {
                const data = await fetchTareas()
                setTareas(data)
                //console.log(data)
            } catch (error) {
                console.error('Error al obtener tareas:', error)
            }
        }
        obtenerTareas()
    }, [])

    return (
        <AdminLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tareas - Mar Nails
                </h2>
            }>
            <Head>
                <title>Tareas - Mar Nails </title>
            </Head>

            <div className="py-12">
                <div className="sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" bg-white border-b border-gray-200 ">
                            <div className="m-3 flex justify-end">
                                <CrearTarea></CrearTarea>
                            </div>

                            {tareas ? (
                                <div className="flex gap-4 flex-wrap justify-center">
                                    {tareas.map(tarea => (
                                        <CardTarea
                                            key={tarea.id}
                                            tarea={tarea}></CardTarea>
                                    ))}
                                </div>
                            ) : (
                                <div>cargando....</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default IndexTareas
