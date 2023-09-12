import React, { useEffect, useState } from 'react'

const fetchProductos = () => {
    return fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/administracion/productos',
    ).then(res => res.json())
}

export default function ListadoProductos() {
    const [productos, setProductos] = useState(null)

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
                    <li key={producto.id}>{producto.nombre}</li>
                ))}
            </ul>
        </section>
    )
}
