import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogAction
} from '@/components/ui/alert-dialog'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import Input from '@/components/Input'
import handleUpdate from '../../lib/handleUpdate'
import handleDelete from '../../lib/handleDelete'

const fetchCliente = id => {
    return axios.get('/api/administracion/cliente/' + id).then(res => res.data)
}

export function ModalVerCliente({ id }) {
    const [cliente, setCliente] = useState()

    useEffect(() => {
        if (id != null) {
            async function obtenerCliente() {
                try {
                    const data = await fetchCliente(id)
                    setCliente(data)
                    /*  console.log(data) */
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerCliente()
        }
    }, [])

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="border-b-2 border-black  p-1.5 text-sm font-bold  transition-all bg-lila-100 hover:bg-lila-300">
                    {cliente && (
                        <>
                            {cliente.nombre} {cliente.apellido}
                        </>
                    )}
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Informacion del cliente
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    {cliente && (
                        <>
                            <p>Nombre: {cliente.nombre}</p>
                            <p>Apellido: {cliente.apellido}</p>
                            <p>Email: {cliente.email}</p>
                            <p>Numero de telefono: {cliente.num_telefono}</p>
                            <p>Observacion: {cliente.observacion}</p>
                        </>
                    )}

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalComentarCliente({ id }) {
    const [cliente, setCliente] = useState()
    const [comentario, setComentario] = useState('')

    useEffect(() => {
        if (id != null) {
            async function obtenerCliente() {
                try {
                    const data = await fetchCliente(id)
                    setCliente(data)
                    setComentario(data.observacion)
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerCliente()
        }
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('observacion', comentario)
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post(
                '/api/administracion/clienteComentar/' + id,
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
                <AlertDialogTrigger className="border-b-2 border-black  p-1.5 text-sm font-bold  transition-all bg-lila-100 hover:bg-lila-300">
                    Editar
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form onSubmit={handleSubmit}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Observaciones sobre{' '}
                                {cliente && (
                                    <>
                                        {cliente.nombre} {cliente.apellido}
                                    </>
                                )}
                            </AlertDialogTitle>
                        </AlertDialogHeader>

                        {cliente && (
                            <>
                                <textarea
                                    className="h-[150px] w-[400px] resize-none rounded-[5px] border-2 border-black p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                                    name="textarea"
                                    id="textarea"
                                    placeholder="Agregar un comentario..."
                                    value={comentario}
                                    onChange={e => {
                                        setComentario(e.target.value)
                                    }}></textarea>
                            </>
                        )}

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cerrar</AlertDialogCancel>
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
