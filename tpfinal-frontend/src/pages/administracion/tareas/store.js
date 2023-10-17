import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { PlusSquare } from 'lucide-react'

export default function CrearTarea() {
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button className="mt-4 ml-4 bg-violeta-300 hover:bg-violeta-500 rounded font-semibold text-white">
                        <PlusSquare className="mr-2 h-4 w-4" />
                        NUEVA TAREA
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white border border-gray-200 ">
                    <DialogHeader>
                        <DialogTitle>Crear tarea</DialogTitle>
                        <DialogDescription>
                           blablabla
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
