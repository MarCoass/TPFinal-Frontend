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

import { Checkbox } from '@/components/ui/checkbox'
import { estadosInsumos } from '@/lib/estados'
import handleDelete from '../../../../lib/handleDelete'

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
        accessorKey: 'estado',
        header: 'Estado',
        cell: ({ row }) => {
            const id_estado = row.getValue('estado')
            const estados = estadosInsumos()
            const estado = estados.find(estado => estado.id === id_estado)
            return <div>{estado.nombre}</div>
        },
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
    },
    {
        id: 'actions',
        header: 'Opciones',
        cell: ({ row }) => {
            const insumo = row.original
            const urlUpdate = '/api/administracion/insumosUpdate/' + insumo.id
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
                            onClick={() =>
                                handleDelete(insumo.id, urlDelete)
                            }>
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
