import React, { useState } from 'react'
import { ListboxWrapper } from '../Formularios/listboxWrapper'
import { Listbox, ListboxItem } from '@nextui-org/react'

const SearchInsumo = ({ data, selectedKeys, setSelectedKeys }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [resultados, setResultados] = useState([])

    const handleSearch = () => {
        //filtra los resultados de data segun el termino
        const filteredResults = data.filter(item =>
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setResultados(filteredResults)
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>

            <ListboxWrapper>
                <Listbox
                    items={resultados}
                    aria-label="Multiple selection example"
                    variant="flat"
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}>
                    {resultados => (
                        <ListboxItem key={resultados.id}>{resultados.nombre}</ListboxItem>
                    )}
                </Listbox>
            </ListboxWrapper>
        
        </div>
    )
}

export default SearchInsumo
