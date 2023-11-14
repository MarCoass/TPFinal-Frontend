import { ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function SelectBasico({
    items,
    onChange,
    placeholder,
    id,
    mostrarEnvio,
    value,
}) {
    const [selectedItem, setSelectedItem] = useState(
        items.find(item => item.id == value) || null,
    )

    const handleChange = event => {
        const newValue = event.target.value
        const selectedItemBusqueda = items.find(item => item.id == newValue)
        setSelectedItem(selectedItemBusqueda)
        onChange(selectedItemBusqueda)
    }


    return (
        <>
            <select
                required
                id={id}
                onChange={handleChange}
                className="flex w-[300px] cursor-pointer items-center rounded-[5px] border-2 border-black bg-rosado-300 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                <option value="" className="font-bold">
                    {placeholder}
                </option>
                {items.map(item => (
                    <option
                        className="font-bold text-black border-b-2 border-black bg-rosado-300 px-5 py-3 first:rounded-t-[5px] last:rounded-b-[5px] hover:bg-rosado-400"
                        key={item.id}
                        value={item.id}>
                        {item.nombre}
                    </option>
                ))}
            </select>
            {mostrarEnvio && selectedItem && (
                <p className="text-violeta-500 mt-2">
                    Valor del envio a domicilio: ${selectedItem.valor_envio}
                </p>
            )}
        </>
    )
}
