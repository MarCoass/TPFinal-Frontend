import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import axios from '@/lib/axios'
import Input from '@/components/Input'
import getCookie from '@/lib/cookies'

const fetchProveedor = id => {
    return axios.get(`/api/proveedor/${id}`).then(res => res.data)
}

export default function ProveedorUpdate() {
    const { user } = useAuth()

    const rolesAutorizados = [1]
    useEffect(() => {
        if (user) {
            if (!rolesAutorizados.includes(user.id_rol)) {
                router.push('/dashboard')
            }
        }
    }, [user])

    const { id } = useRouter().query
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [anotacion, setAnotacion] = useState('')

    useEffect(() => {
        if (id) {
            async function obtenerProveedor() {
                try {
                    const data = await fetchProveedor(id)
                    setNombre(data.nombre)
                    setDireccion(data.direccion)
                    setAnotacion(data.anotacion)
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerProveedor()
        }
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nombre', nombre)
            formData.append('direccion', direccion)
            formData.append('anotacion', anotacion)

            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post(
                '/api/proveedorUpdate/' + id,
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
            <AdminLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Editar proveedor
                    </h2>
                }>
                <Head>
                    <title>Editar Proveedor - Mar Nails</title>
                </Head>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 ">
                            {nombre === null ? (
                                <div>cargando....</div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="grid grid-cols-2 gap-4">
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
                                        <label>Direccion:</label>
                                        <Input
                                            type="text"
                                            value={direccion}
                                            onChange={e =>
                                                setDireccion(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="flex justify-around">
                                        <label>Anotacion:</label>
                                        <Input
                                            type="text"
                                            value={anotacion}
                                            onChange={e =>
                                                setAnotacion(e.target.value)
                                            }
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
                </div>{' '}
            </AdminLayout>
        </>
    )
}
