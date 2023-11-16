'use client'

import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModalComentarCliente } from '../../../components/Modales/modalCliente'

export const PrecioProveedor = {
    id: '',
    nombre: '',
}

export const columnsClientes = [
    {
        accessorKey: 'nombre',
        header: ({ column }) => {
            return (
                <Button
                    className="uppercase text-lg font-bold"
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
            return <p className="text-lg">{row.getValue('nombre')}</p>
        },
    },
    {
        accessorKey: 'contacto',
        header: 'Contacto',
        cell: ({ row }) => {
            return (
                <div className="flex flex-col">
                    <p>{row.original.num_telefono}</p>{' '}
                    <p>{row.original.email}</p>
                </div>
            )
        },
    },
    {
        accessorKey: 'observacion',
        header: 'Anotacion',
        cell: ({ row }) => {
            return (
                <div className="">
                    {row.getValue('observacion')} <ModalComentarCliente id={row.original.id}></ModalComentarCliente>
                </div>
            )
        },
    },
]
