import { ArrowBigRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CardDashboard({ titulo, url }) {
    return (
        <>
            <Link href={url}>
                <div className="bg-naranja-200 h-40 w-60 text-2xl ">
                    {titulo}
                </div>
            </Link>
        </>
    )
}

export function AccesoRapido({ titulo, url, children }) {
    return (
        <div className=" w-[250px] h-min border-black border-2 rounded-[5px] font-bold">
            <div className="bg-lila-400 font-bold text-xl border-b-2 border-black px-4 py-4">
                {titulo}
            </div>

            <div className="bg-lila-200 flex flex-col gap-2 py-4 px-4 ">
                <div className="hover:underline hover:underline-offset-8">
                    {children}
                </div>
                <Link href={url}>
                    <div className="flex align-middle gap-2 hover:underline underline-offset-8 ">
                        Ir a {titulo} <ArrowBigRight />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export function CardInicio({ url, titulo, texto, img, children }) {
    return (
        <div className=" border-2 border-black rounded-[5px] w-[250px] bg-lila-400 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Image
                className="bg-white rounded-[5px] border-2 border-black"
                src={img}
                width={250}
                height={250}
                alt=""
            />
            <div className='py-3 flex flex-col'>
            <div>
                <p className='text-lg'>{titulo}</p>
                <p>{texto}</p>
            </div>
                <div>
                    {children}
                </div>
               
            </div>
        </div>
    )
}
