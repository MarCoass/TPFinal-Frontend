import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import StoreLayout from '../layout'
import ProductCard from '@/components/ProductCard'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

const fetchProductos = () => {
    return axios
        .get(
            process.env.NEXT_PUBLIC_BACKEND_URL + '/administracion/productos', // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

const Catalogo = () => {
    const [productos, setProductos] = useState(null)
    useEffect(() => {
        async function obtenerProductos() {
            try {
                const data = await fetchProductos()
                setProductos(data)
                //console.log(data)
            } catch (error) {
                console.error('Error al obtener productos:', error)
            }
        }
        obtenerProductos()
    }, [])

    if (productos === null) {
        // Puedes mostrar un mensaje de carga mientras esperas que se resuelva la Promise
        return <div>Cargando productos...</div>
    }

    return (

        <StoreLayout>
            <Head>
                <title>Catalogo - Mar Nails</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="container bg-white overflow-hidden shadow-sm sm:rounded-lg sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-6 bg-white border-b border-gray-200">
                            {productos.map(producto => (
                                <div key={producto.id}>
                                    {/* <p>Nombre: {producto.nombre}</p>
                                    <p>Descripcion: {producto.descripcion}</p>
                                    <p>Precio: {producto.precio}</p>
                                    <p>Stock: {producto.stock}</p> */}
                                    <ProductCard
                                        imgUrl={producto.url_imagen}
                                        nombreProducto={producto.nombre}
                                        descripcionProducto={producto.descripcion}
                                        precioProducto={producto.precio}
                                        stock={0}
                                        esAdmin={false}
                                    >
                                    </ProductCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayout>

    )
}

export default Catalogo
