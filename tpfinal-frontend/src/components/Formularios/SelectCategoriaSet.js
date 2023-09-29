import React, { useEffect, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import axios from '@/lib/axios'

const fetchCategorias = () => {
    return axios.get('/categoriasSets').then(res => res.data)
}

export default function SelectCategoriasSets({ value, onChange }) {
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
        <Select
            items={categorias}
            label="Categoria del set"
            placeholder="Seleccionar una categoria"
            className="max-w-xs"
            value={value}
            onChange={handleChange}>
            {categoria => (
                <SelectItem className='bg-violeta-100  hover:bg-violeta-200' key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                </SelectItem>
            )}
        </Select>
    )
}
