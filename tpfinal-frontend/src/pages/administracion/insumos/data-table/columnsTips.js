'use client'

import {ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Tip = {
    nombre: '',
    stock: '',
    setsPersonalizados: '',
    setsUniversales: '',
}

export const columnsTips = [
    {
        accessorKey: 'nombre',
        header: ({ column }) => {
            return (
                <Button
                    className="uppercase text-lg"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <p className="font-bold">{row.getValue('nombre')}</p>
        },
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ row }) => {
            return <p className="">{row.getValue('stock')}</p>
        },
    },
    {
        accessorKey: 'setsPersonalizados',
        header: 'Sets Personalizados',
    },
    {
        accessorKey: 'setsUniversales',
        header: 'Sets Universales',
    },
]
