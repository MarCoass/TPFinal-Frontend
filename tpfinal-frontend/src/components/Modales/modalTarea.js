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

const fetchTarea = id => {
    return axios.get('/api/tarea/' + id).then(res => res.data)
}

export default function ModalTareaUpdate({ id }) {
    const [tarea, setTarea] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaVencimiento, setFechaVencimiento] = useState('')
    const [estado, setEstado] = useState('')

    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('titulo', titulo)
            formData.append('descripcion', descripcion)
            formData.append('fecha_vencimiento', fechaVencimiento)
            formData.append('estado', estado)

            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post(
                '/api/tareaUpdate/' + tarea.id,
                formData,
                { headers },
            )
            // Maneja la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
        setIsOpen(false)
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
                //console.log(data)
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
                <AlertDialogContent className="bg-white border border-gray-200 ">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Editar tarea</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col">
                                <div className="flex justify-around">
                                    <label>Titulo:</label>
                                    <Input
                                        type="text"
                                        value={titulo}
                                        onChange={e =>
                                            setTitulo(e.target.value)
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
                                    <label>Estado:</label>
                                    <Input
                                        type="text"
                                        value={estado}
                                        onChange={e =>
                                            setEstado(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex justify-around">
                                    <label>Fecha vencimiento:</label>
                                    <Input
                                        id="fecha"
                                        type="date"
                                        value={fechaVencimiento}
                                        onChange={e =>
                                            setFechaVencimiento(e.target.value)
                                        }
                                    />
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit}>
                            Modificar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalTareaDelete({ id }) {
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
                            <p>¿Desea eliminar la tarea?</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleDelete(id, '/api/tareaDelete/')
                            }>
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalTareaTerminar({ id }) {
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
                            <p>¿Desea marcar la tarea como terminada?</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleUpdate(id, '/api/tareaTerminada/')
                            }>
                            Terminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalCrearTarea({ dashboard = false }) {
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
            //console.log(response)
        } catch (error) {
            console.log('Error al crear la tarea: ', error)
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
                            <AlertDialogTitle className='text-xl'>Crear tarea</AlertDialogTitle>
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
