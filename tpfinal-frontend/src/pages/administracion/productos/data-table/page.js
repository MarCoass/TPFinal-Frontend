// Importa las definiciones de Producto y las columnas desde el archivo "./columns.js"
import { Producto, columns } from './columns'
// Importa el componente DataTable desde el archivo "./data-table.js"
import DataTable from './data-table'

import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

// Función asincrónica para obtener datos (simulando una llamada a la API)
const fetchProductos = async () => {
    try {
        const response = await axios.get('/administracion/productos')
        return response.data
    } catch (error) {
        console.error('Error al obtener productos:', error)
        return [] // Devuelve un array vacío en caso de error
    }
}

// Función principal de la página
export default function TablaProductos() {
    const [productos, setProductos] = useState(null)

    useEffect(() => {
        async function obtenerProductos() {
            const data = await fetchProductos()
            setProductos(data)
            // console.log(data);
        }

        obtenerProductos()
    }, [])

    
     

    // Renderiza DataTable solo cuando los datos están disponibles
    return (
        <div className="container mx-auto py-2">
            {productos ? (
                <DataTable columns={columns} data={productos} />
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    )
}
