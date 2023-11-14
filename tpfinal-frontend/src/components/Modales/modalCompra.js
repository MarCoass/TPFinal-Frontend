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
import SelectCiudad from '../Formularios/selectCiudad'
import SelectMedioPago from '../Formularios/SelectMedioPago'
import Button from '@/components/Button';
import Input from '@/components/Input'
import { NeoButton } from '../Button'

export function ModalCompra({ infoCarrito, precioTotal }) {
    const [precio, setPrecio] = useState()
    const [ciudadEntrega, setCiudadEntrega] = useState('Cipolletti')
    const [medioPago, setMedioPago] = useState('Mercado Pago')

    useEffect(() => {
        setPrecio(precioTotal)
      }, [precioTotal])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('ciudad_entrega', ciudadEntrega)
            formData.append('medio_pago', medioPago)

            // const headers = {
            //     'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            //     Accept: 'application/json',
            // }

            // const response = await axios.post('/api/precioStore', formData, {
            //     headers,
            // })
            console.log('Respuesta del servidor:', response.data)
            handleBuy()
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }

    const handleBuy = async () => {
        console.log(infoCarrito.id_productos)
        try {
            const response = await axios.get(`/api/verificar-stock/${JSON.stringify(infoCarrito.id_productos)}`);
            console.log(response.data)
            if (response.data && response.data.stock) {
                // Si hay suficiente stock, procede con la compra
                const respuesta = await axios.get('/api/comprar');
                if (respuesta) {
                    console.log(respuesta.data)
                }
                alert('hay stock beibi');
            } else {
                // No hay suficiente stock para algunos productos
                alert('No hay suficiente stock para algunos productos en su carrito.', response.data.data);
            }
        } catch (error) {
            console.error('Error al verificar el stock:', error);
            // Manejo de errores
        }
    };

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="flex cursor-pointer  items-center rounded-md border-2 border-black bg-rosado-500 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none disabled:bg-rosado-200 disabled:shadow-none disabled:translate-y-[3px] disabled:translate-x-[3px] ">
                    Comprar
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 ">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>
                                Comprar productos
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="flex justify-between">
                            Total: ${precio}
                        </div>
                        <div className="flex justify-between">
                            <SelectCiudad
                                value={ciudadEntrega}
                                onChange={newCiudad =>
                                    setCiudadEntrega(newCiudad)
                                }></SelectCiudad>
                        </div>
                        <div className="flex justify-between">
                            <SelectMedioPago
                                value={medioPago}
                                onChange={newmedioPago =>
                                    setMedioPago(newmedioPago)
                                }></SelectMedioPago>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction type="submit">
                                Realizar compra
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}