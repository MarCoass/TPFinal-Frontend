import React, { useState } from 'react'

const SearchComponent = ({ data }) => {
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
            <ul>
                {resultados.map(result => (
                    <li key={result.id}>{result.nombre}</li>
                ))}
            </ul>
        </div>
    )
}

export default SearchComponent;