import Head from 'next/head'
import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { Mail, Ruler, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

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
                            <Link href="/tienda" className="flex cursor-pointer items-center rounded-[5px] border-2 border-black bg-violeta-300 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                                
                               <ShoppingCart className='mr-2'></ShoppingCart> Ver tienda
                            </Link>
                            <Link href="/pedidos" className="flex cursor-pointer items-center rounded-[5px] border-2 border-black bg-naranja-500 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                                <Ruler className='mr-2'></Ruler>
                                Pedir a medida
                            </Link>
                            <Link href="/" className="flex cursor-pointer items-center rounded-[5px] border-2 border-black bg-lila-500 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                               <Mail className='mr-2'> </Mail> Contacto
                            </Link>
                        </div>
                    </div>
                    <div className="bg-naranja-300">Imagen</div>
                </div>
            </div>
        </>
    )
}
