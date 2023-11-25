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
import {
    Pencil,
    Trash2,
    PlusSquare,
    Eye,
    DollarSign,
    Minus,
    Plus,
} from 'lucide-react'
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
                <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                    <Pencil className="h-4 w-4 mx-2" />
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
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black  px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-red-500 hover:bg-red-600 ">
                    <Trash2 className="h-4 w-4 mx-2" />
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

export function ModalInsumoCrear({ dashboard }) {
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
            formData.append('id_categoria', id_categoria.id)
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
                {dashboard ? (
                    <AlertDialogTrigger className="flex align-middle gap-2 ">
                        <p>Nuevo insumo</p>
                        <PlusSquare className="" />
                    </AlertDialogTrigger>
                ) : (
                    <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                        <PlusSquare className="h-4 w-4 mx-2" />
                        NUEVO INSUMO
                    </AlertDialogTrigger>
                )}

                <AlertDialogContent className="bg-white p-12">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-start gap-4 ">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>Nuevo insumo</AlertDialogTitle>

                            <div className="flex justify-between">
                                <label htmlFor="nombre">Nombre:</label>
                                <Input
                                    id="nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between">
                                <label htmlFor="descripcion">
                                    Descripcion:
                                </label>
                                <Input
                                    id="descripcion"
                                    type="text"
                                    value={descripcion}
                                    onChange={e =>
                                        setDescripcion(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex justify-between">
                                <label htmlFor="stock">Stock:</label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between">
                                <label htmlFor="stock_minimo">
                                    Stock minimo:
                                </label>
                                <Input
                                    id="stock_minimo"
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
                                <label htmlFor="marca">Marca:</label>
                                <Input
                                    id="marca"
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
                    /*   console.log(data)  */
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
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-rosado-500 hover:bg-rosado-600">
                    <Eye className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {insumo && <p>{insumo.nombre}</p>}
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    {insumo && (
                        <>
                            <p>Nombre: {insumo.nombre}</p>
                            <p>Descripcion: {insumo.descripcion}</p>
                            <p>Stock: {insumo.stock}</p>
                            <p>Stock minimo: {insumo.stock_minimo}</p>
                            <p>Categoria: {insumo.nombre}</p>
                        </>
                    )}

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
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black bg-lila-500 hover:bg-lila-600 px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none ">
                    <Pencil className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form onSubmit={handleSubmit}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Editar insumo</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="">
                            <div className="flex justify-around">
                                <label htmlFor="nombre">Nombre:</label>
                                <Input
                                    id="nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-around">
                                <label htmlFor="descripcion">
                                    Descripcion:
                                </label>
                                <Input
                                    id="descripcion"
                                    type="text"
                                    value={descripcion}
                                    onChange={e =>
                                        setDescripcion(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex justify-around">
                                <label htmlFor="stock">Stock:</label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-around">
                                <label htmlFor="stock_minimo">
                                    Stock minimo:
                                </label>
                                <Input
                                    id="stock_minimo"
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
                                <label htmlFor="marca">Marca:</label>
                                <Input
                                    id="marca"
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
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black  px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-red-500 hover:bg-red-600 ">
                    <Trash2 className="h-4 w-4 mx-2" />
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
            /*   console.log(listadoPrecios) */
        }
    }, [insumo])
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black  px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-naranja-300 hover:bg-naranja-500">
                    <DollarSign className="h-4 w-4 mx-2" />
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
                    )}
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalInsumoStockUpdate({ idInsumo, stockViejo }) {
    const [stock, setStock] = useState(stockViejo)
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('stock', stock)
            let url = '/administracion/insumoStockUpdate/' + idInsumo
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }
            const response = await axios.post(url, formData, { headers })
            /* console.log(response.data) */
            if (response.data.exito) {
                swal({
                    icon: 'success',
                    title: 'Stock agregado correctamente.',
                    text: response.data.message,
                    button: {
                        text: 'Cerrar',
                        className:
                            'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                    },
                })
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
        }
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="w-min rounded-full border-2 border-black  px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-naranja-300 hover:bg-naranja-500">
                    {stockViejo}
                    <Pencil className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form onSubmit={handleSubmit}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Modificar stock</AlertDialogTitle>
                            <p>Stock actual: {stockViejo}</p>
                            <input
                                type="hidden"
                                id="id_producto"
                                value={idInsumo}
                            />
                            <div className="flex gap-1">
                                <button
                                    disabled={stock === 0}
                                    className="p-1 bg-violeta-300 hover:bg-violeta-500 disabled:bg-rosado-200 rounded font-semibold text-white"
                                    type="button"
                                    onClick={e => {
                                        if (stock > 0) {
                                            setStock(parseInt(stock) - 1)
                                        }
                                    }}>
                                    <Minus></Minus>
                                </button>
                                <input
                                    className="w-16"
                                    type="number"
                                    id="stock"
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                    min="0"
                                />

                                <button
                                    type="button"
                                    className="p-1 bg-violeta-300 hover:bg-violeta-500 rounded font-semibold text-white"
                                    onClick={e =>
                                        setStock(parseInt(stock) + 1)
                                    }>
                                    <Plus></Plus>
                                </button>
                            </div>
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
