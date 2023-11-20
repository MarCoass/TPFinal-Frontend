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
                //traigo la fecha
                const fechaVencimiento = new Date(tarea.fecha_vencimiento)
                //le sumo un dia
                let fechaNueva = new Date(fechaVencimiento)
                fechaNueva.setDate(fechaNueva.getDate() + 1)
                //la paso a string
                fechaNueva = fechaNueva.toDateString()

                if (!tareasPorDia[fechaNueva]) {
                    tareasPorDia[fechaNueva] = []
                }
                tareasPorDia[fechaNueva].push(tarea.titulo)
                
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
        /* console.log(dateString) */
     
        if (tareas && tareas.length > 0) {
          
            const tareasDiaSeleccionado = tareas.filter(tarea => {
                let fechaNueva = new Date(tarea.fecha_vencimiento)
                fechaNueva.setDate(fechaNueva.getDate() + 1)
                return (
                    fechaNueva.toDateString() ===
                    dateString
                )
            })
            
            setTareasDelDia(tareasDiaSeleccionado.map(tarea => tarea.titulo))
        }
    }

    return (
        <div className=" max-w-min rounded-[5px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Calendar
                mode="multiple"
                selected={seleccionadas}
                onDayClick={handleDayClick}
                className="border-b-black border-b-2 bg-lila-400 "
            />
            <div className='py-5 px-3 bg-lila-300'>
                <p className='font-bold '>Tareas para el día {diaSeleccionado}:</p>
                {tareasDelDia.length > 0 ? (
                    <div className="tareas-del-dia">
                        <ul>
                            {tareasDelDia.map((tarea, index) => (
                                <li key={index}>{tarea}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No hay tareas para este dia</p>
                )}
            </div>
        </div>
    )
}
