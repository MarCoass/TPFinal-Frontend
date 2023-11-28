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
import { Pencil, Trash2, List } from 'lucide-react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import { Input } from '@/components/ui/input'
import handleDelete from '../../lib/handleDelete'
import { columns } from '../../pages/administracion/categorias/insumos/columnsCategoriaInsumos'
import Tabla from '../Tablas/data-table'
import swal from 'sweetalert'

const fetchCategoria = id => {
    return axios
        .get('/api/administracion/categoriaInsumo/' + id)
        .then(res => res.data)
}
const fetchCategorias = async () => {
    try {
        const response = await axios.get(
            '/api/administracion/categoriasInsumos',
        )
        return response.data
    } catch (error) {
        console.error('Error al obtener categorias:', error)
        return []
    }
}

export function ModalCategoriaInsumoUpdate({ id, obtenerDatos }) {
    const [nombre, setNombre] = useState()

    useEffect(() => {
        async function obtenerCategoria() {
            try {
                const data = await fetchCategoria(id)
                setNombre(data.nombre)
                //console.log(data)
            } catch (error) {
                console.error('Error al obtener categoria:', error)
            }
        }
        obtenerCategoria()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('nombre', nombre)

            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post(
                '/api/administracion/categoriasInsumosUpdate/' + id,
                formData,
                { headers },
            )
            if (response.data.exito) {
                swal({
                    icon: 'success',
                    title: 'Categoria editada correctamente.',
                    text: response.data.message,
                    button: {
                        text: 'Cerrar',
                        className:
                            'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                    },
                })
                obtenerDatos()
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black bg-lila-500 hover:bg-lila-600 px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none ">
                    <Pencil className="h-4 w-4 mx-2"></Pencil>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white border-2 border-black max-w-min">
                    <AlertDialogHeader className="mb-5">
                        <AlertDialogTitle className="text-lg">
                            Editar categoria
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col font-bold">
                            <div className="flex justify-around  gap-4">
                                <label htmlFor="nombre" className="my-auto">
                                    Nombre:
                                </label>
                                <Input
                                    id="nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>
                        </form>
                    </AlertDialogDescription>

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

export function ModalCategoriaInsumoDelete({ id, obtenerDatos }) {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black  px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-red-500 hover:bg-red-600 ">
                    <Trash2 className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50  border-black max-w-min">
                    <AlertDialogHeader >
                        <AlertDialogTitle className="text-xl">
                            Eliminar
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <p className="font-bold">¿Desea eliminar la categoria?</p>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleDelete(
                                    id,
                                    '/api/administracion/categoriasInsumosDelete/',
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

export function ModalCategoriaInsumoStore({ obtenerDatos }) {
    const [nombre, setNombre] = useState()
    const [error, setError] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        if (nombre) {
            try {
                const formData = new FormData()
                formData.append('nombre', nombre)

                const headers = {
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                    Accept: 'application/json',
                }

                const response = await axios.post(
                    '/api/administracion/categoriasInsumosStore/',
                    formData,
                    { headers },
                )
                if (response.data.exito) {
                    swal({
                        icon: 'success',
                        title: 'Categoria creada correctamente.',
                        text: response.data.message,
                        button: {
                            text: 'Cerrar',
                            className:
                                'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                        },
                    })
                    obtenerDatos()
                    setNombre('')
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error)
            }
        } else {
            // Si el campo está vacío, muestra el mensaje de error
            setError('Este campo es requerido')
        }
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                    NUEVA CATEGORIA
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50 border-black border-2 max-w-min ">
                    <AlertDialogHeader className="mb-5">
                        <AlertDialogTitle className="text-xl">
                            Nueva categoria
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription className="font-bold">
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <div className="flex justify-around gap-4">
                                <label htmlFor="nombre" className="my-auto">
                                    Nombre:
                                </label>
                                <div className="flex flex-col ">
                                    <Input
                                        id="nombre"
                                        type="text"
                                        value={nombre}
                                        onChange={e => {
                                            setNombre(e.target.value)
                                            setError('') // Limpiar el mensaje de error al escribir en el campo
                                        }}
                                        required
                                        placeholder="Nombre de la categoria"
                                    />
                                    {error && (
                                        <span className="font-bold text-red-500">
                                            {error}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </form>
                    </AlertDialogDescription>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit}>
                            Guardar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalCategoriasInsumos() {
    const [categorias, setCategorias] = useState(null)

    useEffect(() => {
        if (categorias === null || !categorias) {
            obtenerDatos()
        }
    }, [categorias])

    const obtenerDatos = async () => {
        try {
            const data = await fetchCategorias()
            setCategorias(data)
        } catch (error) {
            console.error('Hubo un problema obteniendo los datos: ', error)
        }
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                    <List className="h-4 w-4 mx-2" />
                    VER CATEGORIAS
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Categorias de insumos
                        </AlertDialogTitle>
                        <ModalCategoriaInsumoStore
                            obtenerDatos={
                                obtenerDatos
                            }></ModalCategoriaInsumoStore>
                        {categorias ? (
                            <Tabla
                                columns={columns}
                                data={categorias}
                                obtenerDatos={obtenerDatos}
                            />
                        ) : (
                            <p>Cargando datos...</p>
                        )}
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
