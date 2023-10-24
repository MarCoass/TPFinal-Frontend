import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Pencil, Trash2, PlusSquare, Eye, DollarSign } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import Input from '@/components/Input'
import SelectCategoriasInsumos from '@/components/Formularios/SelectCategoriasInsumos'
import { SelectEstadosInsumo } from '@/components/Formularios/SelectEstados'
import handleUpdate from '../../lib/handleUpdate'
import handleDelete from '../../lib/handleDelete'
import { ModalPrecioStore } from './modalPrecio'
import Tabla from '../Tablas/data-table'
import { columnsPrecios } from '../../pages/administracion/insumos/ver/columnsPrecios'

const fetchInsumo = id => {
    return axios.get('/administracion/insumo/' + id).then(res => res.data)
}

export function ModalStockInsumo({ idInsumo, idProducto, cantidadOld }) {
    const [cantidad, setCantidad] = useState(cantidadOld)
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('cantidad', cantidad)
            formData.append('id_insumo', idInsumo)
            formData.append('id_producto', idProducto)

            let url = '/modificarCantidad'
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }
            const response = await axios.post(url, formData, { headers })
            /*  console.log(response) */
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="p-1 pr-3 flex bg-violeta-300 hover:bg-violeta-500 rounded font-semibold text-white">
                    <Pencil className="h-4 w-4 mx-2" />
                    Editar
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form onSubmit={handleSubmit}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Modificar cantidad
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <p>
                                    Modifique la cantidad del insumo usada para
                                    un producto
                                </p>
                                <input
                                    type="hidden"
                                    id="id_insumo"
                                    value={idInsumo}
                                />
                                <input
                                    type="hidden"
                                    id="id_producto"
                                    value={idProducto}
                                />
                                <label htmlFor="name">Cantidad:</label>
                                <input
                                    type="number"
                                    id="cantidad"
                                    value={cantidad}
                                    onChange={e => setCantidad(e.target.value)}
                                />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction type="submit">
                                Modificar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalEliminarInsumoProducto(idInsumo, idProducto) {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="p-1 pr-3 flex bg-red-500 hover:bg-red-600 rounded text-white">
                    <Trash2 className="h-4 w-4 mx-2" />
                    Eliminar
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p>¿Desea eliminar el insumo del producto?</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleDelete(producto.id, urlDelete)
                            }>
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalInsumoCrear() {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [stock, setStock] = useState('')
    const [stock_minimo, setStockMinimo] = useState('')
    const [id_categoria, setCategoria] = useState('')
    const [estado, setEstado] = useState('')
    const [marca, setMarca] = useState('')
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nombre', nombre)
            formData.append('descripcion', descripcion)
            formData.append('stock', stock)
            formData.append('stock_minimo', stock_minimo)
            formData.append('id_categoria', id_categoria)
            formData.append('estado', estado)
            formData.append('marca', marca)

            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            const response = await axios.post(
                '/api/administracion/insumoStore',
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
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="items-center  p-1 pr-3 flex bg-violeta-500 hover:bg-violeta-600 rounded text-white">
                    <PlusSquare className="h-4 w-4 mx-2" />
                    NUEVO INSUMO
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-white p-12">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 ">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>Nuevo insumo</AlertDialogTitle>

                            <div className="flex justify-between">
                                <label>Nombre:</label>
                                <Input
                                    type="text"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between">
                                <label>Descripcion:</label>
                                <Input
                                    type="text"
                                    value={descripcion}
                                    onChange={e =>
                                        setDescripcion(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex justify-between">
                                <label>Stock:</label>
                                <Input
                                    type="number"
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between">
                                <label>Stock minimo:</label>
                                <Input
                                    type="number"
                                    value={stock_minimo}
                                    onChange={e =>
                                        setStockMinimo(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex justify-between">
                                <SelectCategoriasInsumos
                                    value={id_categoria}
                                    onChange={newCategoria =>
                                        setCategoria(newCategoria)
                                    }></SelectCategoriasInsumos>
                            </div>
                            <div className="flex justify-between">
                                <SelectEstadosInsumo
                                    value={estado}
                                    onChange={newEstado =>
                                        setEstado(newEstado)
                                    }></SelectEstadosInsumo>
                            </div>
                            <div className="flex justify-between">
                                <label>Marca:</label>
                                <Input
                                    type="text"
                                    value={marca}
                                    onChange={e => setMarca(e.target.value)}
                                />
                            </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction type="submit">
                                Guardar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalInsumoVer({ idInsumo }) {
    const [insumo, setInsumo] = useState()
    useEffect(() => {
        if (idInsumo != null) {
            async function obtenerInsumo() {
                try {
                    const data = await fetchInsumo(idInsumo)
                    setInsumo(data)
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerInsumo()
        }
    }, [idInsumo])

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="p-1 pr-3 flex bg-rosado-500 hover:bg-rosado-600 rounded text-white">
                    <Eye className="h-4 w-4 mx-2" />
                    Ver
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {insumo && <p>{insumo.nombre}</p>}
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        {insumo && (
                            <>
                                <p>Nombre: {insumo.nombre}</p>
                                <p>Descripcion: {insumo.descripcion}</p>
                                <p>Stock: {insumo.stock}</p>
                                <p>Stock minimo: {insumo.stock_minimo}</p>
                            </>
                        )}
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalInsumoModificar({ idInsumo }) {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [stock, setStock] = useState('')
    const [stock_minimo, setStockMinimo] = useState('')
    const [id_categoria, setCategoria] = useState('')
    const [estado, setEstado] = useState('')
    const [marca, setMarca] = useState('')
    useEffect(() => {
        if (idInsumo) {
            async function obtenerInsumo() {
                try {
                    const data = await fetchInsumo(idInsumo)
                    setNombre(data.nombre)
                    setDescripcion(data.descripcion)
                    setStock(data.stock)
                    setStockMinimo(data.stock_minimo)
                    setEstado(data.estado)
                    setMarca(data.marca)
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerInsumo()
        }
    }, [])
    const handleSubmit = async e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('nombre', nombre)
        formData.append('descripcion', descripcion)
        formData.append('stock', stock)
        formData.append('stock_minimo', stock_minimo)
        formData.append('id_categoria', id_categoria)
        formData.append('estado', estado)
        formData.append('marca', marca)

        let urlUpdate = '/api/administracion/insumosUpdate/'
        handleUpdate(idInsumo, urlUpdate, formData)
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="p-1 pr-3 flex bg-violeta-500 hover:bg-violeta-600 rounded text-white">
                    <Pencil className="h-4 w-4 mx-2" />
                    Editar
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form onSubmit={handleSubmit}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Editar insumo</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="">
                            <div className="flex justify-around">
                                <label>Nombre:</label>
                                <Input
                                    type="text"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
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
                                    onChange={e => setStock(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-around">
                                <label>Stock minimo:</label>
                                <Input
                                    type="number"
                                    value={stock_minimo}
                                    onChange={e =>
                                        setStockMinimo(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex justify-around">
                                <SelectCategoriasInsumos
                                    value={id_categoria}
                                    onChange={newCategoria =>
                                        setCategoria(newCategoria)
                                    }></SelectCategoriasInsumos>
                            </div>
                            <div className="flex justify-around">
                                <SelectEstadosInsumo
                                    value={estado}
                                    onChange={newEstado =>
                                        setEstado(newEstado)
                                    }></SelectEstadosInsumo>
                            </div>
                            <div className="flex justify-around">
                                <label>Marca:</label>
                                <Input
                                    type="text"
                                    value={marca}
                                    onChange={e => setMarca(e.target.value)}
                                />
                            </div>
                        </div>

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cerrar </AlertDialogCancel>
                            <AlertDialogAction type="subtmit">
                                Enviar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalInsumoEliminar({ idInsumo }) {
    let urlDelete = '/administracion/insumosDelete/'
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="p-1 pr-3 flex bg-red-500 hover:bg-red-600 rounded text-white">
                    <Trash2 className="h-4 w-4 mx-2" />
                    Eliminar
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Desea eliminar el insumo?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleDelete(idInsumo, urlDelete)}>
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalInsumoPrecios({ idInsumo }) {
    const [listadoPrecios, setListadoPrecios] = useState(null)
    const [insumo, setInsumo] = useState(null)

    useEffect(() => {
        if (idInsumo) {
            async function obtenerInsumo() {
                try {
                    const data = await fetchInsumo(idInsumo)
                    /* console.log(data) */
                    setInsumo(data)
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerInsumo()
        }
    }, [idInsumo])

    useEffect(() => {
        if (insumo && insumo.precios_proveedores) {
            const formattedData = insumo.precios_proveedores.map(item => {
                return {
                    id: item.id,
                    id_insumo: item.id_insumo,
                    id_proveedor: item.id_proveedor,
                    precio: item.precio,
                    proveedor: item.proveedor.nombre,
                }
            })

            setListadoPrecios(formattedData)
            console.log(listadoPrecios)
        }
    }, [insumo])
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="p-1 pr-3 flex bg-violeta-300 hover:bg-violeta-500 rounded font-semibold text-white">
                    <DollarSign className="h-4 w-4 mx-2" /> Ver
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <ModalPrecioStore idInsumo={idInsumo}></ModalPrecioStore>
                    {listadoPrecios ? (
                        <div>
                            <Tabla
                                columns={columnsPrecios}
                                data={listadoPrecios}
                                o
                            />
                        </div>
                    ) : (
                        <p>Cargando datos...</p>
                    )}<AlertDialogFooter>
                    <AlertDialogCancel>Cerrar</AlertDialogCancel>
                </AlertDialogFooter>
                </AlertDialogContent>
                
            </AlertDialog>
        </>
    )
}
