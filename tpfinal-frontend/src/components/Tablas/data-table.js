import * as React from 'react'
import { useEffect, useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { NeoButtonChico } from '../Button'
import { Search } from 'lucide-react'

// Definición del componente DataTable en JavaScript
export default function Tabla({
    columns,
    data,
    filtrar,
    sinCabecera,
    pageSize,
    obtenerDatos,
}) {
    const [sorting, setSorting] = React.useState([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnFilters, setColumnFilters] = React.useState([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),

        state: {
            rowSelection,
            sorting,
            columnFilters,
        },
    })
    useEffect(() => {
        if (table && pageSize) {
            table.setPageSize(pageSize)
        }
    }, [table])
    return (
        <div>
            {filtrar && (
                <div className="py-3 flex md:justify-end">
                    <div className="flex w-min items-center  rounded-[5px] border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <input
                            placeholder="Filtrar por nombre..."
                            value={
                                table.getColumn('nombre')?.getFilterValue() ??
                                ''
                            }
                            onChange={event =>
                                table
                                    .getColumn('nombre')
                                    ?.setFilterValue(event.target.value)
                            }
                            className="w-[30ch] p-[10px] outline-none"
                        />
                        <div className="h-full border-l-2 border-black bg-lila-500 p-[10px] px-5">
                            <Search />
                        </div>
                    </div>
                </div>
            )}

            <div className="">
                <Table className="rounded-[5px] border-2 border-black">
                    {!sinCabecera && (
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className="bg-lila-400 uppercase text-lg font-bold border-b-2  border-black">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                    )}
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    className="border-black border-2 font-bold"
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                {
                                                    ...cell.getContext(),
                                                    obtenerDatos,
                                                }, // Pasa obtenerDatos al contexto
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center">
                                    No hay datos.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <NeoButtonChico
                    className=" bg-violeta-300 hover:bg-violeta-500 rounded font-semibold text-white"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    Anterior
                </NeoButtonChico>
                <NeoButtonChico
                    className="m-5 bg-violeta-300 hover:bg-violeta-500 rounded font-semibold text-white"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    Siguiente
                </NeoButtonChico>
            </div>
        </div>
    )
}
