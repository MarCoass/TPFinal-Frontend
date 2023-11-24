import { ArrowBigRight } from 'lucide-react'
import Link from 'next/link'

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
            <div className="bg-lila-400 font-bold text-xl border-b-2 border-black px-4 py-4">{titulo}</div>

            <div className="bg-lila-200 flex flex-col gap-2 py-4 px-4 ">
                <div className='hover:underline hover:underline-offset-8'>{children}</div>
                <Link href={url}>
                    <div className="flex align-middle gap-2 hover:underline underline-offset-8 ">
                        Ir a {titulo} <ArrowBigRight />
                    </div>
                </Link>
            </div>
        </div>
    )
}
