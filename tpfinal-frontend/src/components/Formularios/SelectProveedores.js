import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import SelectBasico from '../Select'

const fetchProveedores = () => {
    return axios.get('/api/proveedores').then(res => res.data)
}

export default function SelectProveedores({ onChange }) {
    const [proveedores, setProveedores] = useState([])

    useEffect(() => {
        async function obtenerProveedores() {
            try {
                const data = await fetchProveedores()
                setProveedores(data)
                /* console.log(data) */
            } catch (error) {
                console.error('Error al obtener proveedores:', error)
                // En caso de error, simplemente establece categorias como un array vacío
                setProveedores([])
            }
        }
        obtenerProveedores()
    }, [])

    // Maneja el cambio en el componente Select
    const handleChange = newValue => {
        onChange(newValue)
    }

    return (
        <SelectBasico
            items={proveedores}
            onChange={handleChange}
            placeholder="Seleccione un proveedor"></SelectBasico>
    )
}
