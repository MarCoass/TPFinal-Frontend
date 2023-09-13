import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Input from '@/components/Input'
import Button from '@/components/Button'




export default function adminIndex() {
    const { user } = useAuth()

    const rolesAutorizados = [1]
    useEffect(() => {
        if (user) {
            if (!rolesAutorizados.includes(user.id_rol)) {
                router.push('/dashboard')
            }
        }
    }, [user])

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

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [stock, setStock] = useState('')
    const [precio, setPrecio] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [estado, setEstado] = useState('')
    const [imagen, setImagen] = useState('')

   /*  const handleImagenChange = e => {
        // Manejar el cambio en la selección de imagen
        const file = e.target.files[0] // Obtener el archivo de la selección

        if (file) {
            // Validar si se seleccionó un archivo
            setImagen(file)
        }
    } */
    const handleSubmit = async e => {
        
        e.preventDefault()

        try {
            // Crea un objeto con los datos del formulario
            const formData = {
                nombre,
                descripcion,
                precio,
                stock,
                ciudad,
                estado,
              /*   imagen */
            }
            //console.log(formData)
            // Agrega el token CSRF al encabezado de la solicitud
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                'Content-type': 'application/json',
                Accept: 'application/json',
            }
            //console.log('FORM DATA: ', formData)
            //console.log('HEADERS: ', headers)

            // Realiza la solicitud POST a tu servidor Laravel
            const response = await axios.post(
                '/administracion/productoStore',
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

    return (
        <>
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Nuevo producto
                    </h2>
                }>
                <Head>
                    <title> Nuevo producto - Mar Nails</title>
                </Head>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <form onSubmit={handleSubmit}  encType="multipart/form-data" className='grid grid-cols-2 gap-4'>
                                    {/* Campos del formulario */}
                                    <div className='flex justify-around'>
                                        <label>Nombre:</label>
                                        <Input
                                            type="text"
                                            value={nombre}
                                            onChange={e =>
                                                setNombre(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className='flex justify-around'>
                                        <label>Descripcion:</label>
                                        <Input
                                            type="text"
                                            value={descripcion}
                                            onChange={e =>
                                                setDescripcion(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className='flex justify-around'>
                                        <label>Stock:</label>
                                        <Input
                                            type="number"
                                            value={stock}
                                            onChange={e =>
                                                setStock(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className='flex justify-around'>
                                        <label>Precio:</label>
                                        <Input
                                            type="number"
                                            value={precio}
                                            onChange={e =>
                                                setPrecio(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className='flex justify-around'>
                                        <label>Ciudad:</label>
                                        <Input
                                            type="number"
                                            value={ciudad}
                                            onChange={e =>
                                                setCiudad(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className='flex justify-around'>
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
                                 {/*    <div>
                                        <label>Imagen:</label>
                                        <input
                                            type="file"
                                            accept=".jpg,.png,.jpeg" // Acepta archivos de imagen
                                            onChange={handleImagenChange} // Maneja el cambio en la selección de imagen
                    
                                        />
                                    </div> */}
                                    <button className='border border-violeta-500 w-20' type="submit">Enviar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}
