'use client'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { estadosPedido } from '../../../lib/estados'
import { ModalVerCliente } from '../../../components/Modales/modalCliente'
import { ModalProductoVer } from '../../../components/Modales/modalProductos'
import {
    ModalCambiarEstado,
    ModalCotizar,
    ModalEmpezarTerminar,
} from '../../../components/Modales/modalPedidos'
import {
    convertirFechaCorta,
    convertirFechaLarga,
} from '../../../lib/formatoFechas'

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
        cell: ({ row }) => {
            if (row.original.fecha_entrega) {
                let fecha = convertirFechaLarga(row.original.fecha_entrega)
                return fecha
            } else {
                return 'Sin fecha definida.'
            }
        },
    },
    {
        accessorKey: 'estado',
        header: 'Estado',
        cell: ({ row }) => {
            const id_estado = row.getValue('estado')
            const estados = estadosPedido()
            const estado = estados.find(estado => estado.id === id_estado)

            return (
                <div>
                    {estado.nombre}
                    {id_estado == 1 && (
                        <p className="font-semibold">Esperando confirmacion.</p>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: 'actions',
        header: 'Opciones',
        cell: ({ row }) => {
            const id_estado = row.getValue('estado')
            const estados = estadosPedido()
            const estado = estados.find(estado => estado.id === id_estado)
            return (
                <div>
                    {id_estado == 0 && (
                        <>
                            <ModalCotizar id={row.original.id}></ModalCotizar>
                        </>
                    )}
                    {(id_estado == 2 || id_estado == 4) && (
                        <ModalEmpezarTerminar
                            pedido={row.original}></ModalEmpezarTerminar>
                    )}
                </div>
            )
        },
    },
]
