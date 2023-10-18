import { estadosInsumos, estadosProductos, estadosTareas } from '@/lib/estados'

import SelectBasico from '../Select'

export  function SelectEstadosProducto({ onChange }) {
    const estados = estadosProductos()

    const handleChange = newValue => {
        onChange(newValue)
    }

    return (
        <SelectBasico
        items={estados}
        onChange={handleChange}
        placeholder="Seleccionar un estado"
    />
    )
}

export function SelectEstadosInsumo({ onChange }) {
    const estados = estadosInsumos()

    const handleChange = newValue => {
        onChange(newValue)
    }

    return (
        <SelectBasico
        items={estados}
        onChange={handleChange}
        placeholder="Seleccionar un estado"
    />
    )
}

export function SelectEstadosTareas({ onChange }) {
    const estados = estadosTareas()

    const handleChange = newValue => {
        onChange(newValue)
    }

    return (
        <SelectBasico
        items={estados}
        onChange={handleChange}
        placeholder="Seleccionar un estado"
        className="bg-white"
    />
    )
}


