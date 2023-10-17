import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import StoreLayout from '../layout'
import ProductCard from '@/components/ProductCard'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import CustomSpinner from '@/components/CustomSpinner'

const fetchProductos = () => {
    return axios
        .get(
            process.env.NEXT_PUBLIC_BACKEND_URL + '/api/administracion/productos', // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

//tengo 3 arrays iguales, con la misma estructura y despues tengo largo, que se trata distinto
function filtrarProductos(diseño, largo, forma, ciudad, productos) {
    console.log('filtrando...')
    // filtrosArrays.map((filtrosArray)=>{
    //     filtros = obtenerFiltrosSeleccionados(filtrosArray)
    //     if (filtros.length > 1 && filtros)
    // })
    let hayFiltrosAplicados = false
    let productosFiltrados = []
    if(diseño.some((filtro)=> filtro.seleccionado===true)){
        hayFiltrosAplicados = true
        diseño.map((filtro) => {
            if (filtro.seleccionado) {
                console.log(filtro)
                productosFiltrados.push(...productos.filter(producto => producto.set.categoria_set.nombre === filtro.nombre)) 
            }
        })
    }
    if(forma.some((filtro)=> filtro.seleccionado===true)){
        hayFiltrosAplicados = true
        diseño.map((filtro) => {
            if (filtro.seleccionado) {
                console.log(filtro)
                productosFiltrados.push(...productos.filter(producto => producto.set.tip.forma === filtro.nombre)) 
            }
        })
    }

    if(largo.some((filtro)=> filtro.seleccionado===true)){
        hayFiltrosAplicados = true
        diseño.map((filtro) => {
            if (filtro.seleccionado) {
                console.log(filtro)
                if(filtro.nombre === 'Largo'){
                    productosFiltrados.push(...productos.filter(producto => producto.set.tip.largo >= 2.5)) 
                } else {
                    productosFiltrados.push(...productos.filter(producto => producto.set.tip.largo < 2.5)) 
                }
            }
        })
    }

    if(ciudad.some((filtro)=> filtro.seleccionado===true)){
        hayFiltrosAplicados = true
        diseño.map((filtro) => {
            if (filtro.seleccionado) {
                console.log(filtro)
                productosFiltrados.push(...productos.filter(producto => producto.ciudad.nombre === filtro.nombre)) 
            }
        })
    }
   
    if(!hayFiltrosAplicados){
        productosFiltrados = productos
    }
    console.log(productosFiltrados)
   return productosFiltrados

}

// function obtenerFiltrosSeleccionados(filtros, filtrosAplicados){
//     filtros.map((filtro)=>{
//         if(filtro.seleccionado){
//             filtrosAplicados.push(filtro)
//         }
//     })
//     return filtrosAplicados
// }

export default function Catalogo({ diseño, forma, largo, ciudad }) {
    console.log(diseño)
    const [productos, setProductos] = useState(null)
    const [productosFiltrados, setProductosFiltrados] = useState(null)
    useEffect(() => {
        async function obtenerProductos() {
            try {
                const data = await fetchProductos()
                setProductos(data)
            } catch (error) {
                console.error('Error al obtener productos:', error)
            }
        }
        obtenerProductos()
        
    }, [])
    let productosConFiltro = filtrarProductos(diseño, largo, forma, ciudad, productos)
    // setProductosFiltrados(productosConFiltro)
    
    return (

        <>
            <Head>
                <title>Catalogo - Mar Nails</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="container bg-white overflow-hidden shadow-sm sm:rounded-lg sm:px-6 lg:px-8">
                        {productos === null ? (
                            <div>
                                <CustomSpinner
                                    mensaje={'Cargando productos...'}>
                                </CustomSpinner>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-6 bg-white border-b border-gray-200">
                                {productos.map(producto => (
                                    <div key={producto.id}>
                                        {/* <p>Nombre: {producto.nombre}</p>
                                    <p>Descripcion: {producto.descripcion}</p>
                                    <p>Precio: {producto.precio}</p>
                                    <p>Stock: {producto.stock}</p> */}
                                        <ProductCard
                                            imgUrl={producto.url_imagen}
                                            nombreProducto={producto.nombre}
                                            // descripcionProducto={producto.descripcion}
                                            precioProducto={producto.precio}
                                            stock={producto.stock}
                                            esAdmin={false}
                                            idProducto={producto.id}
                                        >
                                        </ProductCard>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>

    )
}

