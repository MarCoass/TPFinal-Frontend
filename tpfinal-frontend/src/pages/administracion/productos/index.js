import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'

import AdminLayout from '@/components/Layouts/AdminLayout'
import { PlusSquare } from 'lucide-react'
import ProductoStore from './store'
import { estadosProductos } from '@/lib/estados'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import TablaProductos from './data-table/page'
import { Button } from '../../../components/ui/button'
import { ModalProductoStore } from '../../../components/Modales/modalProductos'

const fetchCiudades = () => {
    return axios.get('/ciudades').then(res => res.data)
}

const fetchProductos = () => {
    return axios.get('/administracion/productos').then(res => res.data)
}

export default function ProdutosIndex() {
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

                console.log(data)
            } catch (error) {
                console.error('Error al obtener productos:', error)
            }
        }

        obtenerProductos()
    }, [])

    const [ciudades, setCiudades] = useState()
    useEffect(() => {
        async function obtenerCiudades() {
            try {
                const data = await fetchCiudades()
                setCiudades(data)
                // console.log(data)
            } catch (error) {
                console.error('Error al obtener ciudades:', error)
                // En caso de error, simplemente establece ciudades como un array vacío
            }
        }

        obtenerCiudades()
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

    if (productos === null || ciudades === null) {
        // Puedes mostrar un mensaje de carga mientras esperas que se resuelvan las Promesas
        return <div>Cargando productos y ciudades...</div>
    }

    return (
        <>
            <AdminLayout
                header={
                    <div className="font-bold flex w-full justify-between ">
                        <p className="text-xl text-black leading-tight">
                            Productos
                        </p>
                        <ModalProductoStore></ModalProductoStore>
                    </div>
                }>
                <Head>
                    <title>Productos - Mar Nails</title>
                </Head>

                <div className="">
                    <div className="sm:px-6 lg:px-8">
                        <div className="overflow-hidden ">
                            <TablaProductos></TablaProductos>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
