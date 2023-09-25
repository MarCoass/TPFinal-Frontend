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

    useEffect(()=>{
        async function obtenerProducto(){
            try {
                const data = await fetchProductos(producto)
                console.log(data)
                setProducto(data)
                //esta variable queda null y no se pq D:
                console.log(infoProducto)
            } catch (error) {
                console.error ('Hubo un problema obteniendo los datos: ', error)
            }
        }
        obtenerProducto()
    })
    // 
    return (
        <AppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="container bg-white overflow-hidden shadow-sm sm:rounded-lg sm:px-6 lg:px-8">
                        <h1>Producto</h1>
                    </div>
                </div>
            </div>
        </AppLayout>

    )
}
