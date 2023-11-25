import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Pencil, Trash2, PlusSquare, Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import Input from '@/components/Input'
import handleDelete from '../../lib/handleDelete'
import handleUpdate from '../../lib/handleUpdate'

const fetchProveedor = id => {
    return axios.get('/api/proveedor/' + id).then(res => res.data)
}

export function ModalProveedorStore({ dashboard, obtenerDatos }) {
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [anotacion, setAnotacion] = useState('')

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

            const response = await axios.post('/api/proveedorStore', formData, {
                headers,
            })
            // Maneja la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', response.data)
            obtenerDatos()
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }
    return (
        <>
            <AlertDialog>
                {dashboard ? (
                    <AlertDialogTrigger className="flex align-middle gap-2 ">
                        <p>Nuevo proveedor</p>
                        <PlusSquare className="" />
                    </AlertDialogTrigger>
                ) : (
                    <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                        <PlusSquare className="h-4 w-4 mx-2" />
                        NUEVO PROVEEDOR
                    </AlertDialogTrigger>
                )}
                <AlertDialogContent className="bg-white p-12">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 ">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>Nuevo proveedor</AlertDialogTitle>

                            <div className="flex justify-between">
                                <label>Nombre:</label>
                                <Input
                                    type="text"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between">
                                <label>Direccion:</label>
                                <Input
                                    type="text"
                                    value={direccion}
                                    onChange={e => setDireccion(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between">
                                <label>Anotacion:</label>
                                <Input
                                    type="text"
                                    value={anotacion}
                                    onChange={e => setAnotacion(e.target.value)}
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

export function ModalProveedorDelete({ idProveedor, obtenerDatos }) {
    let urlDelete = '/api/proveedorDelete/'
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black  px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-red-500 hover:bg-red-600 ">
                    <Trash2 className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>
                <AlertDialogContent className="items-center justify-center rounded-md border-2 border-black bg-lila-100 p-10 pt-12 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300}">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Desea eliminar el proveedor?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleDelete(idProveedor, urlDelete, obtenerDatos)
                            }>
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalProveedorUpdate({ idProveedor, obtenerDatos }) {
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [anotacion, setAnotacion] = useState('')

    useEffect(() => {
        if (idProveedor != null) {
            async function obtenerProveedor() {
                try {
                    const data = await fetchProveedor(idProveedor)
                    //console.log(info)
                    setNombre(data.nombre || '')
                    setDireccion(data.direccion || '')
                    setAnotacion(data.anotacion || '')
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerProveedor()
        }
    }, [idProveedor])

    const handleSubmit = async e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('nombre', nombre)
        formData.append('direccion', direccion)
        formData.append('anotacion', anotacion)

        // Realiza la solicitud POST a tu servidor Laravel
        let urlUpdate = '/api/proveedorUpdate/'
        handleUpdate(idProveedor, urlUpdate, formData, obtenerDatos)
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black bg-lila-500 hover:bg-lila-600 px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none ">
                    <Pencil className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-white p-12">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 ">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>Nuevo proveedor</AlertDialogTitle>

                            <div className="flex justify-between">
                                <label>Nombre:</label>
                                <Input
                                    type="text"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between">
                                <label>Direccion:</label>
                                <Input
                                    type="text"
                                    value={direccion}
                                    onChange={e => setDireccion(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between">
                                <label>Anotacion:</label>
                                <Input
                                    type="text"
                                    value={anotacion}
                                    onChange={e => setAnotacion(e.target.value)}
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

export function ModalProveedorVer({ idProveedor }) {
    const [proveedor, setProveedor] = useState()
    useEffect(() => {
        if (idProveedor != null) {
            async function obtenerProveedor() {
                try {
                    const data = await fetchProveedor(idProveedor)
                    setProveedor(data)
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerProveedor()
        }
    }, [idProveedor])
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-rosado-500 hover:bg-rosado-600">
                    <Eye className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>
                <AlertDialogContent className=" items-center justify-center rounded-md border-2 border-black bg-lila-100 p-10 pt-12 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300}">
                    <AlertDialogHeader className="mr-5">
                        <AlertDialogTitle>
                            {proveedor && <p>{proveedor.nombre}</p>}
                        </AlertDialogTitle>
                        {proveedor && (
                            <>
                                <p>Nombre:{proveedor.nombre}</p>
                                <p>Direccion:{proveedor.direccion}</p>
                                <p>Anotacion:{proveedor.anotacion}</p>
                            </>
                        )}
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mr-5">
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
