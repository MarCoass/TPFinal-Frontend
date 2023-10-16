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
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')

export default function ModalStockInsumo({
    idInsumo,
    idProducto,
    cantidadOld,
}) {
    const [cantidad, setCantidad] = useState(cantidadOld)
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('cantidad', cantidad)
            formData.append('id_insumo', idInsumo)
            formData.append('id_producto', idProducto)

            let url = '/modificarCantidad'
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }
            const response = await axios.post(url, formData, { headers })
           /*  console.log(response) */
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="p-1 pr-3 flex bg-violeta-300 hover:bg-violeta-500 rounded font-semibold text-white">
                    <Pencil className="h-4 w-4 mx-2" />
                    Editar
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form onSubmit={handleSubmit}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Modificar cantidad</AlertDialogTitle>
                            <AlertDialogDescription>
                            <p>Modifique la cantidad del insumo usada para un producto</p>
                                <input
                                    type="hidden"
                                    id="id_insumo"
                                    value={idInsumo}
                                />
                                <input
                                    type="hidden"
                                    id="id_producto"
                                    value={idProducto}
                                />
                                <label htmlFor="name">Cantidad:</label>
                                <input
                                    type="number"
                                    id="cantidad"
                                    value={cantidad}
                                    onChange={e => setCantidad(e.target.value)}
                                />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction type='submit'>Modificar</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
