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
import {
    Pencil,
    Trash2,
    PlusSquare,
    Eye,
    DollarSign,
    Minus,
    Plus,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import Input from '@/components/Input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Label from '@/components/ui/label'
import handleUpdate from '../../lib/handleUpdate'
import handleDelete from '../../lib/handleDelete'
import { estadosPedido } from '../../lib/estados'
import { fetchProducto } from '../../lib/producto'
import { NeoInput, NeoInputChico } from '../Input'
import { NeoButtonChico } from '../Button'

const fetchPedido = id => {
    return axios.get('/api/administracion/pedido/' + id).then(res => res.data)
}

export function ModalCambiarEstado({ id }) {
    const [pedido, setPedido] = useState()
    const [estadoActual, setEstadoActual] = useState()
    const [estado, setEstado] = useState()

    useEffect(() => {
        if (id != null) {
            async function obtenerPedido() {
                try {
                    const data = await fetchPedido(id)
                    setPedido(data)
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerPedido()
        }
    }, [])

    useEffect(() => {
        if (pedido != null) {
            const estados = estadosPedido()
            const estado = estados.find(estado => estado.id === pedido.estado)
            setEstadoActual(estado)
        }
    }, [pedido])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('estado', estado)
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post(
                '/api/administracion/pedido/cambiarEstado/' + id,
                formData,
                {
                    headers,
                },
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
                <AlertDialogTrigger className="p-1 pr-3 flex bg-rosado-500 hover:bg-rosado-600 rounded text-white">
                    <Pencil className="h-4 w-4 mx-2" />
                    Editar
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 ">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Estado del pedido
                            </AlertDialogTitle>
                        </AlertDialogHeader>

                        {pedido && estadoActual && (
                            <>
                                {estadosPedido().map(estado => {
                                    return (
                                        <div
                                            className="font-bold"
                                            key={estado.id}>
                                            <input
                                                type="radio"
                                                value={estado.id}
                                                id={estado.id}
                                                onClick={e => {
                                                    setEstado(e.target.value)
                                                }}
                                            />

                                            <label htmlFor={estado.id}>
                                                {estado.nombre}
                                            </label>
                                        </div>
                                    )
                                })}
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

export function ModalCotizar({ id }) {
    const [pedido, setPedido] = useState()
    const [precio, setPrecio] = useState()
    const [fecha, setFecha] = useState()
    const [estado, setEstado] = useState()

    useEffect(() => {
        if (id != null) {
            async function obtenerPedido() {
                try {
                    const data = await fetchPedido(id)
                    setPedido(data)
                    console.log(pedido)
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerPedido()
        }
    }, [])

    const [producto, setProducto] = useState()
    useEffect(() => {
        if (pedido != null) {
            async function obtenerProducto() {
                try {
                    const data = await fetchProducto(pedido.id_producto)
                    setProducto(data)
                    /*  console.log(producto) */
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerProducto()
        }
    }, [pedido])

    const handleSubmit = async e => {
        e.preventDefault()
        /*  console.log(ciudad.target.value) */

        // Crea un objeto con los datos del formulario
        const formData = new FormData()
        formData.append('precio', precio)
        formData.append('fecha_entrega', fecha)
        formData.append('estado', 1)

        let url = '/api/administracion/pedido/cambiarEstado/'
        handleUpdate(id, url, formData)
    }

    const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL + '/storage/'
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-rosado-500 hover:bg-rosado-600">
                    <Eye className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>
                <AlertDialogContent className=" items-center justify-center rounded-md border-2 border-black bg-lila-100 p-10 pt-12 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300}">
                    <AlertDialogHeader className="mr-5">
                        <AlertDialogTitle>
                            {producto && <p>{producto.nombre}</p>}
                        </AlertDialogTitle>
                        {producto ? (
                            <div className="grid grid-cols-5 grid-rows-1 gap-4">
                                <div className="col-span-3 row-span-2">
                                    <div className="text-left text-base ">
                                        <p>
                                            Descripcion: {producto.descripcion}
                                        </p>
                                        <p>Ciudad: {producto.ciudad.nombre}</p>

                                        <p>
                                            Precio:{' '}
                                            {producto.precio != 0 ? (
                                                <>${producto.precio}</>
                                            ) : (
                                                <>Sin cotizar</>
                                            )}
                                        </p>
                                    </div>
                                    <div className="">
                                        <img
                                            alt={producto.descripcion}
                                            className=" rounded-[5px] w-60 object-cover border-2 border-black"
                                            src={
                                                urlBase + producto.url_imagen
                                            }></img>
                                    </div>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="border-l-2 border-black px-4 col-span-2 row-span-2 col-start-4">
                                    <div className="my-5 flex flex-col">
                                        <label for="precio">Precio:</label>
                                        <NeoInput
                                            type="number"
                                            value={precio}
                                            onChange={e =>
                                                setPrecio(e.target.value)
                                            }
                                            required
                                            id="precio"
                                        />
                                    </div>
                                    <div className="my-5 flex flex-col">
                                        <label for="fecha">
                                            Fecha de entrega:
                                        </label>
                                        <NeoInput
                                        required
                                            type="date"
                                            value={fecha}
                                            onChange={e =>
                                                setFecha(e.target.value)
                                            }
                                            id="fecha"
                                        />
                                    </div>
                                    <NeoButtonChico type="submit">
                                        Cotizar
                                    </NeoButtonChico>
                                </form>
                            </div>
                        ) : (
                            <p>cargando</p>
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
