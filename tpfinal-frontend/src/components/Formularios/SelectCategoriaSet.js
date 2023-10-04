import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import SelectBasico from '../Select'

const fetchCategorias = () => {
    return axios.get('/categoriasSets').then(res => res.data)
}

export default function SelectCategoriasSets({ onChange }) {
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        async function obtenerCategorias() {
            try {
                const data = await fetchCategorias()
                setCategorias(data)

                // console.log(data)
            } catch (error) {
                console.error('Error al obtener categorias:', error)
                // En caso de error, simplemente establece categorias como un array vacío
                setCategorias([])
            }
        }

        obtenerCategorias()
    }, [])

    // Maneja el cambio en el componente Select
    const handleChange = newValue => {
        onChange(newValue)
    }

    return (
        <SelectBasico
            items={categorias}
            onChange={handleChange}
            placeholder="Seleccione la categoria"></SelectBasico>
    )
}
