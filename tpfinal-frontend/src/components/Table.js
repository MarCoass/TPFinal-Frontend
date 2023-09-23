import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
} from '@nextui-org/react'
import { DeleteButton, UpdateButton } from './Button'
import { useMemo, useState } from 'react'

export default function Tabla({ columns, rows, handleDelete, ciudades }) {
    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey]
        switch (columnKey) {
            case 'opciones':
                return (
                    <div className="relative flex items-center gap-2">
                        <UpdateButton>Editar</UpdateButton>
                        <DeleteButton onClick={() => handleDelete(item.id)}>
                            Borrar
                        </DeleteButton>
                    </div>
                )
            case 'id_ciudad':
                /*  const ciudad = ciudades.find(ciudad => ciudad.id === item.id_ciudad);
                return ciudad.nombre */
                const id = item.id_ciudad
                const ciudad = ciudades.find(ciudad => ciudad.id === id);
                    return ciudad.nombre
            default:
                return cellValue
        }
    }

    //PAGINACION
    const [page, setPage] = useState(1)
    const cantidadPorPagina = 5
    const pages = Math.ceil(rows.length / cantidadPorPagina)

    const items = useMemo(() => {
        const inicio = (page - 1) * cantidadPorPagina
        const fin = inicio + cantidadPorPagina

        return rows.slice(inicio, fin)
    }, [page, rows])

    return (
        <Table
            aria-label="Tabla de insumos"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={page => setPage(page)}
                    />
                </div>
            }
            classNames={{
                wrapper: 'min-h-[222px]',
            }}>
            <TableHeader columns={columns}>
                {column => (
                    <TableColumn className="bg-violeta-200" key={column.key}>
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items}>
                {item => (
                    <TableRow
                        emptyContent={'No hay informacion cargada.'}
                        key={item.key}>
                        {columnKey => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
