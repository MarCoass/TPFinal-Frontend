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
    ModalPrecioDelete,
    ModalPrecioUpdate,
} from '../../../../components/Modales/modalPrecio'

export const PrecioProveedor = {
    id: '',
    precio: '',
    id_proveedor: '',
    id_insumo: '',
    proveedor: '',
}

export const columnsPrecios = [
    {
        accessorKey: 'precio',
        header: ({ column }) => {
            return (
                <Button
                    className="uppercase text-lg"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Precio
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <p className="font-bold">${row.getValue('precio')}</p>
        },
    },
    {
        accessorKey: 'proveedor',
        header: 'Proveedor',
    },
    {
        accessorKey: 'eliminar',
        header: 'Opciones',
        cell: ({ row, obtenerDatos }) => {
            return (
                <>
                    <ModalPrecioUpdate
                        idPrecio={row.original.id}></ModalPrecioUpdate>
                    <ModalPrecioDelete obtenerDatos={obtenerDatos}
                        idPrecio={row.original.id}></ModalPrecioDelete>
                </>
            )
        },
    },
]
