import { PlusSquare, Trash2, Pencil } from 'lucide-react'
import handleDelete from '../../lib/handleDelete'
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
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import Input from '@/components/Input'
import SelectProveedores from '../Formularios/SelectProveedores'
import ListadoInsumos from '../Formularios/listado'
import { ListboxWrapper } from '../Formularios/listboxWrapper'

const fetchInsumos = () => {
    return axios.get('/api/administracion/insumos').then(res => res.data)
}

export function ModalAgregarInsumo() {

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
           
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

           /*  const response = await axios.post('/api/precioStore', formData, {
                headers,
            }) */
            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
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
                            <AlertDialogTitle>Agregar insumos al producto
                            </AlertDialogTitle>
                           <ListadoInsumos></ListadoInsumos>
                            
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
