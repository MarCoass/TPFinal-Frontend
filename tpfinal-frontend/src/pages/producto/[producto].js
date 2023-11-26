import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import CustomSpinner from '@/components/CustomSpinner'
import Button from '../../components/Button'
import swal from 'sweetalert'
import { useAuth } from '@/hooks/auth'

const fetchProductos = (producto) => {
    return axios
        .get(
            `api/administracion/producto/${producto}`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

export default function infoProducto({ params }) {
    const [infoProducto, setProducto] = useState(null)
    const router = useRouter()
    const { producto } = router.query
    const { user } = useAuth()
    useEffect(() => {
        if (producto != null) {
            async function obtenerDatos() {
                try {
                    const dataProducto = await fetchProductos(producto)
                    console.log(dataProducto)
                    setProducto(dataProducto)
                } catch (error) {
                    console.error('Hubo un problema obteniendo los datos: ', error)
                }
            }
            obtenerDatos()
        }
    }, [producto])

    const handleAddToCart = async (id, cantidad) => {
        if(user){
            try {
                const responseStock = await axios.get(`/api/verificar-stock/${JSON.stringify({ id_producto: id, cantidad: cantidad })}`);
                if (responseStock.data && responseStock.data.stock) {
                    // Si hay suficiente stock, procede con la compra
                    const responseAdd = axios.post('/agregar-producto', { id_producto: id, cantidad: cantidad });
                    if (responseAdd) {
                        swal({
                            icon: 'success',
                            title: 'Producto agregado al carrito.',
                            button: {
                                text: 'X',
                                className:
                                    'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                            },
                        })
                    }
                } else {
                    // No hay suficiente stock para algunos productos
                    swal({
                        icon: 'error',
                        title: 'No hay stock de este producto.',
                        button: {
                            text: 'X',
                            className:
                                'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                        },
                    })
                }
                // Manejo de la respuesta si es necesario
            } catch (error) {
                console.error('Error al agregar el producto:', error);
                // Manejo de errores
            }
        } else {
            swal({
                icon: 'error',
                title: 'Necesitás iniciar sesión para agregar productos al carrito.',
                button: {
                    text: 'X',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
        }

    };

    const handleAgregarFavorito = async (id) =>{
        if(user){
            const responseAdd = await axios.post('api/favorito-agregar', { id_producto: id});
            if (responseAdd ) {
                if(!responseAdd.data.repetido){
                    swal({
                        icon: 'success',
                        title: 'Producto agregado a favoritos.',
                        button: {
                            text: 'X',
                            className:
                                'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                        },
                    })
                } else {
                    swal({
                        icon: 'error',
                        title: 'Este producto ya existe en tu lista de favoritos.',
                        button: {
                            text: 'X',
                            className:
                                'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                        },
                    })
                }
            } else {
                swal({
                    icon: 'error',
                    title: 'Hubo un error, vuelva a intentarlo.',
                    button: {
                        text: 'X',
                        className:
                            'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                    },
                })
            }
        } else {
            swal({
                icon: 'error',
                title: 'Necesitás iniciar sesión para agregar productos a favoritos.',
                button: {
                    text: 'X',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
        }
       
    }
    // 
    const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL + '/storage';
    return (
        <AppLayout>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center container bg-white overflow-hidden shadow-sm sm:rounded-lg sm:px-6 lg:px-8 ">
                        {infoProducto ? (
                            <div className=" p-6 bg-white border-b border-gray-200">

                                <div className='min-w-2xl'> <img
                                    alt={infoProducto.descripcion}
                                    className="h-40 rounded-2xl w-full object-cover"
                                    src={urlBase + infoProducto.url_imagen}></img></div>

                                <div>
                                    <div>
                                        <div className=''><p className='text-xl font-bold'>{infoProducto.nombre}</p></div>
                                        <p className='text-lg'>${infoProducto.precio}</p></div>
                                    <div className='flex flex-row gap-4 '>
                                        {/* <div className='cantidad-producto flex flex-row itens-center border-2 max-w-min rounded-full'><button name='quitar una unidad de producto' className='flex-items-center text-xs bg-gray-300 p-1 rounded-full h-min leading-none'>-</button><input className='border-0 w-20' value={1}></input><button  name='sumar una unidad de producto' >+</button></div> */}
                                        <Button className='inline-flex items-center justify-center px-4 py-2 ' onClick={() => handleAddToCart(infoProducto.id, 1)}>Agregar al carrito</Button>
                                        <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                                            <button title="agregar a favoritos" onClick={() => handleAgregarFavorito(infoProducto.id)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 group-hover:opacity-70"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="gray">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className='info-producto'>
                                        <p>Descripción:</p>
                                        <div><p className='text-lg'>disponibilidad de entrega: {infoProducto.ciudad.nombre}</p></div>
                                        <div><p className='text-lg'>{infoProducto.descripcion}</p></div>
                                        <p>Largo: {infoProducto.set.tip.largo}cm ({infoProducto.set.tip.tags})</p>
                                        <p>Categoría: {infoProducto.set.categoria_set.nombre}</p>
                                    </div>
                                </div>

                            </div>

                        ) : (
                            <div>
                                <CustomSpinner
                                    mensaje={'Cargando producto...'}>
                                </CustomSpinner>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>

    )
}
