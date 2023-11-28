'use client'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

import {
    ModalCategoriaSetDelete,
    ModalCategoriaSetsUpdate,
} from '@/components/Modales/modalCategoriasSets'

export const columnsCategoriasSets = [
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
        header: 'Descripcion',
        cell: ({ row }) => {
            return (
                <>
                    <p className="font-bold">{row.getValue('descripcion')}</p>
                    <p className="font-bold">Precio base: ${row.original.precio_base}</p>
                </>
            )
        },
    },
    {
        id: 'actions',
        header: 'Opciones',
        cell: ({ row, obtenerDatos }) => {
            const categoria = row.original
            return (
                <>
                    <ModalCategoriaSetDelete
                        id={categoria.id}
                        obtenerDatos={obtenerDatos}></ModalCategoriaSetDelete>
                    <ModalCategoriaSetsUpdate
                        id={categoria.id}
                        obtenerDatos={obtenerDatos}></ModalCategoriaSetsUpdate>
                </>
            )
        },
    },
]
