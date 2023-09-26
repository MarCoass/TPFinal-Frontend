import { estadosInsumos, estadosProductos } from '@/lib/estados'
import { Select, SelectItem } from '@nextui-org/react'

export  function SelectEstadosSet({ value, onChange }) {
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

export function SelectEstadosInsumo({ value, onChange }) {
    const estados = estadosInsumos()

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
                <SelectItem className='bg-violeta-100  hover:bg-violeta-200' key={estado.id} value={estado.id}>
                    {estado.nombre}
                </SelectItem>
            )}
        </Select>
    )
}


