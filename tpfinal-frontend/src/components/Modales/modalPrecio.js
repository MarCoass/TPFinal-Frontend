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
import { NeoInput } from '../Input'

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
            formData.append('id_proveedor', proveedor.id)
            formData.append('id_insumo', idInsumo.idInsumo)

            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post('/api/precioStore', formData, {
                headers,
            })
            swal({
                icon: 'success',
                title: 'Precio agregado correctamente.',
                button: {
                    text: 'Cerrar',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="w-56 flex cursor-pointer items-center rounded-[5px] border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                    <PlusSquare className="h-4 w-4 mx-2" />
                    NUEVO PRECIO
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50 max-w-min">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 font-bold w-min">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>
                                Crear nuevo precio
                            </AlertDialogTitle>
                            <div className="flex flex-col justify-between">
                                <div className="my-5 flex flex-row w-min mx-auto md:mx-0 gap-4">
                                    <label htmlFor="precio">Precio:</label>
                                    <NeoInput
                                        id="precio"
                                        type="number"
                                        value={precio}
                                        onChange={e =>
                                            setPrecio(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex justify-between mx-auto md:mx-0">
                                    <SelectProveedores
                                        value={proveedor}
                                        onChange={newProveedor =>
                                            setProveedor(newProveedor)
                                        }></SelectProveedores>
                                </div>
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
    const obtenerDatos = () => {
        console.log('no actualiza :C')
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black  px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-red-500 hover:bg-red-600 ">
                    <Trash2 className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader className="flex">
                        <AlertDialogTitle>Eliminar precio</AlertDialogTitle>
                        <p>¿Desea eliminar este precio?</p>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleDelete(id, urlDelete, obtenerDatos)
                            }>
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
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black bg-lila-500 hover:bg-lila-600 px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none ">
                    <Pencil className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50 max-w-min font-bold ">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 ">
                        <AlertDialogHeader className="">
                            <AlertDialogTitle className="text-xl">
                                Editar el precio
                            </AlertDialogTitle>{' '}
                        </AlertDialogHeader>
                        <div className="flex justify-between my-5">
                            <label htmlFor="precio" className="my-auto">
                                Precio:
                            </label>
                            <Input
                                id="precio"
                                type="number"
                                value={precio}
                                onChange={e => setPrecio(e.target.value)}
                            />
                        </div>

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
