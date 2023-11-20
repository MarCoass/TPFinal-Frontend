import React, { useState, useEffect } from 'react';
import Input from '../Input';

export default function InputInsumo({ id, nombre, onCantidadChange, value }) {
    const [cantidad, setCantidad] = useState(value);

    useEffect(() => {
        setCantidad(value);
    }, [value]);

    const handleCantidadChange = (e) => {
        const nuevaCantidad = parseInt(e.target.value, 10);
        setCantidad(nuevaCantidad);
        onCantidadChange(nuevaCantidad);
    };

    return (
        <div>
            <label htmlFor={id}>{nombre}</label>
            <Input
                id={id}
                type="number"
                value={cantidad}
                onChange={handleCantidadChange}
            />
        </div>
    );
}
