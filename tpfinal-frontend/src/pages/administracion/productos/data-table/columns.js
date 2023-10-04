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
import { estadosProductos } from '@/lib/estados'
import SelectCiudades from '@/components/Formularios/SelectCiudades'
import { fetchCiudades } from '@/lib/ciudades'

export const Producto = {
    id: '',
    nombre: '',
    descripcion: '',
    ciudad: '',
    precio: '',
    estado: '',
    stock: '',
}

export const columns = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={value =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
          
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'nombre',
        header: 'nombre',
    },
    {
        accessorKey: 'descripcion',
        header: 'descripcion',
    },
    {
        accessorKey: 'id_ciudad',
        header: 'Ciudad',
        cell:({row}) => {
        
          return <div>{row.getValue('id_ciudad')}</div>
        }
    },
    {
        accessorKey: 'precio',
        header: 'Precio',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('precio'))
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: 'estado',
        header: 'Estado',
        cell:({row}) => {
          const id_estado = row.getValue('estado')
          const estados = estadosProductos();
          const estado = estados.find(estado => estado.id === id_estado)
          return <div>{estado.nombre}</div>
        }
    },
    {
        accessorKey: 'stock',
        header: 'stock',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Opciones</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end"   className="bg-rosado-200">
                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>

                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Modificar stock</DropdownMenuItem>
                        <DropdownMenuItem>Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
