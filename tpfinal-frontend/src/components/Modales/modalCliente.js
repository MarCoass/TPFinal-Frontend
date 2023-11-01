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
import handleUpdate from '../../lib/handleUpdate'
import handleDelete from '../../lib/handleDelete'

const fetchCliente = id => {
    return axios.get('/api/administracion/cliente/' + id).then(res => res.data)
}

export function ModalVerCliente({ id }) {
    const [cliente, setCliente] = useState()

    useEffect(() => {
        if (id != null) {
            async function obtenerCliente() {
                try {
                    const data = await fetchCliente(id)
                    setCliente(data)
                    console.log(data)
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
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-rosado-500 hover:bg-rosado-600">
                    <Eye className="h-4 w-4 mx-2" />
                    
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
