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
        if (user) {
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

    const handleAgregarFavorito = async (id) => {
        if (user) {
            const responseAdd = await axios.post('api/favorito-agregar', { id_producto: id });
            if (responseAdd) {
                if (!responseAdd.data.repetido) {
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

            <div className="pt-12 ">
                <div className="max-w-7xl lg:h-[25rem] bg-lila-500 border border-2 border-black rounded-[5px] mx-auto sm:px-6 lg:px-8">
                    {infoProducto ? (
                        <div className="pt-8 flex flex-col md:flex-row justify-center items-center md:items-start">
                            <div className="relative">
                                <div className='min-w-2xl relative'>
                                    <img
                                        alt={infoProducto.descripcion}
                                        className="h-[18rem] w-[24rem] md:w-[20rem] border border-black border-2 rounded-2xl w-52 object-cover shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                        src={urlBase + infoProducto.url_imagen}
                                    />
                                    {infoProducto.stock === 0 ? (
                                        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                                            <div className='bg-white bg-opacity-25 h-48 w-96 flex items-center justify-center rounded-2xl'>
                                                <p className="text-center font-semibold text-6xl text-red-800 mt-0">SIN STOCK</p>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className='flex flex-col ml-4'>
                                <div className='flex flex-col mb-3 md:mb-6'>
                                    <div className='flex justify-center md:justify-start'><p className='text-3xl font-bold'>{infoProducto.nombre}</p></div>
                                    <div className='flex justify-center md:justify-start'><p className='text-lg font-semibold'>{infoProducto.descripcion}</p></div>
                                </div>

                                <div className='info-producto'>
                                    <div><p className='text-lg font-semibold'><b>Disponibilidad de entrega:</b> {infoProducto.ciudad.nombre}</p></div>
                                    <p className='text-lg font-semibold'><b>Largo:</b> {infoProducto.set.tip.largo}cm</p>
                                    <p className='text-lg font-semibold'><b>Categoría:</b> {infoProducto.set.categoria_set.nombre}</p>
                                    <p className='text-lg font-semibold'><b>Precio: </b>${infoProducto.precio}</p>
                                </div>

                                <div className='flex flex-col md:flex-row gap-4 mt-4 md:mt-8'>
                                    <Button className='inline-flex items-center px-4 py-2 mb-4 md:mb-0' onClick={() => handleAddToCart(infoProducto.id, 1)}>Agregar al carrito</Button>
                                    <div className="flex flex-row gap-4">
                                        <button title="agregar a favoritos" onClick={() => handleAgregarFavorito(infoProducto.id)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 group-hover:opacity-70"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="black">
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
                            </div>
                        </div>
                    ) : (
                        <div>
                            <CustomSpinner mensaje={'Cargando producto...'} />
                        </div>
                    )}
                </div>
            </div>

        </AppLayout>

    )
}
