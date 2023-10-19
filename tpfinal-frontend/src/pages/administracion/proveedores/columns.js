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
import handleDelete from '../../../lib/handleDelete'

export const Proveedor = {
    id: '',
    nombre: '',
    direccion: '',
    anotacion: ''
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
        accessorKey: 'direccion',
        header: 'Direccion',
    },
    {
        accessorKey: 'anotacion',
        header: 'Anotacion',
    },
    {
        id: 'actions',
        header: 'Opciones',
        cell: ({ row }) => {
            const proveedor = row.original
            const urlUpdate = '/administracion/proveedores/update/' + proveedor.id
            const urlDelete = '/api/proveedorDelete/'
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
                            onClick={() =>
                                handleDelete(proveedor.id, urlDelete)
                            }>
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
