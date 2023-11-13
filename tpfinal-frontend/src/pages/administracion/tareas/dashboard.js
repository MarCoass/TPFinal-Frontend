import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { CardTareaDashboard } from '../../../components/CardTarea'
import Link from 'next/link'
import { ListTodo } from 'lucide-react'
import { Badge } from '../../../components/ui/Badge'

const fetchTareas = () => {
    return axios.get('/api/tareasInicio').then(res => res.data)
}

export default function TareasDashboard() {
    const [tareas, setTareas] = useState([])
    const [pendientes, setPendientes] = useState('')

    useEffect(() => {
        async function obtenerTareas() {
            try {
                const data = await fetchTareas()
                setTareas(data.tareas)
                setPendientes(data.cantidadPendientes)
            } catch (error) {
                console.error('Error al obtener tareas:', error)
            }
        }
        obtenerTareas()
    }, [])

    return (
        <>
            {tareas ? (
                <div className='mb-5'>
                    <div className="flex  gap-3">
                        <div className="text-2xl font-bold ">Tareas pendientes</div>
                        <Badge className="w-min rounded-full border-2 border-black bg-naranja-500 hover:bg-naranja-500 px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ">
                            {pendientes}
                        </Badge>
                    </div>

                    <div className="flex flex-wrap flex-row gap-4 my-5">
                        {tareas.map(tarea => (
                            <CardTareaDashboard
                                key={tarea.id}
                                tarea={tarea}></CardTareaDashboard>
                        ))}
                    </div>
                    <Link
                        href="/administracion/tareas"
                        className="font-bold underline hover:text-rosado-600 hover:decoration-2">
                        Ver todas las tareas.
                    </Link>
                </div>
            ) : (
                <div>cargando...</div>
            )}
        </>
    )
}
