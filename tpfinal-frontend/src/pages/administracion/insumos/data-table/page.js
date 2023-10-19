
import { Insumo, columns } from './columns'
import DataTable from './data-table'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

const fetchInsumos = async () => {
    try {
        const response = await axios.get('/api/administracion/insumos')
        return response.data
    } catch (error) {
        console.error('Error al obtener insumos:', error)
        return [] 
    }
}


export default function TablaInsumos() {
    const [insumos, setInsumos] = useState(null)

    useEffect(() => {
        async function obtenerInsumos() {
            const data = await fetchInsumos()
            setInsumos(data)
          /*   console.log(data) */
        }

        obtenerInsumos()
    }, [])

    
    return (
        <div className="container mx-auto py-10">
            {insumos ? (
                <DataTable columns={columns} data={insumos} />
               
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    )
}
