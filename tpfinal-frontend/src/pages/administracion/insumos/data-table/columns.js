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
            const urlVer = '/administracion/insumos/ver/' + insumo.id
            const urlUpdate = '/administracion/insumos/update/' + insumo.id
            const urlDelete = '/api/administracion/insumosDelete/'
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
