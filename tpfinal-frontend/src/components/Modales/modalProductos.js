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
import { Pencil, Trash2, PlusSquare, Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')
import Input from '@/components/Input'
import swal from 'sweetalert'

import SelectCategoriasSets from '@/components/Formularios/SelectCategoriaSet'
import SelectCiudades from '@/components/Formularios/SelectCiudades'
import { SelectEstadosProducto } from '@/components/Formularios/SelectEstados'
import SelectTips from '@/components/Formularios/SelectTips'
import ListadoInsumos from '@/components/Formularios/listado'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import handleDelete from '../../lib/handleDelete'
import handleUpdate from '../../lib/handleUpdate'
import { TablaInsumosProductos } from '../Tablas/TablaInsumosProducto'

const fetchProducto = id => {
    return axios.get('/administracion/producto/' + id).then(res => res.data)
}

export function ModalStockProductos({ idProducto, stockViejo }) {
    const [stock, setStock] = useState(stockViejo)
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('stock', stock)
            let url = '/administracion/actualizarStockProducto/' + idProducto
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
                    text:
                        'Se modifico el stock del producto y el de los insumos utilizados.',
                    button: {
                        text: 'Cerrar',
                        className:
                            'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                    },
                })
            } else {
                let insumosInsuficientes = response.data.insumos_faltantes
                const nombres = insumosInsuficientes.map(
                    insumo => insumo.nombre_insumo,
                )
                const nombresTexto = nombres.join(', ')
                console.log(nombresTexto)
                swal({
                    icon: 'error',
                    title: 'No se actualizo el stock',
                    text:
                        'El stock de los siguientes insumos es insuficiente: ' +
                        nombresTexto,
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
                <AlertDialogTrigger className="p-1 flex bg-violeta-300 hover:bg-violeta-500 rounded font-semibold text-white">
                    <Pencil className="h-4 w-4 mx-2" />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form onSubmit={handleSubmit}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Modificar stock</AlertDialogTitle>
                            <AlertDialogDescription>
                                <p>Modificar el stock</p>
                                <input
                                    type="hidden"
                                    id="id_producto"
                                    value={idProducto}
                                />
                                <label htmlFor="name">Stock:</label>
                                <input
                                    type="number"
                                    id="stock"
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
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

export function ModalProductoStore() {
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
            formData.append('ciudad', ciudad)
            formData.append('estado', estado)
            formData.append('imagen', imagen)

            const cantidadesInsumosJSON = JSON.stringify(cantidadesInsumos)
            formData.append('cantidadesInsumos', cantidadesInsumosJSON)

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

            swal({
                icon: 'success',
                title: 'Producto agregado correctamente.',
                text: 'Se creo un nuevo producto exitosamente.',
                button: {
                    text: 'Cerrar',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
            swal({
                icon: 'error',
                title: 'Error al crear un nuevo producto.',
                text: 'Ocurrio un error al cargar el producto.',
                button: {
                    text: 'Cerrar',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
        }
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="items-center p-1 pr-3 flex bg-violeta-500 hover:violeta-red-600 rounded text-white">
                    <PlusSquare className="h-4 w-4 mx-2" />
                    NUEVO PRODUCTO
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="flex flex-col">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>
                                Crear nuevo precio
                            </AlertDialogTitle>
                            <Tabs defaultValue="general">
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
                                        <label>Ciudades:</label>
                                        <SelectCiudades
                                            value={ciudad}
                                            onChange={newCiudad =>
                                                setCiudad(newCiudad)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around">
                                        <label>Estado:</label>
                                        <SelectEstadosProducto
                                            value={estado}
                                            onChange={newEstado =>
                                                setEstado(newEstado)
                                            }></SelectEstadosProducto>
                                    </div>
                                    <div>
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

export function ModalProductoEliminar({ idProducto }) {
    let urlDelete = '/administracion/productoDelete/'
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
                            ¿Desea eliminar el producto?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleDelete(idProducto, urlDelete)}>
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export function ModalProductoUpdate({ idProducto }) {
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
    const [insumos, setInsumos] = useState([])

    useEffect(() => {
        if (idProducto != null) {
            async function obtenerProducto() {
                try {
                    const data = await fetchProducto(idProducto)
                    //console.log(info)
                    setNombre(data.nombre || '')
                    setDescripcion(data.descripcion || '')
                    setStock(data.stock || '')
                    setPrecio(data.precio || '')
                    setCiudad(data.id_ciudad || '')
                    setEstado(data.estado || '')
                    setImagen(data.imagen || '')
                    setInsumos(data.insumos)
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerProducto()
        }
    }, [idProducto])
    const handleCantidadInsumosChange = nuevasCantidades => {
        // Combina las nuevas cantidades con el estado existente
        setCantidadesInsumos(prevCantidades => ({
            ...prevCantidades,
            ...nuevasCantidades,
        }))
    }
    const handleSubmit = async e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('nombre', nombre)
        formData.append('descripcion', descripcion)
        formData.append('precio', precio)
        formData.append('stock', stock)
        formData.append('ciudad', ciudad)
        formData.append('estado', estado)
        formData.append('imagen', imagen)

        // Realiza la solicitud POST a tu servidor Laravel
        let urlUpdate = '/administracion/productoUpdate/'
        handleUpdate(idProducto, urlUpdate, formData)
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
            <AlertDialog>
                <AlertDialogTrigger className="items-center p-1 pr-3 flex bg-violeta-500 hover:bg-violeta-600 rounded text-white">
                    <Pencil className="h-4 w-4 mx-2" />
                    Editar
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-rosado-50">
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="flex flex-col">
                        <AlertDialogHeader className="flex">
                            <AlertDialogTitle>
                                Crear nuevo precio
                            </AlertDialogTitle>
                            <Tabs defaultValue="general">
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
                                        <label>Ciudades:</label>
                                        <SelectCiudades
                                            value={ciudad}
                                            onChange={newCiudad =>
                                                setCiudad(newCiudad)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-around">
                                        <label>Estado:</label>
                                        <SelectEstadosProducto
                                            value={estado}
                                            onChange={newEstado =>
                                                setEstado(newEstado)
                                            }></SelectEstadosProducto>
                                    </div>
                                    <div>
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

export function ModalProductoVer({ idProducto }) {
    const [producto, setProducto] = useState()
    useEffect(() => {
        if (idProducto != null) {
            async function obtenerProducto() {
                try {
                    const data = await fetchProducto(idProducto)
                    setProducto(data)
                    /*  console.log(producto) */
                } catch (error) {
                    console.error(
                        'Hubo un problema obteniendo los datos: ',
                        error,
                    )
                }
            }
            obtenerProducto()
        }
    }, [idProducto])
    const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL + '/storage/'
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
                            {producto && <p>{producto.nombre}</p>}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <Tabs defaultValue="general">
                                <TabsList className="">
                                    <TabsTrigger value="general">
                                        Informacion General
                                    </TabsTrigger>
                                    <TabsTrigger value="insumos">
                                        Insumos
                                    </TabsTrigger>
                                </TabsList>
                                {producto ? (
                                    <>
                                        <TabsContent value="general">
                                            <div className="text-left text-base">
                                                <p>Nombre: {producto.nombre}</p>
                                                <p>
                                                    Descripcion:{' '}
                                                    {producto.descripcion}
                                                </p>
                                                <p>Precio: {producto.precio}</p>
                                                <p>
                                                    Ciudad:{' '}
                                                    {producto.ciudad.nombre}
                                                </p>
                                                <p>Stock: {producto.stock}</p>
                                                {producto.set && (
                                                    <>
                                                        <p>
                                                            Categoria:{' '}
                                                            {
                                                                producto.set
                                                                    .categoria_set
                                                                    .nombre
                                                            }
                                                        </p>
                                                        <p>
                                                            Forma:{' '}
                                                            {
                                                                producto.set.tip
                                                                    .forma
                                                            }
                                                        </p>
                                                        <p>
                                                            Largo:{' '}
                                                            {
                                                                producto.set.tip
                                                                    .largo
                                                            }
                                                        </p>
                                                    </>
                                                )}
                                                <div className="">
                                                    <img
                                                        alt={
                                                            producto.descripcion
                                                        }
                                                        className=" rounded-2xl w-60 object-cover"
                                                        src={
                                                            urlBase +
                                                            producto.url_imagen
                                                        }></img>
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="insumos">
                                            {producto.insumos && (
                                                <TablaInsumosProductos
                                                    insumos={
                                                        producto.insumos
                                                    }></TablaInsumosProductos>
                                            )}
                                        </TabsContent>
                                    </>
                                ) : (
                                    <p>cargando</p>
                                )}
                            </Tabs>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
