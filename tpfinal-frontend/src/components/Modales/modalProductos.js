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
import { useState } from 'react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import Input from '@/components/Input'

const fetchProducto = id => {
    return axios.get('/administracion/producto/' + id).then(res => res.data)
}

export function ModalStockProductos({ idProducto, stockViejo }) {
    const [stock, setStock] = useState(stockViejo)
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('stock', stock)
            let url = '/administracion/actualizarStockProducto/' + idProducto
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }
            const response = await axios.post(url, formData, { headers })
            console.log(response.data)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }
    return  <>
    <AlertDialog>
        <AlertDialogTrigger className="p-1 flex bg-violeta-300 hover:bg-violeta-500 rounded font-semibold text-white">
            <Pencil className="h-4 w-4 mx-2" />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-rosado-50">
            <form onSubmit={handleSubmit}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Modificar stock
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>
                            Modificar el stock
                        </p>
                        <input
                            type="hidden"
                            id="id_producto"
                            value={idProducto}
                        />
                        <label htmlFor="name">Stock:</label>
                        <input
                            type="number"
                            id="stock"
                            value={stock}
                            onChange={e => setStock(e.target.value)}
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction type="submit">
                        Modificar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </form>
        </AlertDialogContent>
    </AlertDialog>
</>
}
