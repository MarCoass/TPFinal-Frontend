'use client'

import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModalCiudadUpdate, ModalCiudadDelete } from '../../../components/Modales/modalCiudades'

export const columnsCiudades = [
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
        accessorKey: 'valor_envio',
        header: 'Envio',
        cell: ({ row }) => {
            return <>${row.getValue('valor_envio')}</>
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row, obtenerDatos }) => {
            return (
                <div className="">
                    <ModalCiudadUpdate
                        id={row.original.id}
                        obtenerDatos={obtenerDatos}></ModalCiudadUpdate>
                    <ModalCiudadDelete
                        id={row.original.id}
                        obtenerDatos={obtenerDatos}></ModalCiudadDelete>
                </div>
            )
        },
    },
]
