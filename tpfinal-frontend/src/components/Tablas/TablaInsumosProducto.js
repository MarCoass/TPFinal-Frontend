import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

export function TablaInsumosProductos({ insumos }) {
    return (
        <Table className="w-full">
            <TableCaption className="text-sm">
                Insumos usados para una unidad de este producto.
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Nombre</TableHead>
                    <TableHead>Cantidad</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {insumos.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.nombre}</TableCell>
                        <TableCell>{item.pivot.cantidad}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
