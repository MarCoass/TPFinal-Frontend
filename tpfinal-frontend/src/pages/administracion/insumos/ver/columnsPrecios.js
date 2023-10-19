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
        id: 'actions',
        header: 'Opciones',
        cell: ({ row }) => {
            const insumo = row.original
            const urlVer = '/administracion/insumos/ver/' + insumo.id
            const urlUpdate = '/administracion/insumos/update/' + insumo.id
            const urlDelete = '/api/administracion/insumosDelete/'
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Opciones</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-rosado-200">
                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                        <DropdownMenuItem className="hover:bg-rosado-600">
                            <a href={urlUpdate}>Editar</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="hover:bg-rosado-600"
                            onClick={() => handleDelete(insumo.id, urlDelete)}>
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
