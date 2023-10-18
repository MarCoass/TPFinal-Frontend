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
                <div>
                    <div className="flex">
                    <div className="text-2xl">Tareas pendientes</div>
                        <Badge className="bg-red-400 hover:bg-red-400 h-min w-min">
                            {pendientes}
                        </Badge>
                       
                    </div>
                  

                    <div className="flex flex-wrap flex-row">
                        {tareas.map(tarea => (
                            <CardTareaDashboard
                                key={tarea.id}
                                tarea={tarea}></CardTareaDashboard>
                        ))}
                    </div>
                    <Link href="/administracion/tareas" className='text-violeta-500 hover:text-violeta-400 hover:underline '>
                            Ver todas las tareas.
                        </Link>
                </div>
            ) : (
                <div>cargando...</div>
            )}
        </>
    )
}
