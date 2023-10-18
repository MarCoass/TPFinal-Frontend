import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function SelectBasico({ items, onChange, placeholder }) {
    const handleChange = newValue => {
        onChange(newValue)
        console.log(newValue)
    }

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white ">
                {items.map(item => (
                    <SelectItem className="hover:bg-rosado-200" key={item.id} value={item.id}>
                        {item.nombre}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
