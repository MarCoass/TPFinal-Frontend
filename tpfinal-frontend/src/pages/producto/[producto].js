import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'

const fetchProductos = (producto) => {
    return axios
        .get(
            `/administracion/producto/${producto}`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}


export default function infoProducto({params}) {
    const [infoProducto, setProducto] = useState(null)
    const router = useRouter()
    const {producto} = router.query
    console.log(producto)
    //tengo que traer:
    //set
    //categoriaSet
    //tips
    //insumo
    useEffect(()=>{
        async function obtenerProducto(){
            try {
                const data = await fetchProductos(producto)
                console.log(data.nombre)
                setProducto(data)
            } catch (error) {
                console.error ('Hubo un problema obteniendo los datos: ', error)
            }
        }
        obtenerProducto()
    },[])
    // 
    return (
        <AppLayout>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="container bg-white overflow-hidden shadow-sm sm:rounded-lg sm:px-6 lg:px-8">
                                         {infoProducto === null ? (
                            <div>Cargando producto...</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-6 bg-white border-b border-gray-200">
                                producto {infoProducto.nombre}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>

    )
}
