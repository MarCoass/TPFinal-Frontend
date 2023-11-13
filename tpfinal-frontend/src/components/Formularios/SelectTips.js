import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const fetchTips = () => {
    return axios.get('/administracion/tips').then(res => res.data)
}

export default function SelectTips({ onChange, id }) {
    const [tips, setTips] = useState([])

    useEffect(() => {
        async function obtenerTips() {
            try {
                const data = await fetchTips()
                setTips(data)
            } catch (error) {
                console.error('Error al obtener tips:', error)
                // En caso de error, simplemente establece categorias como un array vacío
                setTips([])
            }
        }

        obtenerTips()
    }, [])

    // Maneja el cambio en el componente Select
    const handleChange = event => {
        // Obtiene el valor seleccionado del evento
        const selectedValue = event.target.value;
    
        // Pasa solo el ID al padre
        onChange(selectedValue);
    }

    return (
        <>
            <select
            id={id}
            required
                onChange={handleChange}
                className="uppercase flex w-[300px] cursor-pointer items-center rounded-[5px] border-2 border-black bg-rosado-300 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                <option value="" className="font-bold">
                    Seleccione el tip
                </option>
                {tips.map(item => (
                    <option
                        className="uppercase font-bold text-black border-b-2 border-black bg-rosado-300 px-5 py-3 first:rounded-t-[5px] last:rounded-b-[5px] hover:bg-rosado-400"
                        key={item.id}
                        value={item.id}>
                        {item.forma} {item.largo}cm
                    </option>
                ))}
            </select>
        </>
    )
}
