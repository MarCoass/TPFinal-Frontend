import React from 'react'
import Link from 'next/link';

const ProductCard = ({
    imgUrl,
    nombreProducto,
    descripcionProducto,
    precioProducto,
    stock,
    esAdmin,
    idProducto
}) => {
    const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL + '/storage/';
    return (
        <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
            <div className="overflow-x-hidden rounded-2xl relative">
                <Link href={`/producto/${idProducto}`}>
                   <img
                        alt={descripcionProducto}
                        className="h-40 rounded-2xl w-full object-cover"
                        src={urlBase + imgUrl}></img>
                </Link>
                <button title='agregar al carrito' className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
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
                    <p className="text-lg font-medium  text-gray-900 mb-0">
                        {descripcionProducto}
                    </p>
                    <p className="text-md text-gray-800 mt-0">
                        ${precioProducto}
                    </p>
                    {esAdmin ? (
                        <p className="text-md text-gray-800 mt-0">
                            Stock: {stock}
                        </p>
                    ) : null}
                    {stock === 0 ? (
                        <p className="text-md text-red-800 mt-0">
                            SIN STOCK
                        </p>
                    ) : null}
                </div>
                <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                    <button title='agregar a favoritos'>
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
