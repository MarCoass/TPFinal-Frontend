import React, { useEffect, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import axios from '@/lib/axios'

const fetchTips = () => {
    return axios.get('/administracion/tips').then(res => res.data)
}

export default function SelectTips({ value, onChange }) {
    const [tips, setTips] = useState([])

    useEffect(() => {
        async function obtenerTips() {
            try {
                const data = await fetchTips()
                setTips(data)
                
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
        <Select
            items={tips}
            label="Tips"
            placeholder="Seleccionar un tipo de tips"
            className="max-w-xs"
            value={value}
            onChange={handleChange}>
            {tip => (
                <SelectItem key={tip.id} value={tip.id}>
                    {tip.forma.toUpperCase()} {tip.largo}cm.
                </SelectItem>
            )}
        </Select>
    )
}
