import Link from 'next/link'

export default function CardDashboard({ titulo, url }) {
    return (
        <>
            <Link href={url}>
                <div className='bg-naranja-200 h-40 w-60 text-2xl ' >{titulo}</div>
            </Link>
        </>
    )
}
