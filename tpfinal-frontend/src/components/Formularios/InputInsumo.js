import React, { useState } from 'react'
import Input from '../Input'

export default function InputInsumo({ id, nombre, onCantidadChange  }) {
    const [cantidad, setCantidad] = useState(0)

    const handleCantidadChange = e => {
        const nuevaCantidad = parseInt(e.target.value, 10)
        setCantidad(nuevaCantidad)
        onCantidadChange(nuevaCantidad) // Llama a la función de devolución de llamada con la nueva cantidad.
    }
    return (
        <div>
            <label htmlFor='cantidad'>{nombre}</label>
            <Input
            id='cantidad'
                type="number"
                value={cantidad}
                onChange={handleCantidadChange}
            />
        </div>
    )
}
