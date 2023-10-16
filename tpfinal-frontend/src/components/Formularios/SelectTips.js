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

export default function SelectTips({ onChange }) {
    const [tips, setTips] = useState([])

    useEffect(() => {
        async function obtenerTips() {
            try {
                const data = await fetchTips()
                setTips(data)
                console.log(data)
            } catch (error) {
                console.error('Error al obtener categorias:', error)
                // En caso de error, simplemente establece categorias como un array vacío
                setTips([])
            }
        }

        obtenerTips()
    }, [])

    // Maneja el cambio en el componente Select
    const handleChange = newValue => {
        onChange(newValue)
    }

    return (
        <Select onValueChange={handleChange}>
        <SelectTrigger>
            <SelectValue placeholder='Seleccione el tip' />
        </SelectTrigger>
        <SelectContent>
            {tips.map(item => (
                <SelectItem key={item.id} value={item.id}>
                    {item.forma} {item.largo}cm
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
    )
}
