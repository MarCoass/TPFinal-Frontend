import { useState } from 'react'
const { default: getCookie } = require('@/lib/cookies')
const { default: axios } = require('@/lib/axios')
import { Input } from '@/components/ui/input'
import { SelectEstadosTareas } from './SelectEstados'

export default function StoreTarea() {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaVencimiento, setFechaVencimiento] = useState('')
    const [estado, setEstado] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('titulo', titulo)
            formData.append('descripcion', descripcion)
            formData.append('fecha_vencimiento', fechaVencimiento)
            formData.append('estado', estado)

            let url = '/api/tareaStore'
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post(url, formData, { headers })
            //console.log(response)
        } catch (error) {
            console.log('Error al crear la tarea: ', error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex justify-around">
                    <label htmlFor='titulo'>Titulo:</label>
                    <Input
                    id='titulo'
                        type="text"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                </div>
                <div className="flex justify-around">
                    <label htmlFor='descripcion'>Descripcion:</label>
                    <Input 
                      id='descripcion'
                        type="text"
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                    />
                </div>
                <div className="flex justify-around">
                    <label htmlFor='estado'>Estado:</label>
                    <SelectEstadosTareas
                      id='estado'
                        value={estado}
                        onChange={newEstado => setEstado(newEstado)}
                    />
                </div>
                <div className="flex justify-around">
                    <label htmlFor='fecha'>Fecha vencimiento:</label>
                    <Input
                      id='fecha'
                        type="date"
                        value={fechaVencimiento}
                        onChange={e => setFechaVencimiento(e.target.value)}
                    />
                </div>
                <button
                    className="border border-violeta-500 w-20 m-6"
                    type="submit">
                    Enviar
                </button>
            </form>
        </>
    )
}
