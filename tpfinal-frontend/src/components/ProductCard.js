import React from 'react'
import Link from 'next/link'
import axios from '@/lib/axios'
import { convertirFechaLarga } from '../lib/formatoFechas'
import { estadosPedido } from '../lib/estados'
import { ModalRespuestaCotizacion } from './Modales/modalPedidos'

const handleAddToCart = (id, cantidad) => {
    try {
      // Llamada a la API para agregar el producto
      const response = axios.post('/agregar-producto', {id_producto:id, cantidad:cantidad});
      console.log('Producto agregado:', response.data);
    //   console.log(response.data.status)
      // Manejo de la respuesta si es necesario
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      // Manejo de errores
    }
  };

const ProductCard = ({
    imgUrl,
    nombreProducto,
    descripcionProducto,
    precioProducto,
    stock,
    esAdmin,
    idProducto,
}) => {
    const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL + '/storage/'
    return (
        <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
            <div className="overflow-x-hidden rounded-2xl relative">
                <Link href={`/producto/${idProducto}`}>
                    <img
                        alt={descripcionProducto}
                        className="h-40 rounded-2xl w-full object-cover"
                        src={urlBase + imgUrl}></img>
                </Link>
                <button
                    title="agregar al carrito"
                    className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group" onClick={() => handleAddToCart(idProducto, 1)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 group-hover:opacity-50 opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </button>
            </div>
            <div className="mt-4 pl-2 mb-2 flex justify-between ">
                <div>
                    <p className="text-lg font-semibold object-center text-gray-900 mb-0">
                        {nombreProducto}
                    </p>
                    {descripcionProducto ? (
                        <p className="text-lg font-medium  text-gray-900 mb-0">
                            {descripcionProducto}
                        </p>
                    ) : null}
                    <p className="text-md text-gray-800 mt-0">
                        ${precioProducto}
                    </p>
                    {esAdmin ? (
                        <p className="text-md text-gray-800 mt-0">
                            Stock: {stock}
                        </p>
                    ) : null}
                    {stock === 0 ? (
                        <p className="text-md text-red-800 mt-0">SIN STOCK</p>
                    ) : null}
                </div>
                <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                    <button title="agregar a favoritos">
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
        </div>
    )
}
export default ProductCard

export const PedidoCard = ({ pedido }) => {
    const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL + '/storage/'
    const estados = estadosPedido()
    const estado = estados.find(estado => estado.id === pedido.estado)

    return (
        <div className="m-5 rounded-[5px] border-2 border-black bg-[#bc95d4] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="border-b-2 border-black p-4">
                <h2 className="text-xl">{pedido.producto.nombre}</h2>
            </div>
            <div className="p-4 grid grid-flow-col gap-5">
                <div>
                    <img
                        alt={pedido.producto.descripcion}
                        className="h-40 w-40 rounded-2xl object-cover border-2 border-black"
                        src={urlBase + pedido.producto.url_imagen}></img>
                </div>
                <div className="grid grid-cols-2">
                    <div>
                        <p className="text-lg">Informacion del set:</p>

                        <p className="">
                            Descripcion: {pedido.producto.descripcion}{' '}
                        </p>
                    </div>
                    <div>
                        <p className="text-lg">Informacion del pedido:</p>
                        <p className="">
                            Precio:{' '}
                            {pedido.producto.precio ? (
                                <>${pedido.producto.precio}</>
                            ) : (
                                <>Sin cotizar</>
                            )}{' '}
                        </p>
                        <p className="">
                            Fecha de entrega:{' '}
                            {pedido.fecha_entrega ? (
                                convertirFechaLarga(pedido.fecha_entrega)
                            ) : (
                                <>Sin cotizar</>
                            )}{' '}
                        </p>
                        <p>Estado: {estado.nombre}</p>
                        {pedido.estado == 1 && (
                            <ModalRespuestaCotizacion pedido={pedido}></ModalRespuestaCotizacion>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
