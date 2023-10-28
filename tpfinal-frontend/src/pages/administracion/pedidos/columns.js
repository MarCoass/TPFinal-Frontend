'use client'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Pedido = {
    id: '',
    id_producto: '',
    estado: '',
    id_usuario: '',
    fecha_entrega: ''
}

export const columns = [
    {
        accessorKey: 'Cliente',
        header: ({ column }) => {
            return (
                <Button
                    className="uppercase text-lg"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Cliente
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <p className="font-bold"> {row.original.usuario.nombre}</p>
        },
    },
    {
        accessorKey: 'fecha_entrega',
        header: 'Fecha de entrega'
    },
    {
        accessorKey: 'estado',
        header: 'Estado'
    }
]
