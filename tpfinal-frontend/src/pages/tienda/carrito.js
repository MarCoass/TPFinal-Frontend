import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppLayout from "@/components/Layouts/AppLayout";
import axios from '@/lib/axios'
import CustomSpinner from '@/components/CustomSpinner'
import CarritoGrid from '@/components/Grids/CarritoGrid';
import Button from '@/components/Button';

const fetchCarrito = (carrito) => {
    return axios
        .get(
            `carrito`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

export default function Carrito() {
    const [infoCarrito, setCarrito] = useState(null)
    const router = useRouter()
    const { carrito } = router.query
    useEffect(() => {
        if (infoCarrito === null || !infoCarrito) {
            obtenerDatos();
        }
        console.log(infoCarrito)
    }, [carrito])

    const obtenerDatos= async ()=>
    {
        console.log('anda')
        try {
            const dataCarrito = await fetchCarrito(carrito);
            console.log(dataCarrito)
            setCarrito(dataCarrito);
        } catch (error) {
            console.error('Hubo un problema obteniendo los datos: ', error);
        }
    }

    const handleBuy = async () => {
        console.log(infoCarrito.id_productos)
        try {
        const response = await axios.get(`/api/verificar-stock/${JSON.stringify(infoCarrito.id_productos)}`); 
           console.log(response.data)
        if (response.data && response.data.stock) {
                // Si hay suficiente stock, procede con la compra
               const respuesta= await axios.get('/api/comprar');
                if(respuesta){
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
        <AppLayout>
            <div className='mx-6'>
                {infoCarrito != null ? (
                    <div>
                        <CarritoGrid obtenerDatos={obtenerDatos} data={infoCarrito} />
                    </div>
                ) : (
                    <CustomSpinner
                        mensaje={'Cargando productos...'}>
                    </CustomSpinner>
                )}
                <div className="mb-6 mr-6 flex justify-end">
                    <Button onClick={() => handleBuy()}>Comprar</Button>
                </div>

            </div>

        </AppLayout>
    )
}

