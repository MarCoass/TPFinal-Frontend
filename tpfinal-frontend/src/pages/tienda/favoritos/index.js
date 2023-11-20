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
            process.env.NEXT_PUBLIC_BACKEND_URL + '/api/favoritos', // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

//TRAER LA CIUDAD DEL BACK CON ELOQUENT ASI FILTRA POR ESO TMB

function filtrarProductos(diseño, largo, forma, ciudad, productos) {
    // Create an array to store the filtered products
    let productosFiltrados = [...productos];

    // Filter by Diseño
    const diseñoFilters = diseño.filter(filtro => filtro.seleccionado);
    if (diseñoFilters.length > 0) {
        productosFiltrados = productosFiltrados.filter(producto =>
            diseñoFilters.some(filtro => producto.set.categoria_set.nombre === filtro.nombre)
        );
    }

    // Filter by Forma
    const formaFilters = forma.filter(filtro => filtro.seleccionado);
    if (formaFilters.length > 0) {
        productosFiltrados = productosFiltrados.filter(producto =>
            formaFilters.some(filtro => producto.set.tip.forma === filtro.nombre)
        );
    }

    // Filter by Largo
    const largoFilters = largo.filter(filtro => filtro.seleccionado);
    if (largoFilters.length > 0) {
        productosFiltrados = productosFiltrados.filter(producto => {
            return largoFilters.some(filtro => {
                if (filtro.nombre === 'Largas' && parseInt(producto.set.tip.largo, 10) >= 2.5) {
                    return true;
                }
                if (filtro.nombre === 'Cortas' && parseInt(producto.set.tip.largo, 10) < 2.5) {
                    return true;
                }
                return false;
            });
        });
    }


    // Filter by Ciudad
    const ciudadFilters = ciudad.filter(filtro => filtro.seleccionado);
    if (ciudadFilters.length > 0) {
        productosFiltrados = productosFiltrados.filter(producto =>
            ciudadFilters.some(filtro => producto.ciudad.nombre === filtro.nombre)
        );
    }

    return productosFiltrados;
}


export default function Favoritos({ diseño, forma, largo, ciudad }) {
    const [productos, setProductos] = useState(null)
    const [productosFiltrados, setProductosFiltrados] = useState(null)
    useEffect(() => {
        obtenerProductos()
        // setProductosFiltrados(productos)
        // setProductosFiltrados(filtrarProductos(diseño, largo, forma, ciudad, productos))
    }, [])

    const obtenerProductos = async()=>{
        try {
            const data = await fetchProductos()
            let productosArray=[];
            data.map((producto)=>{
                productosArray.push(producto.original)
            })
            setProductos(productosArray)
            console.log(data)
        } catch (error) {
            console.error('Error al obtener productos:', error)
        }
    }

    useEffect(() => {
        if (productos) {
            const filteredProducts = filtrarProductos(diseño, largo, forma, ciudad, productos);
            setProductosFiltrados(filteredProducts);
        }
    }, [diseño, largo, forma, ciudad, productos]);

    return (

        <>
            <Head>
                <title>Catalogo - Mar Nails</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="container bg-white overflow-hidden shadow-sm sm:rounded-lg sm:px-6 lg:px-8">
                        {productosFiltrados === null ? (
                            <div>
                                <CustomSpinner
                                    mensaje={'Cargando productos...'}>
                                </CustomSpinner>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-6 bg-white border-b border-gray-200">
                                {productosFiltrados.map(producto => (
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
                                            esFavorito={true}
                                            obtenerProductos={obtenerProductos}
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


