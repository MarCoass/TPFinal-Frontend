
import AdminLayout from '@/components/Layouts/AdminLayout'
import axios from '@/lib/axios'
import getCookie from '@/lib/cookies'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ListadoInsumos from '@/components/Formularios/listado'
import SelectCategoriasSets from '@/components/Formularios/SelectCategoriaSet'
import SelectTips from '@/components/Formularios/SelectTips'
import SelectCiudades from '@/components/Formularios/SelectCiudades'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { SelectEstadosProducto } from '@/components/Formularios/SelectEstados'


const fetchProducto = id => {
    return axios
        .get(
            `/administracion/producto/${id}`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

export default function Page({ params }) {
    const { id } = useRouter().query
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

    useEffect(() => {
        if (id != null) {
            async function obtenerProducto() {
                try {
                    const data = await fetchProducto(id)
                    setNombre(data.nombre || '')
                    setDescripcion(data.descripcion || '')
                    setStock(data.stock || '')
                    setPrecio(data.precio || '')
                    setCiudad(data.id_ciudad || '')
                    setEstado(data.estado || '')
                    setImagen(data.imagen || '')
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerProducto()
        }
    }, [id])

    const handleCantidadInsumosChange = nuevasCantidades => {
        // Combina las nuevas cantidades con el estado existente
        setCantidadesInsumos(prevCantidades => ({
            ...prevCantidades,
            ...nuevasCantidades,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            // Crea un objeto con los datos del formulario

            const formData = new FormData()
            formData.append('nombre', nombre)
            formData.append('descripcion', descripcion)
            formData.append('precio', precio)
            formData.append('stock', stock)
            formData.append('ciudad', ciudad)
            formData.append('estado', estado)
            formData.append('imagen', imagen)
            // Agrega el token CSRF al encabezado de la solicitud
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            // Realiza la solicitud POST a tu servidor Laravel
            const response = await axios.post(
                '/administracion/productoUpdate/' + id,
                formData,
                {
                    headers,
                },
            )
            // Maneja la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }

    const handleImagenChange = e => {
        // Manejar el cambio en la selección de imagen
        const file = e.target.files[0] // Obtener el archivo de la selección

        if (file) {
            // Validar si se seleccionó un archivo
            setImagen(file)
        }
    }

    return (
        <>
            <AdminLayout>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {nombre === null ? (
                                <div>Cargando...</div>
                            ) : (
                                <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                            className="flex flex-col">
                            <Tabs defaultValue="general" >
                                <TabsList>
                                    <TabsTrigger value="general">
                                        Informacion general
                                    </TabsTrigger>
                                    <TabsTrigger value="insumos">
                                        Insumos
                                    </TabsTrigger>
                                    <TabsTrigger value="set">
                                        Informacion sobre Set
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="general">
                                    <div className="flex justify-around m-2">
                                        <label>Nombre:</label>
                                        <Input
                                            type="text"
                                            value={nombre}
                                            onChange={e =>
                                                setNombre(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around  m-2">
                                        <label>Descripcion:</label>
                                        <Input
                                            type="text"
                                            value={descripcion}
                                            onChange={e =>
                                                setDescripcion(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around  m-2">
                                        <label>Stock:</label>
                                        <Input
                                            type="number"
                                            value={stock}
                                            onChange={e =>
                                                setStock(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around  m-2">
                                        <label>Precio:</label>
                                        <Input
                                            type="number"
                                            value={precio}
                                            onChange={e =>
                                                setPrecio(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around  m-2">
                                        <label>Ciudades:</label>
                                        <SelectCiudades
                                            value={ciudad}
                                            onChange={newCiudad =>
                                                setCiudad(newCiudad)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around  m-2">
                                        <label>Estado:</label>
                                        <SelectEstadosProducto
                                            value={estado}
                                            onChange={newEstado =>
                                                setEstado(newEstado)
                                            }></SelectEstadosProducto>
                                    </div>
                                    <div className="flex justify-around  m-2">
                                        <label>Imagen:</label>
                                        <input
                                            type="file"
                                            accept=".jpg,.png,.jpeg" // Acepta archivos de imagen
                                            onChange={handleImagenChange} // Maneja el cambio en la selección de imagen
                                        />
                                    </div>
                                </TabsContent>
                                <TabsContent value="insumos">
                                   <ListadoInsumos
                                        onCantidadInsumosChange={
                                            handleCantidadInsumosChange
                                        }></ListadoInsumos> 
                                </TabsContent>
                                <TabsContent value="set">
                                    <div className="flex justify-around">
                                        <SelectTips
                                            value={tip}
                                            onChange={newTip =>
                                                setTip(newTip)
                                            }></SelectTips>
                                    </div>
                                    <div className="flex justify-around">
                                        <SelectCategoriasSets
                                            value={categoriaSet}
                                            onChange={newCategoria =>
                                                setCategoriaSet(newCategoria)
                                            }></SelectCategoriasSets>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <button
                                className="border border-violeta-500 w-20 m-6"
                                type="submit">
                                Enviar
                            </button>
                        </form>
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
