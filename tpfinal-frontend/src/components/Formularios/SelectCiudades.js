import React, { useEffect, useState } from 'react'

import axios from '@/lib/axios'
import SelectBasico from '../Select'

const fetchCiudades = () => {
    return axios.get('/ciudades').then(res => res.data)
}

export default function SelectCiudades({ value, onChange,id }) {
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
        <SelectBasico
        id={id}
            items={ciudades}
            onChange={onChange}
            placeholder="Seleccionar una ciudad"
        />
    )
}
