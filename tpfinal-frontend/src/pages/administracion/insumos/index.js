import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Link from 'next/link'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { estadosInsumos } from '@/lib/estados'
import TablaInsumos from './data-table/page'
import { ModalInsumoCrear } from '../../../components/Modales/modalInsumos'
import { ModalCategoriasInsumos } from '../../../components/Modales/modalCategoriasInsumos'
const fetchInsumos = () => {
    return axios.get('/administracion/insumos').then(res => res.data)
}

const fetchCategorias = () => {
    return axios
        .get('/api/administracion/categoriasInsumos')
        .then(res => res.data)
}

export default function IndexProductos() {
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

    const estados = estadosInsumos()

    if (insumos === null || categorias === null) {
        // Puedes mostrar un mensaje de carga mientras esperas que se resuelva la Promise
        return <div>Cargando insumos...</div>
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
                                <div className="flex justify-between m-2">
                                    <ModalInsumoCrear></ModalInsumoCrear>
                                    <ModalCategoriasInsumos></ModalCategoriasInsumos>
                                </div>
                                <TablaInsumos></TablaInsumos>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
