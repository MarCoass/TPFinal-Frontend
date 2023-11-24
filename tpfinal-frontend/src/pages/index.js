import Head from 'next/head'
import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Image from 'next/image'
import { CardInicio } from '../components/CardDashboard'
import Link from 'next/link'
import { Mail, Ruler, ShoppingCart } from 'lucide-react'

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

            <div className="bg-rosado-300 min-h-screen font-bold ">
                <div className="p-5 pb-0 bg-violeta-100 flex flex-col-reverse justify-center items-center lg:grid lg:grid-cols-5 gap-4 border-b-2 border-black">
                    <Image
                        className="col-span-2"
                        src="/images/stilletto-negras.png"
                        width={600}
                        height={600}
                        alt="Picture of the author"
                    />
                    <div className="flex flex-col self-center col-span-3">
                        <p className="text-5xl md:text-7xl mb-3">
                            La Solución Rápida para Uñas Fabulosas
                        </p>
                        <p className="text-xl">
                            Uñas postizas reutilizables, a medida o listas para
                            llevar
                        </p>
                    </div>
                </div>
                <div className=" p-5 pb-0 bg-naranja-100 flex flex-col justify-center align-middle md:flex-wrap md:flex-row md:justify-evenly  md:content-stretch gap-4 border-b-2 border-black">
                    <CardInicio
                        img="/images/personalizadas.png"
                        titulo="Uñas personalizadas"
                        texto="Uñas hechas a la medida y con diseño a eleccion.">
                        {user ? (
                            <Link
                                href="/pedidos"
                                className="flex cursor-pointer items-center rounded-[5px] border-2 border-black bg-rosado-600 p-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                                <Ruler className="mr-2"></Ruler>
                                Pedir a medida
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="flex cursor-pointer items-center rounded-[5px] border-2 border-black bg-rosado-600 p-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                                <Ruler className="mr-2"></Ruler>
                                Iniciar sesion y pedir
                            </Link>
                        )}
                    </CardInicio>
                    <CardInicio
                        img="/images/universales.png"
                        titulo="Sets universales"
                        texto="Sets listos para entrega inmediata para todos los tamaños de uñas.">
                        <Link
                            href="/tienda"
                            className="flex cursor-pointer items-center rounded-[5px] border-2 border-black bg-rosado-600 p-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                            <ShoppingCart className="mr-2"></ShoppingCart>
                            Ver tienda
                        </Link>
                    </CardInicio>
                    <CardInicio
                        img="/images/personalizadas.png"
                        titulo="Consulta por whatsapp"
                        texto="Sacate todas tus dudas por whatsapp.">
                        <Link
                            target="blank"
                            href="https://wa.me/542994677550?text=Hola%21%20"
                            className="flex cursor-pointer items-center rounded-[5px] border-2 border-black bg-rosado-600 p-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                            <Mail className="mr-2"></Mail>
                            Enviar mensaje
                        </Link>
                    </CardInicio>
                </div>
            </div>
        </>
    )
}
