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
import { ModalProveedorDelete, ModalProveedorUpdate, ModalProveedorVer } from '../../../components/Modales/modalProveedor'

export const Proveedor = {
    id: '',
    nombre: '',
    direccion: '',
    anotacion: '',
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
           /* console.log(proveedor.id) */
            return (
                <>
                <ModalProveedorVer idProveedor={proveedor.id}></ModalProveedorVer>
                <ModalProveedorUpdate idProveedor={proveedor.id}></ModalProveedorUpdate>
                    <ModalProveedorDelete
                        idProveedor={proveedor.id}></ModalProveedorDelete>
                </>
            )
        },
    },
]
