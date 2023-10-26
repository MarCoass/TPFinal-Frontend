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
import { Pencil, Trash2, Eye } from 'lucide-react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import { Input } from '@/components/ui/input'
import handleDelete from '../../lib/handleDelete'
import { columns } from '../../pages/administracion/categorias/insumos/columnsCategoriaInsumos'
import Tabla from '../Tablas/data-table'

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

export function ModalCategoriaInsumoUpdate({ id }) {
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
            // Maneja la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="items-center p-1 pr-3 flex bg-violeta-500 hover:bg-violeta-600 rounded text-white">
                    <Pencil className="h-4 w-4 mx-2"></Pencil>Editar
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white border border-gray-200 ">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Editar categoria</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col">
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

export function ModalCategoriaInsumoDelete({ id }) {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="items-center p-1 pr-3 flex bg-red-500 hover:bg-red-600 rounded text-white">
                    <Trash2 className="h-4 w-4 mx-2" />
                    Eliminar
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p>¿Desea eliminar la categoria?</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleDelete(
                                    id,
                                    '/api/administracion/categoriasInsumosDelete/',
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

export function ModalCategoriaInsumoStore({}) {
    const [nombre, setNombre] = useState()

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
                '/api/administracion/categoriasInsumosStore/',
                formData,
                { headers },
            )
            // Maneja la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="items-center p-1 pr-3 flex bg-violeta-500 hover:bg-violeta-600 rounded text-white">
                    NUEVA CATEGORIA
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white border border-gray-200 ">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Nueva categoria</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col">
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
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
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
        async function obtenerCategorias() {
            const data = await fetchCategorias()
            setCategorias(data)
            /* console.log(data) */
        }
        obtenerCategorias()
    }, [])
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="items-center p-1 pr-3 flex bg-rosado-500 hover:bg-rosado-600 rounded text-white">
                    <Eye className="h-4 w-4 mx-2" />
                    Ver categorias
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Categorias de insumos</AlertDialogTitle>
                        <ModalCategoriaInsumoStore></ModalCategoriaInsumoStore>
                        {categorias ? (
                            <Tabla columns={columns} data={categorias} />
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
