import { PlusSquare, Trash2, Pencil } from 'lucide-react'
import handleDelete from '../../lib/handleDelete'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import Input from '@/components/Input'
import SelectProveedores from '../Formularios/SelectProveedores'

const fetchPrecio = id => {
    return axios.get('/precio/' + id).then(res => res.data)
}

export function ModalPrecioStore(idInsumo) {
    const [precio, setPrecio] = useState('')
    const [proveedor, setProveedor] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('precio', precio)
            formData.append('id_proveedor', proveedor)
            formData.append('id_insumo', idInsumo.idInsumo)

            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post('/api/precioStore', formData, {
                headers,
            })
            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="items-center p-1 pr-3 flex bg-violeta-500 hover:violeta-red-600 rounded text-white">
                    <PlusSquare className="h-4 w-4 mx-2" />
                    NUEVO PRECIO
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 ">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>
                                Crear nuevo precio
                            </AlertDialogTitle>
                            <div className="flex justify-between">
                                <label htmlFor='precio'>Precio:</label>
                                <Input id='precio'
                                    type="number"
                                    value={precio}
                                    onChange={e => setPrecio(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between">
                                <SelectProveedores
                                    value={proveedor}
                                    onChange={newProveedor =>
                                        setProveedor(newProveedor)
                                    }></SelectProveedores>
                            </div>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction type="submit">
                                Guardar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalPrecioDelete(idPrecio) {
    const id = idPrecio.idPrecio
    const urlDelete = '/api/precioDelete/'
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="items-center p-1 pr-3 flex bg-red-500 hover:bg-red-600 rounded text-white">
                    <Trash2 className="h-4 w-4 mx-2" />
                    ELIMINAR
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader className="flex">
                        <AlertDialogTitle>Eliminar precio</AlertDialogTitle>
                        <p>¿Desea eliminar este precio?</p>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleDelete(id, urlDelete)}>
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalPrecioUpdate(idPrecio) {
    const [precio, setPrecio] = useState('')

    useEffect(() => {
        if (idPrecio) {
            async function obtenerPrecio() {
                try {
                    const data = await fetchPrecio(idPrecio.idPrecio)
                    setPrecio(data.precio)
                   /*  console.log(data) */
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerPrecio()
        }
    }, [idPrecio])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('precio', precio)

            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post(
                '/api/precioUpdate/' + idPrecio.idPrecio,
                formData,
                {
                    headers,
                },
            )
            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="items-center p-1 pr-3 flex bg-violeta-500 hover:red-violeta-600 rounded text-white">
                    <Pencil className="h-4 w-4 mx-2" />
                    EDITAR
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 ">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>
                                Editar el precio
                            </AlertDialogTitle>
                            <div className="flex justify-between">
                                <label htmlFor='precio'>Precio:</label>
                                <Input id='precio'
                                    type="number"
                                    value={precio}
                                    onChange={e => setPrecio(e.target.value)}
                                />
                            </div>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction type="submit">
                                Guardar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
