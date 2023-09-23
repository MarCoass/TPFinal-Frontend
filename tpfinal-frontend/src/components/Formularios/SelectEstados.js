import { estadosProductos } from '@/lib/estados'
import { Select, SelectItem } from '@nextui-org/react'

export default function SelectEstadosSet({ value, onChange }) {
    const estados = estadosProductos()

    const handleChange = newValue => {
        onChange(newValue)
    }

    return (
        <Select
            items={estados}
            label="Estado"
            placeholder="Seleccionar un estado"
            className="max-w-xs"
            value={value}
            onChange={handleChange}>
            {estado => (
                <SelectItem key={estado.id} value={estado.id}>
                    {estado.nombre}
                </SelectItem>
            )}
        </Select>
    )
}
