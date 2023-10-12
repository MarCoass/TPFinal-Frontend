'use client'

import {ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import ModalStockInsumo from '../Modales/modalInsumos'

export const Insumo = {
    id: '',
    nombre: '',
    descripcion: '',
    stock: '',
    cantidad: '',
}

export const columnsInsumos = [
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
        accessorKey: 'descripcion',
        header: 'descripcion',
    },
    {
        accessorKey: 'stock',
        header: 'stock',
    },
    {
        accessorKey: 'cantidad',
        cell: ({ row }) => {
            
            return (
                <div className='flex gap-4'>
                <p>{row.getValue('cantidad')}</p>
                    <ModalStockInsumo idInsumo={row.original.id} idProducto={row.original.id_producto} cantidadOld={row.original.cantidad}></ModalStockInsumo>
                </div>
            )
        },
    },
]
