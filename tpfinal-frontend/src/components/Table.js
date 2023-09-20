import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Tooltip,
} from '@nextui-org/react'

export default function Tabla({ columns, rows }) {
    const renderCell = (insumo, columnKey) => {
        const cellValue = insumo[columnKey]
        switch (columnKey) {
            case 'opciones':
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                Editar
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                Borrar
                            </span>
                        </Tooltip>
                    </div>
                )
            default:
                return cellValue
        }
    }

    return (
        <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                {column => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={rows}>
                {item => (
                    <TableRow key={item.key}>
                        {columnKey => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
