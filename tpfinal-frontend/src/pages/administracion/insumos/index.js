import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Tabla from '@/components/Table'
import getCookie from '@/lib/cookies'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { NewButton } from '@/components/Button'
import { estadosInsumos } from '@/lib/estados'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from '@nextui-org/react'
import InsumoStore from './insumoStore'

const fetchInsumos = () => {
    return axios.get('/administracion/insumos').then(res => res.data)
}

const fetchCategorias = () => {
    return axios.get('/administracion/categoriasInsumos').then(res => res.data)
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
        key: 'marca',
        label: 'Marca',
    },
    {
        key: 'stock',
        label: 'Stock',
    },
    {
        key: 'id_categoria',
        label: 'Categoria',
    },
    {
        key: 'estado',
        label: 'Estado',
    },
    {
        key: 'stock_minimo',
        label: 'Stock minimo',
    },
    {
        key: 'opciones',
        label: 'Opciones',
    },
]

export default function IndexProductos() {
    //MODAL
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

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

    //BUSCAR INSUMOS
    const [insumos, setInsumos] = useState(null)
    const [categorias, setCategorias] = useState(null)

    useEffect(() => {
        async function obtenerInsumos() {
            try {
                const insumos = await fetchInsumos()
                setInsumos(insumos)
                // console.log(data)
            } catch (error) {
                console.error('Error al obtener insumos:', error)
            }
        }
        obtenerInsumos()
    }, [])

    useEffect(() => {
        async function obtenerCategorias() {
            try {
                const data = await fetchCategorias()
                setCategorias(data)
            } catch (error) {
                console.error('Error al obtener insumos:', error)
            }
        }
        obtenerCategorias()
    }, [])

    const handleDelete = async id => {
        try {
            const xsrfToken = getCookie('XSRF-TOKEN')

            const response = await axios.delete(
                `/administracion/insumosDelete/${id}`,
                {
                    headers: {
                        'X-XSRF-TOKEN': xsrfToken,
                        Accept: 'application/json',
                    },
                },
            )

            // Actualiza la lista de insumos después de eliminar el producto

            const data = await fetchInsumos()
            setInsumos(data)
        } catch (error) {
            console.error('Error al eliminar el insumo:', error)
        }
    }

    const estados = estadosInsumos()

    if (insumos === null || categorias === null) {
        // Puedes mostrar un mensaje de carga mientras esperas que se resuelva la Promise
        return <div>Cargando...</div>
    }

    return (
        <>
            <AdminLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Insumos
                    </h2>
                }>
                <Head>
                    <title>Insumos - Mar Nails</title>
                </Head>

                <div className="py-12">
                    <div className="sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className=" bg-white border-b border-gray-200">
                                {/* <Link href="/administracion/insumos/insumoStore">
                                    <NewButton>Agregar Insumo</NewButton>
                                </Link> */}
                                <NewButton onClick={onOpen}>
                                    Agregar Insumo
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
                                                    Crear Insumo
                                                </ModalHeader>
                                                <ModalBody>
                                                    <InsumoStore></InsumoStore>
                                                </ModalBody>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                                {insumos && categorias && (
                                    <Tabla
                                        columns={columns}
                                        rows={insumos}
                                        handleDelete={handleDelete}
                                        estados={estados}
                                        categorias={categorias}
                                        urlUpdate ='/administracion/insumos/update/'></Tabla>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
