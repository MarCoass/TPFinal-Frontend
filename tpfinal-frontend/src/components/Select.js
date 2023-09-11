// components/Select.js

import React from 'react'

const Select = ({ options, value, onChange }) => {
    return (
        <select
            className="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`"
            value={value}
            onChange={onChange}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default Select
