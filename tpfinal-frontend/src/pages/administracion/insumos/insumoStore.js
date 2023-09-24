import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { useEffect, useState } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'

import axios from '@/lib/axios'
import Input from '@/components/Input'
import getCookie from '@/lib/cookies'
import SelectCategoriasInsumos from '@/components/Formularios/SelectCategoriasInsumos'
import { SelectEstadosInsumo } from '@/components/Formularios/SelectEstados'


export default function InsumoStore() {
    const { user } = useAuth()

    const rolesAutorizados = [1]
    useEffect(() => {
        if (user) {
            if (!rolesAutorizados.includes(user.id_rol)) {
                router.push('/dashboard')
            }
        }
    }, [user])

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [stock, setStock] = useState('')
    const [stock_minimo, setStockMinimo] = useState('')
    const [id_categoria, setCategoria] = useState('')
    const [estado, setEstado] = useState('')
    const [marca, setMarca] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nombre', nombre)
            formData.append('descripcion', descripcion)
            formData.append('stock', stock)
            formData.append('stock_minimo', stock_minimo)
            formData.append('id_categoria', id_categoria.target.value)
            formData.append('estado', estado.target.value)
            formData.append('marca', marca)

            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post(
                '/administracion/insumoStore',
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
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
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
                                        <label>Descripcion:</label>
                                        <Input
                                            type="text"
                                            value={descripcion}
                                            onChange={e =>
                                                setDescripcion(e.target.value)
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
                                        <label>Stock minimo:</label>
                                        <Input
                                            type="number"
                                            value={stock_minimo}
                                            onChange={e =>
                                                setStockMinimo(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="flex justify-around">
                                        <SelectCategoriasInsumos
                                            value={id_categoria}
                                            onChange={newCategoria =>
                                                setCategoria(newCategoria)
                                            }></SelectCategoriasInsumos>
                                    </div>
                                    <div className="flex justify-around">
                                        <SelectEstadosInsumo
                                            value={estado}
                                            onChange={newEstado =>
                                                setEstado(newEstado)
                                            }></SelectEstadosInsumo>
                                    </div>
                                    <div className="flex justify-around">
                                        <label>Marca:</label>
                                        <Input
                                            type="text"
                                            value={marca}
                                            onChange={e =>
                                                setMarca(e.target.value)
                                            }
                                        />
                                    </div>
                                    <button
                                        className="border border-violeta-500 w-20 "
                                        type="submit">
                                        Enviar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
          
        </>
    )
}
