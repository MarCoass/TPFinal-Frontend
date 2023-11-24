import { useEffect, useState } from 'react'
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
import { UpdateButton } from '../Button'
import { Pencil, Trash2, CheckCircle, PlusSquare } from 'lucide-react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import { Input } from '@/components/ui/input'
import handleDelete from '../../lib/handleDelete'
import handleUpdate from '../../lib/handleUpdate'
import { SelectEstadosTareas } from '@/components/Formularios/SelectEstados'
import swal from 'sweetalert'

const fetchTarea = id => {
    return axios.get('/api/tarea/' + id).then(res => res.data)
}

export default function ModalTareaUpdate({ id, obtenerDatos }) {
    const [tarea, setTarea] = useState([])
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaVencimiento, setFechaVencimiento] = useState('')
    const [estado, setEstado] = useState('')
    

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('titulo', titulo)
            formData.append('descripcion', descripcion)
            formData.append('fecha_vencimiento', fechaVencimiento)
            formData.append('estado', estado)

            let url = '/api/tareaUpdate/'
            handleUpdate(id, url, formData, obtenerDatos)

            // Maneja la respuesta del servidor si es necesario
            /*  console.log('Respuesta del servidor:', response.data) */
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }

    useEffect(() => {
        async function obtenerTarea() {
            try {
                const data = await fetchTarea(id)
                setTarea(data)
                setTitulo(data.titulo)
                setDescripcion(data.descripcion)
                setEstado(data.estado)
                setFechaVencimiento(data.fecha_vencimiento)
               /*  console.log(data.estado) */
            } catch (error) {
                console.error('Error al obtener tarea:', error)
            }
        }
        obtenerTarea()
    }, [])

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-lila-500 px-5 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                    <Pencil className="h-4 w-4 mx-1"></Pencil>
                    <span className="hidden md:block">Editar</span>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50 border-black border-2 w-min md:min-w-min">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <AlertDialogHeader className="mb-5">
                            <AlertDialogTitle className="text-xl">
                                Crear tarea
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="flex flex-col  md:grid md:grid-cols-2 gap-3">
                            <div className="flex justify-between md:justify-around gap-5">
                                <label htmlFor="titulo">Titulo:</label>
                                <Input
                                    id="titulo"
                                    type="text"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between md:justify-around gap-5">
                                <label htmlFor="descripcion">
                                    Descripcion:
                                </label>
                                <Input
                                    id="descripcion"
                                    type="text"
                                    value={descripcion}
                                    onChange={e =>
                                        setDescripcion(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex justify-between md:justify-around gap-5">
                                <label htmlFor="estado">Estado:</label>
                                <SelectEstadosTareas
                                    id="estado"
                                    value={estado}
                                    onChange={newEstado => setEstado(newEstado)}
                                />
                            </div>
                            <div className="flex justify-between md:justify-around gap-5">
                                <label htmlFor="fecha">
                                    Fecha vencimiento:
                                </label>
                                <Input
                                    id="fecha"
                                    type="date"
                                    value={fechaVencimiento}
                                    onChange={e =>
                                        setFechaVencimiento(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <AlertDialogFooter className="mt-10">
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

export function ModalTareaDelete({ id, obtenerDatos }) {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-red-500 px-5 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                    <Trash2 className="h-4 w-4 mx-1" />
                    <span className="hidden md:block">Eliminar</span>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Desea eliminar la tarea?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleDelete(
                                    id,
                                    '/api/tareaDelete/',
                                    obtenerDatos,
                                )
                            }>
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalTareaTerminar({ id, obtenerDatos }) {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-green-500 px-5 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                    <CheckCircle className="h-4 w-4 mx-1" />
                    <span className="hidden md:block">Terminar</span>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Terminar tarea</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Desea marcar la tarea como terminada?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleUpdate(
                                    id,
                                    '/api/tareaTerminada/',
                                    null,
                                    obtenerDatos,
                                )
                            }>
                            Terminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalCrearTarea({ dashboard = false, obtenerDatos }) {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaVencimiento, setFechaVencimiento] = useState('')
    const [estado, setEstado] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('titulo', titulo)
            formData.append('descripcion', descripcion)
            formData.append('fecha_vencimiento', fechaVencimiento)
            formData.append('estado', estado.id)

            let url = '/api/tareaStore'
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post(url, formData, { headers })
            swal({
                icon: 'success',
                title: 'Tarea agregads correctamente.',
                text: 'Se creo una tarea exitosamente.',
                button: {
                    text: 'Cerrar',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
            obtenerDatos()
        } catch (error) {
            console.log('Error al crear la tarea: ', error)
            swal({
                icon: 'error',
                title: 'Error al crear una nueva tarea.',
                text: 'Ocurrio un error al cargar la tarea.',
                button: {
                    text: 'Cerrar',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
        }
    }

    return (
        <>
            <AlertDialog>
                {dashboard ? (
                    <AlertDialogTrigger className="flex align-middle gap-2 ">
                        <p>Nueva tarea</p>
                        <PlusSquare className="" />
                    </AlertDialogTrigger>
                ) : (
                    <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                        <PlusSquare className="h-4 w-4 mx-2" />
                        NUEVA TAREA
                    </AlertDialogTrigger>
                )}
                <AlertDialogContent className="bg-rosado-50">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <AlertDialogHeader className="mb-5">
                            <AlertDialogTitle className="text-xl">
                                Crear tarea
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex justify-around gap-5">
                                <label htmlFor="titulo">Titulo:</label>
                                <Input
                                    id="titulo"
                                    type="text"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-around gap-5">
                                <label htmlFor="descripcion">
                                    Descripcion:
                                </label>
                                <Input
                                    id="descripcion"
                                    type="text"
                                    value={descripcion}
                                    onChange={e =>
                                        setDescripcion(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex justify-around gap-5">
                                <label htmlFor="estado">Estado:</label>
                                <SelectEstadosTareas
                                    id="estado"
                                    value={estado}
                                    onChange={newEstado => setEstado(newEstado)}
                                />
                            </div>
                            <div className="flex justify-around gap-5">
                                <label htmlFor="fecha">
                                    Fecha vencimiento:
                                </label>
                                <Input
                                    id="fecha"
                                    type="date"
                                    value={fechaVencimiento}
                                    onChange={e =>
                                        setFechaVencimiento(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <AlertDialogFooter className="mt-10">
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
