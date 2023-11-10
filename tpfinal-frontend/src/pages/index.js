import Head from 'next/head'
import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { Mail, Ruler, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { ImagenesIndex } from '../components/ImagenesIndex'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'

const fetchParametros = () => {
    return axios.get('/api/parametros').then(res => res.data)
}

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })
    const [parametros, setParametros] = useState()
    const [parametrosArray, setParametrosArray] = useState()

    useEffect(() => {
        async function obtenerParametros() {
            try {
                const data = await fetchParametros()
                setParametros(data)
            } catch (error) {
                console.error('Error al obtener parametros:', error)
            }
        }
        obtenerParametros()
    }, [])

    useEffect(() => {
        if (parametros != null) {
            let array = {}
            parametros.forEach(parametro => {
                array[parametro.nombre] = parametro.valor
            })
            setParametrosArray(array)
        }
    }, [parametros])

    return (
        <>
            <Head>
                <title>Mar Nails</title>
            </Head>

            <Navigation user={user} />

            <div className="bg-rosado-300 min-h-screen  font-bold">
                <div className="grid grid-cols-2 grid-rows-1 h-[400px] border-b-2 border-black">
                    <div className="bg-rosado-500 border-black border-r-2 p-20">
                        <div className="">
                            <p className="text-5xl">
                                La Solución Rápida para Uñas Fabulosas
                            </p>
                            <p className="text-xl">
                                Uñas postizas reutilizables, a medida o listas
                                para llevar
                            </p>
                        </div>
                        <div className="grid grid-cols-3 mt-5 gap-10">
                            <Link
                                href="/tienda"
                                className="flex cursor-pointer items-center rounded-[5px] border-2 border-black bg-violeta-300 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                                <ShoppingCart className="mr-2"></ShoppingCart>{' '}
                                Ver tienda
                            </Link>
                            <Link
                                href="/pedidos"
                                className="flex cursor-pointer items-center rounded-[5px] border-2 border-black bg-naranja-500 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                                <Ruler className="mr-2"></Ruler>
                                Pedir a medida
                            </Link>
                            <Link
                                href="https://wa.me/542994677550?text=Hola%21%20"
                                className="flex cursor-pointer items-center rounded-[5px] border-2 border-black bg-lila-500 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                                <Mail className="mr-2"> </Mail> Contacto
                            </Link>
                        </div>
                    </div>
                    <div className="bg-naranja-300 flex align-middle  justify-center">
                        <ImagenesIndex></ImagenesIndex>
                    </div>
                </div>
                {parametrosArray ? (
                    <div className="grid grid-cols-3 divide-x-2 divide-black border-b-2 border-black h-[400px]">
                        <div className="bg-cremita-500 p-5">
                            <p className="text-xl pb-3">
                                Informacion sobre pedidos
                            </p>

                            <p>
                                Valor de la seña: $
                                {parametrosArray['valor_senia']}
                                <br />
                                Demora para cotizaciones:{' '}
                                {parametrosArray['demora_cotizacion']}
                                <br />
                                Demora para pedidos:{' '}
                                {parametrosArray['demora_trabajo']} <br />
                                <span className="font-normal text-violeta-500">
                                    La demora es un aproximado
                                </span>
                            </p>
                            <div className="border-2 border-black p-2 rounded-[5px] my-4 bg-rose-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                {!parametrosArray['valor_senia'] ? (
                                    <p>Tenemos los pedidos abiertos!</p>
                                ) : (
                                    <p>
                                        Por el momento tenemos los pedidos
                                        cerrados, pero podes ver nuestra{' '}
                                        <Link
                                            href="/tienda"
                                            className="text-violeta-500 border-b-2 border-violeta-500 hover:text-rosado-600 hover:border-rosado-500">
                                            {' '}
                                            tienda
                                        </Link>{' '}
                                        para conseguir sets en stock.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="bg-lila-500 p-5">
                            <p className="text-xl">Aplicacion y cuidados</p>
                        </div>
                        <div className="bg-violeta-200 p-5">
                            <p className="text-xl">Redes</p>
                        </div>
                    </div>
                ) : (
                    <p>Cargando....</p>
                )}
            </div>
        </>
    )
}
