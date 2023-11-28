import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import axios from '@/lib/axios'
import AdminLayout from '@/components/Layouts/AdminLayout'
import TablaProductos from './data-table/page'
import { ModalProductoStore } from '../../../components/Modales/modalProductos'
import CustomSpinner from '@/components/CustomSpinner'
import { columns } from './data-table/columns'
import Tabla from '../../../components/Tablas/data-table'

const fetchCiudades = () => {
    return axios.get('/ciudades').then(res => res.data)
}

const fetchProductos = () => {
    return axios.get('/api/administracion/productos').then(res => res.data)
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
        if (productos === null || !productos) {
            obtenerDatos()
        }
    }, [productos])

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

    const obtenerDatos = async () => {
        try {
            const data = await fetchProductos()
            setProductos(data)
            console.log('actualizado')
        } catch (error) {
            console.error('Hubo un problema obteniendo los datos: ', error)
        }
    }

  

    return (
        <>
            <AdminLayout
                header={
                    <div className="font-bold flex w-full justify-between ">
                        <p className="text-xl text-black leading-tight">
                            Productos
                        </p>
                        <ModalProductoStore
                            obtenerDatos={obtenerDatos}></ModalProductoStore>
                    </div>
                }>
                <Head>
                    <title>Productos - Mar Nails</title>
                </Head>

                <div className="">
                    <div className="sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            {productos ? (
                                <Tabla
                                    obtenerDatos={obtenerDatos}
                                    filtrar={true}
                                    columns={columns}
                                    data={productos}
                                />
                            ) : (
                                <CustomSpinner
                                    mensaje={
                                        'Cargando productos...'
                                    }></CustomSpinner>
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
