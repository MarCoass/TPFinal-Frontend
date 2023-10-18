import { Calendar } from '@/components/ui/calendar'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

const fetchTareas = () => {
    return axios.get('/api/tareasInicio').then(res => res.data)
}

export default function CalendarioTareas() {
    const [tareas, setTareas] = useState()
    const [seleccionadas, setSeleccionadas] = useState([])

    useEffect(() => {
        async function obtenerTareas() {
            try {
                const data = await fetchTareas()
                setTareas(data.tareas)
                /* console.log(data)  */
            } catch (error) {
                console.error('Error al obtener tareas:', error)
            }
        }
        obtenerTareas()
    }, [])

    useEffect(() => {
        if (tareas) {
            let array = []
            tareas.forEach(tarea => {
                array.push(new Date(tarea.fecha_vencimiento))
            })
            setSeleccionadas(array)
            /* console.log(array) */
        }
    },[tareas])

    return (
        <Calendar
            mode="multiple"
            selected={seleccionadas}
            className="rounded-md border"
        />
    )
}
