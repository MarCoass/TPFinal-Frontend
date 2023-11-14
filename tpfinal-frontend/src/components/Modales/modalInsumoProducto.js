import { PlusSquare, Trash2, Pencil } from 'lucide-react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import ListadoInsumos from '../Formularios/listado'
import { ListboxWrapper } from '../Formularios/listboxWrapper'

const fetchInsumos = () => {
    return axios.get('/api/administracion/insumos').then(res => res.data)
}

export function ModalAgregarInsumo({ idProducto }) {
    const [cantidadesInsumos, setCantidadesInsumos] = useState({})
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            const cantidadesInsumosJSON = JSON.stringify(cantidadesInsumos)
            formData.append('cantidadesInsumos', cantidadesInsumosJSON)
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post(
                '/api/administracion/agregarInsumos/' + idProducto.idProducto,
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

    // Función para manejar cambios en las cantidades de los insumos
    const handleCantidadInsumosChange = nuevasCantidades => {
        // Combina las nuevas cantidades con el estado existente
        setCantidadesInsumos(prevCantidades => ({
            ...prevCantidades,
            ...nuevasCantidades,
        }))
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="items-center p-1 pr-3 flex bg-rosado-500 hover:violeta-red-600 rounded text-white">
                    <PlusSquare className="h-4 w-4 mx-2" />
                    Agregar insumo
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 ">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>
                                Agregar insumos al producto
                            </AlertDialogTitle>
                            <ListadoInsumos
                                onCantidadInsumosChange={
                                    handleCantidadInsumosChange
                                }
                            />
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
