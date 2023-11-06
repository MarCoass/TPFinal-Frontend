import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Tabla from '../Tablas/data-table'
import { columnsTips } from '../../pages/administracion/insumos/data-table/columnsTips'
const { default: getCookie } = require('@/lib/cookies')

const fetchTipsCantidades = () => {
    return axios.get('/api/rendimientoTips').then(res => res.data)
}
export function ModalTipsRendimiento({}) {
    const [tips, setTips] = useState()

    useEffect(() => {
        async function obtenerTips() {
            try {
                const data = await fetchTipsCantidades()
                /* console.log(data) */
                setTips(data)
            } catch (error) {
                console.error('Hubo un problema obteniendo los datos: ', error)
            }
        }
        obtenerTips()
    }, [])

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                    <Info className="h-4 w-4 mx-2" /> Rendimiento de tips
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Rendimiento de tips</AlertDialogTitle>
                    </AlertDialogHeader>
                    {tips ? <div>
                        <p>Tips Personalizados: 10 tips</p>
                        <p>Tips Universales: 24 tips</p>
                        <Tabla columns={columnsTips} data={tips}/>
                       
                    </div> : <>Cargando...</>}
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
