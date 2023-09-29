import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

function getCookie(name) {
    if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1)
            }
        }
    }
    return null
}

const fetchProductos = () => {
    return axios
        .get(
            process.env.NEXT_PUBLIC_BACKEND_URL + '/administracion/productos', // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

const fetchCarrito = () => {
    return axios
        .get(
            process.env.NEXT_PUBLIC_BACKEND_URL + '/carrito', // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

export default function ListadoProductos() {
    const [productos, setProductos] = useState(null)
    const [carrito, setCarrito] = useState(null)

    const handleAgregar = async id => {
        try {
            const xsrfToken = getCookie('XSRF-TOKEN')

            const formData = new FormData()
            formData.append('id_producto', id)
            formData.append('cantidad', 2)

            //console.log(xsrfToken)
            const response = await axios.post(`/agregar-producto`, formData, {
                headers: {
                    'X-XSRF-TOKEN': xsrfToken,
                    Accept: 'application/json',
                },
            })
            // console.log(response.data)
        } catch (error) {
            console.error('Error al agregar el producto:', error)
        }
    }

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

    useEffect(() => {
        async function obtenerCarrito() {
            try {
                const data = await fetchCarrito()
                setCarrito(data)
            } catch (error) {
                console.error('Error al obtener Carrito:', error)
            }
        }
        obtenerCarrito()
    }, [])

    if (productos === null) {
        //  mostrar un mensaje de carga mientras esperas que se resuelva la Promise
        return <div>Cargando productos...</div>
    }
    if (carrito === null) {
        //  mostrar un mensaje de carga mientras esperas que se resuelva la Promise
        return <div>Cargando carrito...</div>
    }

    // Ahora que los datos están disponibles,  renderizarlos
    return (
        <section>
            <h1>Productos</h1>
            <ul>
                {productos.map(producto => (
                    <li key={producto.id}>
                        <p>Nombre: {producto.nombre}</p>
                        <p>Descripcion: {producto.descripcion}</p>
                        <p>Precio: {producto.precio}</p>
                        <p>Stock: {producto.stock}</p>

                        <button
                            onClick={() => handleAgregar(producto.id)}
                            className="bg-violeta-500 text-white p-2">
                            Agregar a carrito
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}
