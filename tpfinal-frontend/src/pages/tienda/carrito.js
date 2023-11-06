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

export default function Catalogo() {
    const [infoCarrito, setCarrito] = useState(null)
    const router = useRouter()
    const { carrito } = router.query
    useEffect(() => {
        if (infoCarrito === null || !infoCarrito) {
            async function obtenerDatos() {
                try {
                    const dataCarrito = await fetchCarrito(carrito);
                    console.log(dataCarrito)
                    setCarrito(dataCarrito);
                } catch (error) {
                    console.error('Hubo un problema obteniendo los datos: ', error);
                }
            }
            obtenerDatos();
        }
        console.log(infoCarrito)
    }, [carrito])


    return (
        <AppLayout>
            <div className='mx-6'>
                {infoCarrito ? (
                    <div>
                        <CarritoGrid data={infoCarrito} />
                    </div>
                ) : (
                    <div>No se encontraron productos</div>
                )}
                <div className="mb-6 mr-6 flex justify-end">
                    <Button>Comprar</Button>
                </div>

            </div>

        </AppLayout>
    )
}

