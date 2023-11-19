import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppLayout from "@/components/Layouts/AppLayout";
import axios from '@/lib/axios'
import CustomSpinner from '@/components/CustomSpinner'
import CarritoGrid from '@/components/Grids/CarritoGrid';
import Button from '@/components/Button';
import { ModalCompra } from '../../components/Modales/modalCompra';
import swal from 'sweetalert'

const fetchCarrito = (carrito) => {
    return axios
        .get(
            `carrito`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

export default function Carrito() {
    const [infoCarrito, setCarrito] = useState(null)
    const [precioTotal, setPrecioTotal] = useState();
    const router = useRouter()
    const { carrito } = router.query


    const obtenerPrecioTotal = (datoPrecio) => {
        if (!precioTotal || precioTotal != datoPrecio) {
            setPrecioTotal(datoPrecio);
        }
    }

    useEffect(() => {
        if (infoCarrito === null || !infoCarrito) {
            obtenerDatos();
        }
    }, [carrito])

    const obtenerDatos = async () => {
        console.log('obtenerDatos')
        try {
            const dataCarrito = await fetchCarrito(carrito);
            setCarrito(dataCarrito);
        } catch (error) {
            console.error('Hubo un problema obteniendo los datos: ', error);
            swal({
                icon: 'error',
                title: 'Hubo un problema eliminando el producto, inténtelo otra vez.',
                button: {
                    text: 'X',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
        }
    }

    const handleBuy = async () => {
        console.log(infoCarrito.id_productos)
        try {
            const response = await axios.get(`/api/verificar-stock/${'carrito'}`);
            if (response.data && response.data.stock) {
                console.log(response.data)
                // Si hay suficiente stock, procede con la compra
                const respuesta = await axios.get('/api/comprar');
                if(respuesta){
                    swal({
                        icon: 'success',
                        title: 'Gracias por tu compra.',
                        button: {
                            text: 'X',
                            className:
                                'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                        },
                    })
                }
            } else {
                // No hay suficiente stock para algunos productos
                console.log(response.data)
                let cadenaTexto = 'No hay stock suficiente del/los siguientes productos:\n'
                response.data.data.forEach(producto => {
                    cadenaTexto = cadenaTexto + producto.nombre + ', stock disponible:' + producto.stock + '\n'
                });
                swal({
                    icon: 'error',
                    title: 'No hay stock suficiente.',
                    text: cadenaTexto,
                    button: {
                        text: 'X',
                        className:
                            'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                    },
                })
                return
            }
        } catch (error) {
            console.error('Error al verificar el stock:', error);
            swal({
                icon: 'error',
                title: 'Hubo un error, vuelva a intentarlo.',
                button: {
                    text: 'X',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
            return
            // Manejo de errores
        }
        obtenerDatos()
    };


    return (
        <AppLayout>
            <div className='mx-6'>
                {infoCarrito != null ? (
                    <div>
                        <CarritoGrid obtenerDatos={obtenerDatos} data={infoCarrito} obtenerPrecioTotal={obtenerPrecioTotal} />
                    </div>
                ) : (
                    <CustomSpinner
                        mensaje={'Cargando productos...'}>
                    </CustomSpinner>
                )}
                <div className="mb-6 mr-6 flex justify-end">
                    {infoCarrito != null && infoCarrito.id_productos.length>0?
                    (
                        <ModalCompra infoCarrito={infoCarrito} precioTotal={precioTotal} handleBuy={handleBuy}></ModalCompra>
                    ):(
                        <Button disabled>Comprar</Button>
                    )}

                </div>

            </div>

        </AppLayout>
    )
}

