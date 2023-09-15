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

export default function ListadoProductos() {
    const [productos, setProductos] = useState(null)

    const handleDelete = async id => {
        try {
            const xsrfToken = getCookie('XSRF-TOKEN')
            /*   console.log(id)
            console.log(xsrfToken) */
            const response = await axios.delete(
                `/administracion/productoDelete/${id}`,
                {
                    headers: {
                        'X-XSRF-TOKEN': xsrfToken,
                        Accept: 'application/json',
                    },
                },
            )
            console.log(response)
            // Actualiza la lista de productos después de eliminar el producto
            const updatedProductos = productos.filter(
                producto => producto.id !== id,
            )
            setProductos(updatedProductos)
        } catch (error) {
            console.error('Error al eliminar el producto:', error)
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

    if (productos === null) {
        // Puedes mostrar un mensaje de carga mientras esperas que se resuelva la Promise
        return <div>Cargando productos...</div>
    }

    // Ahora que los datos están disponibles, puedes renderizarlos
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
                            onClick={() => handleDelete(producto.id)}
                            className="bg-violeta-500 text-white p-2">
                            Borrar
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}
