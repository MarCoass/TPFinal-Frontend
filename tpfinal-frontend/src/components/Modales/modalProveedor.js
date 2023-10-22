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
import { Pencil, Trash2, PlusSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import Input from '@/components/Input'

const fetchProveedor = id => {
    return axios.get('/proveedor/' + id).then(res => res.data)
}

export function ModalProveedorStore() {
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [anotacion, setAnotacion] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nombre', nombre)
            formData.append('direccion', direccion)
            formData.append('anotacion', anotacion)
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post('/api/proveedorStore', formData, {
                headers,
            })
            // Maneja la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="items-center  p-1 pr-3 flex bg-violeta-500 hover:bg-violeta-600 rounded text-white">
                    <PlusSquare className="h-4 w-4 mx-2" />
                    NUEVO PROVEEDOR
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-white p-12">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 ">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>Nuevo proveedor</AlertDialogTitle>

                            <div className="flex justify-between">
                                <label>Nombre:</label>
                                <Input
                                    type="text"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between">
                                <label>Direccion:</label>
                                <Input
                                    type="text"
                                    value={direccion}
                                    onChange={e => setDireccion(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between">
                                <label>Anotacion:</label>
                                <Input
                                    type="text"
                                    value={anotacion}
                                    onChange={e => setAnotacion(e.target.value)}
                                />
                            </div>
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
