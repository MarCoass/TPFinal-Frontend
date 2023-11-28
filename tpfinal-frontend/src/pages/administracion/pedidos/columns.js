'use client'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { estadosPedido } from '../../../lib/estados'
import { ModalVerCliente } from '../../../components/Modales/modalCliente'
import { ModalProductoVer, ModalProductoVerPersonalizado } from '../../../components/Modales/modalProductos'
import {
    ModalCambiarEstado,
    ModalCotizar,
    ModalEmpezarTerminar,
    ModalEntregado,
    ModalPedidoEliminar,
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
        accessorKey: 'pedido',
        header: 'Set',
        cell: ({ row }) => {
            let imageUrl =
                process.env.NEXT_PUBLIC_BACKEND_URL +
                '/storage/' +
                row.original.producto.url_imagen
            return (
                <>
                    <ModalProductoVerPersonalizado
                        idProducto={row.original.id_producto}
                        conImagen={true}></ModalProductoVerPersonalizado>
                </>
            )
        },
    },
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
                    <ModalVerCliente
                        id={row.original.id_usuario} ></ModalVerCliente>
                </div>
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
        header: '',
        cell: ({ row, obtenerDatos }) => {
            const id_estado = row.getValue('estado')
            const estados = estadosPedido()
            const estado = estados.find(estado => estado.id === id_estado)
            return (
                <div className="flex  justify-center">
                    {id_estado == 0 && (
                        <>
                            <ModalCotizar
                                id={row.original.id}
                                obtenerDatos={obtenerDatos}></ModalCotizar>
                        </>
                    )}
                    {(id_estado == 2 || id_estado == 4) && (
                        <ModalEmpezarTerminar
                            obtenerDatos={obtenerDatos}
                            pedido={row.original}></ModalEmpezarTerminar>
                    )}
                    {(id_estado == 3 || id_estado == 6) && (
                        <ModalPedidoEliminar
                            obtenerDatos={obtenerDatos}
                            pedido={row.original}></ModalPedidoEliminar>
                    )}
                    {id_estado == 5 && (
                        <ModalEntregado
                            obtenerDatos={obtenerDatos}
                            pedido={row.original}></ModalEntregado>
                    )}
                </div>
            )
        },
    },
]
export const columnsDashboard = [
    {
        accessorKey: 'nombre',
        header: '',
        cell: ({ row }) => {
            return row.original.producto.nombre
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            const id_estado = row.original.estado
            const estados = estadosPedido()
            const estado = estados.find(estado => estado.id === id_estado)
            return (
                <div className="flex  justify-center">
                    {id_estado == 0 && (
                        <>
                            <ModalCotizar id={row.original.id}></ModalCotizar>
                        </>
                    )}
                    {(id_estado == 2 || id_estado == 4) && (
                        <ModalEmpezarTerminar
                            pedido={row.original}></ModalEmpezarTerminar>
                    )}
                    {(id_estado == 3 || id_estado == 6) && (
                        <ModalPedidoEliminar
                            pedido={row.original}></ModalPedidoEliminar>
                    )}
                    {id_estado == 5 && (
                        <ModalEntregado pedido={row.original}></ModalEntregado>
                    )}
                </div>
            )
        },
    },
]
