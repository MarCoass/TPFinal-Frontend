import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/react'
import { DeleteButton, UpdateButton } from './Button'


export default function Tabla({ columns, rows, handleDelete }) {
    
    const renderCell = (insumo, columnKey) => {
        const cellValue = insumo[columnKey]
        switch (columnKey) {
            case 'opciones':
                return (
                    <div className="relative flex items-center gap-2">
                        <UpdateButton>Editar</UpdateButton>
                        <DeleteButton
                            onClick={() => handleDelete(insumo.id)}
                            className="bg-violeta-500 text-white p-2">
                            Borrar
                        </DeleteButton>
                    </div>
                )
            default:
                return cellValue
        }
    }

    return (
        <Table aria-label="Tabla de insumos">
            <TableHeader columns={columns}>
                {column => (
                    <TableColumn className="bg-violeta-200" key={column.key}>
                        {column.label}
                    </TableColumn>
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
