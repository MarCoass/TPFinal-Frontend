'use client'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { estadosInsumos } from '@/lib/estados'
import handleDelete from '../../../../lib/handleDelete'
import {
    ModalInsumoEliminar,
    ModalInsumoModificar,
    ModalInsumoPrecios,
    ModalInsumoStockUpdate,
    ModalInsumoVer,
} from '../../../../components/Modales/modalInsumos'

export const Insumo = {
    id: '',
    nombre: '',
    descripcion: '',
    estado: '',
    stock: '',
}

export const columns = [
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
    },
    {
        accessorKey: 'marca',
        header: 'Marca',
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ row }) => {
            const insumo = row.original
            return (
                <>
                    <p>{insumo.stock}</p>
                    <ModalInsumoStockUpdate
                        idInsumo={insumo.id}
                        stockViejo={insumo.stock}></ModalInsumoStockUpdate>
                </>
            )
        },
    },
    {
        accessorKey: 'precio',
        header: 'Precio',
        cell: ({ row }) => {
            const insumo = row.original
            return (
                <>
                    <ModalInsumoPrecios
                        idInsumo={insumo.id}></ModalInsumoPrecios>
                </>
            )
        },
    },
    {
        id: 'actions',
        header: 'Opciones',
        cell: ({ row }) => {
            const insumo = row.original
         
            return (
                <>
                    <ModalInsumoVer idInsumo={insumo.id}></ModalInsumoVer>
                    <ModalInsumoModificar
                        idInsumo={insumo.id}></ModalInsumoModificar>
                    <ModalInsumoEliminar
                        idInsumo={insumo.id}></ModalInsumoEliminar>
                </>
            )
        },
    },
]
