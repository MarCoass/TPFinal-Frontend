import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Tabla from '@/components/Table'
import getCookie from '@/lib/cookies'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { NewButton } from '@/components/Button'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react'
import ProductoForm from '@/components/Formularios/ProductoForm'

const fetchProductos = () => {
    return axios.get('/administracion/productos').then(res => res.data)
}

const columns = [
    {
        key: 'nombre',
        label: 'Nombre',
    },
    {
        key: 'descripcion',
        label: 'Descripcion',
    },
    {
        key: 'stock',
        label: 'Stock',
    },
    {
        key: 'precio',
        label: 'Precio',
    },
    {
        key: 'ciudad',
        label: 'Ciudad',
    },
    {
        key: 'estado',
        label: 'Estado',
    },
    {
        key: 'opciones',
        label: 'Opciones',
    },
]

export default function adminIndex() {
    //AUTORIZACION
    const { user } = useAuth()
    const rolesAutorizados = [1]
    useEffect(() => {
        if (user) {
            if (!rolesAutorizados.includes(user.id_rol)) {
                router.push('/dashboard')
            }
        }
    }, [user])

    //OBTENER PRODUCTOS
    const [productos, setProductos] = useState(null)

    useEffect(() => {
        async function obtenerProductos() {
            try {
                const data = await fetchProductos()
                setProductos(data)
                // console.log(data)
            } catch (error) {
                console.error('Error al obtener productos:', error)
            }
        }

        obtenerProductos()
    }, [])

    //PARA ELIMINAR UN PRODCUTO
    const handleDelete = async id => {
        try {
            const xsrfToken = getCookie('XSRF-TOKEN')
            const response = await axios.delete(
                `/administracion/productoDelete/${id}`,
                {
                    headers: {
                        'X-XSRF-TOKEN': xsrfToken,
                        Accept: 'application/json',
                    },
                },
            )

            // Actualiza la lista de Productos después de eliminar el producto

            const data = await fetchProductos()
            setProductos(data)
        } catch (error) {
            console.error('Error al eliminar el producto:', error)
        }
    }

    //MODAL
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    //-----------------

    if (productos === null) {
        // Puedes mostrar un mensaje de carga mientras esperas que se resuelva la Promise
        return <div>Cargando productos...</div>
    }

    return (
        <>
            <AdminLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Productos
                    </h2>
                }>
                <Head>
                    <title>Productos - Mar Nails</title>
                </Head>

                <div className="py-12">
                    <div className="sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className=" bg-white border-b border-gray-200">
                                {/* <Link href="/administracion/productos/productoStore">
                                    <NewButton>Agregar Producto</NewButton>
                                </Link> */}
                                <NewButton onClick={onOpen}>
                                    Agregar Producto
                                </NewButton>
                                <Modal
                                    className="bg-white border border-gray-200"
                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}
                                    size="5xl"
                                    backdrop="blur">
                                    <ModalContent>
                                        {onClose => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">
                                                    Crear producto
                                                </ModalHeader>
                                                <ModalBody>
                                                    <ProductoForm></ProductoForm>
                                                </ModalBody>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                                <Tabla
                                    columns={columns}
                                    rows={productos}
                                    handleDelete={handleDelete}></Tabla>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
