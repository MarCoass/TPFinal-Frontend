import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Eye, Pencil } from 'lucide-react'
import { columns } from '../../pages/administracion/pedidos/columns'
import Tabla from '../Tablas/data-table'
const { default: getCookie } = require('@/lib/cookies')
import CustomSpinner from '@/components/CustomSpinner'

const fetchCliente = id => {
    return axios.get('/api/administracion/cliente/' + id).then(res => res.data)
}
const fetchPedidos = id => {
    return axios
        .get('/api/administracion/clientePedidos/' + id)
        .then(res => res.data)
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

export function ModalComentarCliente({ id, editar, obtenerDatos }) {
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

            if (response) {
                /*  console.log('Respuesta del servidor:', response.data) */
                obtenerDatos()
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="flex flex-row rounded-full border-2 border-black  lg:px-3 lg:py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-rosado-500 hover:bg-rosado-600 ">
                    <Pencil className="m-1.5 lg:m-0 lg:w-4 lg:mx-2"></Pencil>
                    <span className="hidden lg:block">
                        {editar ? <p>Editar</p> : <p>Comentar</p>}{' '}
                    </span>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50 max-w-min">
                    <form onSubmit={handleSubmit}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Observaciones sobre
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
                                    className="h-[150px] md:w-[400px]  resize-none rounded-[5px] border-2 border-black p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
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

export function ModalVerClienteCompleto({ id, nombre }) {
    const [pedidos, setPedidos] = useState()

    useEffect(() => {
        if ((id != null && pedidos === null) || !pedidos) {
            obtenerDatos()
        }
    }, [pedidos])

    const obtenerDatos = async () => {
        try {
            const data = await fetchPedidos(id)
            setPedidos(data)
        } catch (error) {
            console.error('Hubo un problema obteniendo los datos: ', error)
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="flex flex-row rounded-full border-2 border-black  lg:px-3 lg:py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-naranja-500 hover:bg-naranja-600 ">
                    <Eye className="m-1.5 lg:m-0 lg:w-4 lg:mx-2"></Eye>{' '}
                    <p className="hidden lg:block">Ver pedidos</p>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50 className='overscroll-contain overflow-auto'">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Pedidos de {nombre}</AlertDialogTitle>
                    </AlertDialogHeader>

                    {pedidos ? (
                        <Tabla
                            columns={columns}
                            data={pedidos}
                            pageSize={5}
                            obtenerDatos={obtenerDatos}
                        />
                    ) : (
                        <CustomSpinner
                            mensaje={'Cargando productos...'}></CustomSpinner>
                    )}

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
