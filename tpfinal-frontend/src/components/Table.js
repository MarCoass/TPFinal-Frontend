import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    useDisclosure,
    Link,
} from '@nextui-org/react'
import { DeleteButton, UpdateButton } from './Button'
import { useMemo, useState, useEffect } from 'react'

export default function Tabla({
    columns,
    rows,
    handleDelete,
    ciudades,
    estados,
    categorias,
    children,
}) {
    const [productoIdToUpdate, setProductoIdToUpdate] = useState()
    useEffect(() => {
        console.log(productoIdToUpdate) // Muestra el nuevo valor
        onOpen()
    }, [productoIdToUpdate])

    const { onOpen } = useDisclosure()

    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey]
        switch (columnKey) {
            case 'opciones':
                return (
                    <div className="relative flex items-center gap-2">
                        <Link
                            href={`/administracion/productos/update/${item.id}`}>
                            <UpdateButton>Editar</UpdateButton>
                        </Link>
                        <DeleteButton onClick={() => handleDelete(item.id)}>
                            Borrar
                        </DeleteButton>
                    </div>
                )
            case 'id_ciudad':
                const id_ciudad = item.id_ciudad
                const ciudad = ciudades.find(ciudad => ciudad.id === id_ciudad)
                return ciudad.nombre
            case 'estado':
                const id_estado = item.estado
                const estado = estados.find(estado => estado.id === id_estado)
                return estado.nombre
            case 'id_categoria':
                const id_categoria = item.id_categoria
                const categoria = categorias.find(
                    categoria => categoria.id === id_categoria,
                )
                return categoria.nombre
            case 'precio':
                return '$' + cellValue
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
        <>
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
                        <TableColumn
                            className="bg-violeta-200"
                            key={column.key}>
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
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {children}
        </>
    )
}
