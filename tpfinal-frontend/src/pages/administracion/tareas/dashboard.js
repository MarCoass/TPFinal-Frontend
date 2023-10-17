import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { CardTareaDashboard } from '../../../components/CardTarea'

const fetchTareas = () => {
    return axios.get('/api/tareas').then(res => res.data)
}

export default function TareasDashboard() {
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
        <>
            {tareas ? (
                <div className='flex flex-wrap flex-row'>
                    {tareas.map(tarea => (
                        <CardTareaDashboard key={tarea.id} tarea={tarea}></CardTareaDashboard>
                    ))}
                </div>
            ) : (
                <div>cargando...</div>
            )}
        </>
    )
}
