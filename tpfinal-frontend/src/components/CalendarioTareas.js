import React, { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { Calendar } from '@/components/ui/calendar'

const fetchTareas = () => {
    return axios.get('/api/tareasInicio').then(res => res.data)
}

export default function CalendarioTareas() {
    const [tareas, setTareas] = useState([])
    const [seleccionadas, setSeleccionadas] = useState([])
    const [tareasDelDia, setTareasDelDia] = useState([])
    const [diaSeleccionado, setDiaSeleccionado] = useState(
        new Date().toLocaleDateString('es-ES'),
    )

    useEffect(() => {
        async function obtenerTareas() {
            try {
                const data = await fetchTareas()
                setTareas(data.tareas)
            } catch (error) {
                console.error('Error al obtener tareas:', error)
            }
        }
        obtenerTareas()
    }, [])

    useEffect(() => {
        if (tareas) {
            const tareasPorDia = {}
            tareas.forEach(tarea => {
                const fechaVencimiento = new Date(
                    tarea.fecha_vencimiento,
                ).toDateString()
                if (!tareasPorDia[fechaVencimiento]) {
                    tareasPorDia[fechaVencimiento] = []
                }
                tareasPorDia[fechaVencimiento].push(tarea.titulo)
            })

            const datesWithTareas = Object.keys(tareasPorDia).map(
                dateString => new Date(dateString),
            )
            setSeleccionadas(datesWithTareas)
        }
    }, [tareas])

    const handleDayClick = day => {
        setDiaSeleccionado(day.toLocaleDateString('es-ES'))
        const dateString = day.toDateString()
        /*   console.log(dateString) */
        if (tareas && tareas.length > 0) {
            const tareasDiaSeleccionado = tareas.filter(tarea => {
                return (
                    new Date(tarea.fecha_vencimiento).toDateString() ===
                    dateString
                )
            })

            setTareasDelDia(tareasDiaSeleccionado.map(tarea => tarea.titulo))
        }
    }

    return (
        <div className="">
            <Calendar
                mode="multiple"
                selected={seleccionadas}
                onDayClick={handleDayClick}
                className="rounded-md border"
            />
            <div>
                <h3>Tareas para el día {diaSeleccionado}:</h3>
                {tareasDelDia.length > 0 ? (
                    <div className="tareas-del-dia">
                        <ul>
                            {tareasDelDia.map((tarea, index) => (
                                <li key={index}>{tarea}</li>
                            ))}
                        </ul>
                    </div>
                ): (<p>No hay tareas para este dia</p>)}
            </div>
        </div>
    )
}
