import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { PlusSquare } from 'lucide-react'
import StoreTarea from '../../../components/Formularios/StoreTarea'

export default function CrearTarea({dashboard=false}) {
    return (
        <>
            <Dialog>
                {dashboard ? (
                    <DialogTrigger className="flex align-middle gap-2 ">
                        <p>Nueva tarea</p>
                        <PlusSquare className="" />
                    </DialogTrigger>
                ) : (
                    <DialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                        <PlusSquare className="h-4 w-4 mx-2" />
                        NUEVA TAREA
                    </DialogTrigger>
                )}
                <DialogContent className="bg-white border border-gray-200 ">
                    <DialogHeader>
                        <DialogTitle>Crear tarea</DialogTitle>

                        <StoreTarea></StoreTarea>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
