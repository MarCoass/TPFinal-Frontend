'use client'

import { ArrowUpDown, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import ModalStockInsumo, { ModalEliminarInsumo } from '../Modales/modalInsumos'

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
                <div className="flex gap-4">
                    <p>{row.original.pivot.cantidad}</p>
                    <ModalStockInsumo
                        idInsumo={row.original.id}
                        idProducto={row.original.pivot.id_producto}
                        cantidadOld={row.original.cantidad}></ModalStockInsumo>
                </div>
            )
        },
    },
    {
        accessorKey: 'borrar',
        cell: ({ row }) => {
            return (
                <ModalEliminarInsumo
                    idInsumo={row.original.id}
                    idProducto={
                        row.original.pivot.id_producto
                    }></ModalEliminarInsumo>
            )
        },
    },
]
