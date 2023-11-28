'use client'

import {ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

import {
    ModalCategoriaInsumoDelete,
    ModalCategoriaInsumoUpdate,
} from '../../../../components/Modales/modalCategoriasInsumos'

export const Categorias = {
    id: '',
    nombre: '',
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
        id: 'actions',
        header: 'Opciones',
        cell: ({ row, obtenerDatos }) => {
            const categoria = row.original

            return (
                <>
                    <ModalCategoriaInsumoUpdate
                        id={categoria.id} obtenerDatos={obtenerDatos}></ModalCategoriaInsumoUpdate>
                    <ModalCategoriaInsumoDelete obtenerDatos={obtenerDatos}
                        id={categoria.id}></ModalCategoriaInsumoDelete>
                </>
            )
        },
    },
]
