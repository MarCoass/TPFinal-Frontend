import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import SelectBasico from '../Select'


export default function SelectMedioPago({ id, onChange }) {
    const [mediosPago, setMediosPago] = useState([{ id: 1, nombre: 'Transferencia' }, { id: 2, nombre: 'Mercado Pago' }])

    // Maneja el cambio en el componente Select
    const handleChange = newValue => {
        onChange(newValue)
    }

    return (
        <SelectBasico
            id={id}
            items={mediosPago}
            onChange={handleChange}
            placeholder="Medio de pago"></SelectBasico>
    )
}
