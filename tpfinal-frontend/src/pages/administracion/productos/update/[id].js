import Input from '@/components/Input'
import AdminLayout from '@/components/Layouts/AdminLayout'
import axios from '@/lib/axios'
import getCookie from '@/lib/cookies'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const fetchProducto = id => {
    return axios
        .get(
            `/administracion/producto/${id}`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

export default function Page({ params }) {
    const { id } = useRouter().query // Obtener el valor del parámetro 'id' de la URL

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [stock, setStock] = useState('')
    const [precio, setPrecio] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [estado, setEstado] = useState('')
    const [imagen, setImagen] = useState('')

    useEffect(() => {
        if (id != null) {
            async function obtenerProducto() {
                try {
                    const data = await fetchProducto(id)
                    setNombre(data.nombre || '')
                    setDescripcion(data.descripcion || '')
                    setStock(data.stock || '')
                    setPrecio(data.precio || '')
                    setCiudad(data.id_ciudad || '')
                    setEstado(data.estado || '')
                    setImagen(data.imagen || '')
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerProducto()
        }
    }, [id])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            // Crea un objeto con los datos del formulario

            const formData = new FormData()
            formData.append('nombre', nombre)
            formData.append('descripcion', descripcion)
            formData.append('precio', precio)
            formData.append('stock', stock)
            formData.append('ciudad', ciudad)
            formData.append('estado', estado)
            formData.append('imagen', imagen)
            /*   console.log('Contenido de formData:');
            for (const [key, value] of formData.entries()) {
              console.log(key, value);
            } */
            // Agrega el token CSRF al encabezado de la solicitud
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            // Realiza la solicitud POST a tu servidor Laravel
            const response = await axios.post(
                '/administracion/productoUpdate/' + id,
                formData,
                {
                    headers,
                },
            )
            // Maneja la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }

    const handleImagenChange = e => {
        // Manejar el cambio en la selección de imagen
        const file = e.target.files[0] // Obtener el archivo de la selección

        if (file) {
            // Validar si se seleccionó un archivo
            setImagen(file)
        }
    }

    return (
        <>
            <AdminLayout>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                {nombre === null ? (
                                    <div>Cargando...</div>
                                ) : (
                                    <form
                                        onSubmit={handleSubmit}
                                        encType="multipart/form-data"
                                        className="grid grid-cols-2 gap-4">
                                        {/* Campos del formulario */}
                                        <div className="flex justify-around">
                                            <label>Nombre:</label>
                                            <Input
                                                type="text"
                                                value={nombre}
                                                onChange={e =>
                                                    setNombre(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="flex justify-around">
                                            <label>Descripcion:</label>
                                            <Input
                                                type="text"
                                                value={descripcion}
                                                onChange={e =>
                                                    setDescripcion(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex justify-around">
                                            <label>Stock:</label>
                                            <Input
                                                type="number"
                                                value={stock}
                                                onChange={e =>
                                                    setStock(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="flex justify-around">
                                            <label>Precio:</label>
                                            <Input
                                                type="number"
                                                value={precio}
                                                onChange={e =>
                                                    setPrecio(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="flex justify-around">
                                            <label>Ciudad:</label>
                                            <Input
                                                type="number"
                                                value={ciudad}
                                                onChange={e =>
                                                    setCiudad(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="flex justify-around">
                                            <label>Estado:</label>
                                            <Input
                                                type="number"
                                                value={estado}
                                                onChange={e =>
                                                    setEstado(e.target.value)
                                                }
                                            />
                                        </div>
                                        {/* Campo de carga de imagen */}
                                        <div>
                                            <label>Imagen:</label>
                                            <input
                                                type="file"
                                                accept=".jpg,.png,.jpeg" // Acepta archivos de imagen
                                                onChange={handleImagenChange} // Maneja el cambio en la selección de imagen
                                            />
                                        </div>
                                        <button
                                            className="border border-violeta-500 w-20 "
                                            type="submit">
                                            Enviar
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
