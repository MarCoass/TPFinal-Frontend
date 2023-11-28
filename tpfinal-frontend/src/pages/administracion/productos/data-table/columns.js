'use client'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Checkbox } from '@/components/ui/checkbox'
import { estadosProductos } from '@/lib/estados'
import handleDelete from '../../../../lib/handleDelete'
import {
    ModalProductoEliminar,
    ModalProductoUpdate,
    ModalProductoVer,
    ModalStockProductos,
} from '../../../../components/Modales/modalProductos'

export const Producto = {
    id: '',
    nombre: '',
    descripcion: '',
    imagen: '',
    ciudad: '',
    precio: '',
    estado: '',
    stock: '',
}

export const columns = [
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
        accessorKey: 'descripcion',
        header: 'Descripcion',
    },
    {
        accessorKey: 'precio',
        header: ({ column }) => {
            return (
                <Button
                    className="uppercase text-lg font-bold"
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
            const amount = parseFloat(row.getValue('precio'))
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return <div className="text-right">{formatted}</div>
        },
    },
    {
        accessorKey: 'estado',
        header: 'Estado',
        cell: ({ row }) => {
            const id_estado = row.getValue('estado')
            const estados = estadosProductos()
            const estado = estados.find(estado => estado.id === id_estado)
            return <div>{estado.nombre}</div>
        },
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ row, obtenerDatos }) => {
            const producto = row.original
            return (
                <div className="flex">
                    <ModalStockProductos obtenerDatos={obtenerDatos}
                        idProducto={producto.id}
                        stockViejo={producto.stock}></ModalStockProductos>
                </div>
            )
        },
    },
    {
        id: 'actions',
        header: 'Opciones',
        cell: ({ row, obtenerDatos }) => {
            const producto = row.original
            return (
                <div className="flex">
                    <ModalProductoVer
                        idProducto={producto.id}></ModalProductoVer>
                    <ModalProductoUpdate
                        obtenerDatos={obtenerDatos}
                        idProducto={producto.id}></ModalProductoUpdate>
                    <ModalProductoEliminar
                        obtenerDatos={obtenerDatos}
                        idProducto={producto.id}></ModalProductoEliminar>
                </div>
            )
        },
    },
]
