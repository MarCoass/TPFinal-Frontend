
import { Insumo, columns } from './columns'

import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Tabla from '../../../../components/Tablas/data-table';

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
            console.log(data)
        }

        obtenerInsumos()
    }, [])

    
    return (
        <div className="container mx-auto py-10">
            {insumos ? (
                <Tabla columns={columns} data={insumos} />
               
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    )
}
