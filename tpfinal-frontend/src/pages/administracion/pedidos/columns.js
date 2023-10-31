'use client'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { estadosPedido } from '../../../lib/estados'
import { ModalVerCliente } from '../../../components/Modales/modalCliente'
import { ModalProductoVer } from '../../../components/Modales/modalProductos'
import { ModalCambiarEstado } from '../../../components/Modales/modalPedidos'

export const Pedido = {
    id: '',
    id_producto: '',
    estado: '',
    id_usuario: '',
    fecha_entrega: '',
}

export const columns = [
    {
        accessorKey: 'Cliente',
        header: ({ column }) => {
            return (
                <Button
                    className="uppercase text-lg"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }>
                    Cliente
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="font-bold">
                    {' '}
                    {row.original.usuario.nombre}
                    <ModalVerCliente
                        id={row.original.id_usuario}></ModalVerCliente>
                </div>
            )
        },
    },
    {
        accessorKey: 'pedido',
        header: 'Set',
        cell: ({ row }) => {
            return (
                <>
                    <ModalProductoVer
                        idProducto={
                            row.original.id_producto
                        }></ModalProductoVer>
                </>
            )
        },
    },
    {
        accessorKey: 'fecha_entrega',
        header: 'Fecha de entrega',
    },
    {
        accessorKey: 'estado',
        header: 'Estado',
        cell: ({ row }) => {
            const id_estado = row.getValue('estado')
            const estados = estadosPedido()
            const estado = estados.find(estado => estado.id === id_estado)
            return <div>{estado.nombre}<ModalCambiarEstado id={row.original.id}></ModalCambiarEstado></div>
        },
    },
]
