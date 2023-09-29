import React, { useEffect, useState } from 'react'

import { Select, SelectItem } from '@nextui-org/react'
import axios from '@/lib/axios'

const fetchCiudades = () => {
    return axios.get('/ciudades').then(res => res.data)
}

export default function SelectCiudades({ value, onChange }) {
    const [ciudades, setCiudades] = useState([])

    useEffect(() => {
        async function obtenerProductos() {
            try {
                const data = await fetchCiudades()
                setCiudades(data)
              //  console.log(ciudades)
                // console.log(data)
            } catch (error) {
                console.error('Error al obtener ciudades:', error)
                // En caso de error, simplemente establece ciudades como un array vacío
                setCiudades([])
            }
        }

        obtenerProductos()
    }, [])

    // Maneja el cambio en el componente Select
    const handleCiudadChange = newValue => {
        onChange(newValue)
    }

    return (
        <Select
            items={ciudades}
            label="Ciudades"
            placeholder="Seleccionar una ciudad"
            className="max-w-xs"
            value={value}
            onChange={handleCiudadChange}>
            {ciudad => (
                <SelectItem className='bg-violeta-100  hover:bg-violeta-200' key={ciudad.id} value={ciudad.id}>
                    {ciudad.nombre}
                </SelectItem>
            )}
        </Select>
    )
}
