import React, { useEffect, useState } from 'react'
import SelectBasico from '../Select'
import axios from '@/lib/axios'

const fetchCategorias = () => {
    return axios.get('/administracion/categoriasInsumos').then(res => res.data)
}

export default function SelectCategoriasInsumos({ value, onChange }) {
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        async function obtenerCategorias() {
            try {
                const data = await fetchCategorias()
                setCategorias(data)
                console.log(categorias)
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
            onChange={onChange}
            placeholder="Seleccionar una categoria"
        />
    )
}
