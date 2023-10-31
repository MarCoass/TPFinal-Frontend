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
                                <p>Estado actual: {estadoActual.nombre}</p>
                                <RadioGroup defaultValue={estadoActual.id}>
                                    {estadosPedido().map(estado => {
                                        return (
                                            <div
                                                className="flex items-center space-x-2"
                                                key={estado.id}>
                                                <RadioGroupItem
                                                    value={estado.id}
                                                    id={estado.id}
                                                    onClick={e => {
                                                        setEstado(
                                                            e.target.value,
                                                        )
                                                        console.log(estado)
                                                    }}
                                                />

                                                <label htmlFor={estado.id}>
                                                    {estado.nombre}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </RadioGroup>
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
