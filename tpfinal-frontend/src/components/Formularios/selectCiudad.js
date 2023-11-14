import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import SelectBasico from '../Select'

const fetchCiudades = () => {
    return axios.get('/api/ciudades').then(res => res.data)
}

export default function SelectCiudad({ onChange }) {
    const [ciudades, setCiudades] = useState([])

    useEffect(() => {
        async function obtenerCiudades() {
            try {
                const data = await fetchCiudades()
                setCiudades(data)
                /* console.log(data) */
            } catch (error) {
                console.error('Error al obtener ciudades:', error)
                // En caso de error, simplemente establece categorias como un array vacío
                setCiudades([])
            }
        }
        obtenerCiudades()
    }, [])

    // Maneja el cambio en el componente Select
    const handleChange = newValue => {
        onChange(newValue)
    }

    return (
        <SelectBasico
            items={ciudades}
            onChange={handleChange}
            placeholder="Seleccione una ciudad de entrega"></SelectBasico>
    )
}
