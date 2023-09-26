import SelectCategoriasSets from '@/components/Formularios/SelectCategoriaSet'
import SelectCiudades from '@/components/Formularios/SelectCiudades'
import { SelectEstadosSet } from '@/components/Formularios/SelectEstados'
import SelectTips from '@/components/Formularios/SelectTips'
import ListadoInsumos from '@/components/Formularios/listado'
import Input from '@/components/Input'

import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'

const { default: axios } = require('@/lib/axios')
const { default: getCookie } = require('@/lib/cookies')
const { useState } = require('react')

export default function ProductoStore() {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [stock, setStock] = useState('')
    const [precio, setPrecio] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [estado, setEstado] = useState('')
    const [imagen, setImagen] = useState('')
    const [categoriaSet, setCategoriaSet] = useState('')
    const [tip, setTip] = useState('')
    const [cantidadesInsumos, setCantidadesInsumos] = useState({})
    const handleImagenChange = e => {
        // Manejar el cambio en la selección de imagen
        const file = e.target.files[0] // Obtener el archivo de la selección

        if (file) {
            // Validar si se seleccionó un archivo
            setImagen(file)
        }
    }

    // Función para manejar cambios en las cantidades de los insumos
    const handleCantidadInsumosChange = nuevasCantidades => {
        // Combina las nuevas cantidades con el estado existente
        setCantidadesInsumos(prevCantidades => ({
            ...prevCantidades,
            ...nuevasCantidades,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        /*  console.log(ciudad.target.value) */
        try {
            // Crea un objeto con los datos del formulario
            const formData = new FormData()
            formData.append('nombre', nombre)
            formData.append('descripcion', descripcion)
            formData.append('precio', precio)
            formData.append('stock', stock)
            formData.append('ciudad', ciudad.target.value)
            formData.append('estado', estado.target.value)
            formData.append('imagen', imagen)

            const cantidadesInsumosJSON = JSON.stringify(cantidadesInsumos)
            formData.append('cantidadesInsumos', cantidadesInsumosJSON)

            for (const pair of formData.entries()) {
                const [field, value] = pair
                console.log(`${field}: ${value}`)
            }
            let url = '/administracion/productoStore'
            if (categoriaSet != '') {
                formData.append('id_categoria', categoriaSet)
                formData.append('id_tip', tip)
                url = '/setStore'
            }
            // Agrega el token CSRF al encabezado de la solicitud
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            // Realiza la solicitud POST a tu servidor Laravel
            const response = await axios.post(url, formData, {
                headers,
            })

            // Maneja la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }
    return (
        <>
            {' '}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden sm:rounded-lg">
                    <div className="p-6 bg-white">
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                            className="flex flex-col">
                            <Tabs aria-label="Formulario de producto">
                                <Tab
                                    key="general"
                                    title="Informacion general"
                                    className="grid grid-cols-2 gap-4">
                                    <div className="flex justify-around">
                                        <label>Nombre:</label>
                                        <Input
                                            type="text"
                                            value={nombre}
                                            onChange={e =>
                                                setNombre(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around">
                                        <label>Descripcion:</label>
                                        <Input
                                            type="text"
                                            value={descripcion}
                                            onChange={e =>
                                                setDescripcion(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around">
                                        <label>Stock:</label>
                                        <Input
                                            type="number"
                                            value={stock}
                                            onChange={e =>
                                                setStock(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around">
                                        <label>Precio:</label>
                                        <Input
                                            type="number"
                                            value={precio}
                                            onChange={e =>
                                                setPrecio(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around">
                                        <SelectCiudades
                                            value={ciudad}
                                            onChange={newCiudad =>
                                                setCiudad(newCiudad)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around">
                                        <SelectEstadosSet
                                            value={estado}
                                            onChange={newEstado =>
                                                setEstado(newEstado)
                                            }></SelectEstadosSet>
                                    </div>
                                    {/* Campo de carga de imagen */}
                                    <div>
                                        <label>Imagen:</label>
                                        <input
                                            type="file"
                                            accept=".jpg,.png,.jpeg" // Acepta archivos de imagen
                                            onChange={handleImagenChange} // Maneja el cambio en la selección de imagen
                                        />
                                    </div>
                                </Tab>
                                <Tab key="insumos" title="Insumos utilizados">
                                    <ListadoInsumos
                                        onCantidadInsumosChange={
                                            handleCantidadInsumosChange
                                        }></ListadoInsumos>
                                </Tab>
                                <Tab key="sets" title="Informacion de Set">
                                    <div className="flex justify-around">
                                        <SelectCategoriasSets
                                            value={categoriaSet}
                                            onChange={e =>
                                                setCategoriaSet(e.target.value)
                                            }></SelectCategoriasSets>
                                    </div>

                                    <div className="flex justify-around">
                                        <SelectTips
                                            value={tip}
                                            onChange={e =>
                                                setTip(e.target.value)
                                            }></SelectTips>
                                    </div>
                                </Tab>
                            </Tabs>

                            <button
                                className="border border-violeta-500 w-20 m-6"
                                type="submit">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
