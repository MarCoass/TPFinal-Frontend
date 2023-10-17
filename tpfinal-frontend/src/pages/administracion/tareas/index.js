import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import CardTarea from '../../../components/CardTarea'

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
                <title>Tareas - Mar Nails</title>
            </Head>

            <div className="py-12">
                {tareas ? <div>
                    <CardTarea tarea={tareas[0]}></CardTarea>
                </div> : <div>cargando....</div>}
            </div>
        </AdminLayout>
    )
}

export default IndexTareas
