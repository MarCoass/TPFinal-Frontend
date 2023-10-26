import React from 'react'

export default function SelectBasico({ items, onChange, placeholder }) {
    const handleChange = event => {
        const newValue = event.target.value;
        onChange(newValue);
    }

    return (
        <select onChange={handleChange}> 
            <option value="">{placeholder}</option>
            {items.map(item => (
                <option className="hover:bg-rosado-200" key={item.id} value={item.id} >
                    {item.nombre}
                </option>
            ))}
        </select>
    )
}
