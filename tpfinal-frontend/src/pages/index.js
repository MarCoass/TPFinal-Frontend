import Head from 'next/head'
import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Image from 'next/image'
import { CardInicio, CardTrabajos } from '../components/CardDashboard'
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
                <div className="py-10   bg-naranja-100 flex flex-col justify-center align-middle md:flex-wrap md:flex-row md:justify-evenly  md:content-stretch gap-4 border-b-2 border-black">
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
                <div className="pl-5 pt-10 bg-lila-100 flex flex-col justify-center align-middle md:grid md:grid-cols-3 gap-4 border-b-2 border-black">
                    <div className="pr-5 col-span-2 flex flex-col self-center m-10">
                        <p className="text-3xl md:text-5xl mb-3">
                            Informacion sobre las press on
                        </p>
                        <p className="text-lg">
                            Son uñas postizas hechas con tips de gel, los mismos
                            que se usan para las SoftGel.
                            <br />
                            Reutilizables, cuidandolas se pueden reutilizar las
                            veces que quieras.
                            <br />
                            Uñas listas en poco tiempo, la aplicacion es facil y
                            rapida, lo haces vos misma desde tu casa.
                            <br />
                            Diferente duracion, podes usar pegamento liquido o
                            stickers doble faz segun la duracion necesaria.
                        </p>
                    </div>
                    <Image
                        className="col-start-3"
                        src="/images/rojas.png"
                        width={500}
                        height={500}
                        alt="Press on rojas con efecto sangre"
                    />
                </div>
                <div className=" border-b-2 border-black lg:grid lg:grid-cols-3 lg:divide-x-2 lg:divide-y-0 divide-black divide-y-2">
                    <div className="py-10 px-5  bg-violeta-100">
                        <p className="text-4xl">¿Como pegarlas?</p>
                        <div className="flex flex-col gap-3 py-4">
                            <ul>
                                Preparar la uña
                                <li className="pl-5">
                                    Repujar las cuticulas con el palito de
                                    naranjo.
                                </li>
                                <li className="pl-5">
                                    Limar suavemente la superficie de la uña.
                                </li>
                                <li className="pl-5">
                                    Limpiar el polvo con un algodon y alcohol.
                                </li>
                            </ul>
                            <ul>
                                Con pegamento liquido:
                                <li className="pl-5">
                                    Colocar una gota de pegamento en el tip o en
                                    la uña.
                                </li>
                                <li className="pl-5">
                                    Apoyar el tip apoyando desde la cuticula
                                    hasta la punta.
                                </li>
                                <li className="pl-5">
                                    Presionar unos segundos.
                                </li>
                            </ul>
                            <ul>
                                Con stickers doble faz:
                                <li className="pl-5">
                                    Colocar el sticker del tamaño adecuado en el
                                    tip.
                                </li>
                                <li className="pl-5">
                                    Quitar el plastico y colocar el tip en la
                                    uña.
                                </li>
                                <li className="pl-5">
                                    Presionar unos segundos.
                                </li>
                            </ul>
                        </div>

                        <p className="my-4">
                            Consejo: Deja los pulgares para el final ya que son
                            los dedos que mas se usan.
                        </p>
                    </div>
                    <div className="py-10 px-5 bg-naranja-200">
                        <p className="text-4xl">¿Como sacarlas?</p>
                        <ul>
                            <li>
                                Sumergir las uñas entre 10 y 15 minutos en agua
                                tibia/caliente.
                            </li>
                            <li>
                                Con el palito de naranjo empujar desde la zona
                                de cuticulas.
                            </li>
                            <li>
                                Limpia los restos de pegamento con quitaesmalte
                                o limando suavemente.
                            </li>
                        </ul>
                        <p>
                            Consejo: El dia anterior podes usar cremas o aceites
                            hidratantes para que el pegamento vaya perdiendo
                            efecto. Si necesitas mucha fuerza para despegarlas,
                            sumergi mas tiempo las uñas en agua.
                        </p>
                    </div>
                    <div className="py-10 px-5 bg-lila-300">
                        <p className="text-4xl">¿Como cuidarlas?</p>
                        <ul>
                            <li>No mordelas.</li>
                            <li>
                                Retirarlas correctamente, arrancarlas puede
                                lastimar la uña natural.
                            </li>
                            <li>No usarlas como herramientas.</li>
                            <li>
                                Usar guantes cuando uses productos de limpieza.
                            </li>
                        </ul>
                        <p>
                            Consejo: El dia anterior podes usar cremas o aceites
                            hidratantes para que el pegamento vaya perdiendo
                            efecto. Si necesitas mucha fuerza para despegarlas,
                            sumergi mas tiempo las uñas en agua.
                        </p>
                    </div>
                </div>
                <div className="pl-5 py-10 bg-cremita-400 flex flex-col justify-center align-middle  gap-4 border-b-2 border-black">
                    <p className="text-4xl ">Algunos pedidos personalizados</p>
                    <div className="flex flex-col justify-around md:flex-row md:flex-wrap gap-5">
                        <CardTrabajos img="/images/degrade-verde.jpg"></CardTrabajos>
                        <CardTrabajos img="/images/fuego.jpg"></CardTrabajos>
                        <CardTrabajos img="/images/bakugo.jpg"></CardTrabajos>
                        <CardTrabajos img="/images/brillo-rojo.jpg"></CardTrabajos>
                    </div>
                </div>
                <div className="px-10 py-10 bg-lila-400 flex justify-end align-end border-b-2 border-black">
                    <div>
                        <p className="text-lg" >Grupo: Marti2</p>
                        <p className="">Martina Rosales</p>
                        <p className="">Martina Coassin</p>
                    </div>
                </div>
            </div>
        </>
    )
}
