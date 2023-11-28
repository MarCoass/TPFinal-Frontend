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
import { NeoInput } from '@/components/Input'
import handleDelete from '../../lib/handleDelete'
import handleUpdate from '../../lib/handleUpdate'

const fetchCiudad = id => {
    return axios.get('/ciudad/' + id).then(res => res.data)
}

export function ModalCiudadStore({ obtenerDatos }) {
    const [nombre, setNombre] = useState('')
    const [envio, setEnvio] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nombre', nombre)
            formData.append('valor_envio', envio)
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post('/api/ciudadStore', formData, {
                headers,
            })
            console.log('Respuesta del servidor:', response.data)
            obtenerDatos()
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="my-4 flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                    <PlusSquare className="h-4 w-4 mx-2" />
                    NUEVA CIUDAD
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-white p-5 max-w-min font-bold">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 w-max ">
                        <AlertDialogHeader className="mb-5">
                            <AlertDialogTitle className="text-xl">
                                Nueva ciudad
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="flex justify-between md:gap-4">
                            <label>Nombre:</label>
                            <NeoInput
                                type="text"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-between md:gap-4">
                            <label>Valor del envio:</label>
                            <NeoInput
                                type="text"
                                value={envio}
                                onChange={e => setEnvio(e.target.value)}
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
export function ModalCiudadDelete({ id, obtenerDatos }) {
    let urlDelete = '/ciudadDelete/'
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black  px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-red-500 hover:bg-red-600 ">
                    <Trash2 className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50 md:max-w-min font-bold ">
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-xl'>Eliminar</AlertDialogTitle>
                        <AlertDialogDescription className='text-lg'>
                            ¿Desea eliminar la ciudad?
                        </AlertDialogDescription>
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
export function ModalCiudadUpdate({ id, obtenerDatos }) {
    const [nombre, setNombre] = useState('')
    const [envio, setEnvio] = useState('')

    useEffect(() => {
        if (id) {
            async function obtenerCiudad() {
                try {
                    const data = await fetchCiudad(id)
                    setNombre(data.nombre)
                    setEnvio(data.valor_envio)
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerCiudad()
        }
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nombre', nombre)
            formData.append('valor_envio', envio)
            let urlUpdate = '/api/ciudadUpdate/'
            handleUpdate(id, urlUpdate, formData, obtenerDatos)
            obtenerDatos()
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

                <AlertDialogContent className="bg-white p-5 max-w-min font-bold">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 w-max ">
                        <AlertDialogHeader className="mb-5">
                            <AlertDialogTitle className="text-xl">
                                Nueva ciudad
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="flex justify-between md:gap-4">
                            <label>Nombre:</label>
                            <NeoInput
                                type="text"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-between md:gap-4">
                            <label>Valor del envio:</label>
                            <NeoInput
                                type="text"
                                value={envio}
                                onChange={e => setEnvio(e.target.value)}
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
