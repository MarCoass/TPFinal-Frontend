import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import AdminLayout from '@/components/Layouts/AdminLayout'
import { estadosInsumos } from '@/lib/estados'

import { ModalInsumoCrear } from '../../../components/Modales/modalInsumos'
import { ModalCategoriasInsumos } from '../../../components/Modales/modalCategoriasInsumos'
import Tabla from '../../../components/Tablas/data-table'
import { columns } from './data-table/columns'
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

    useEffect(() => {
        if (insumos === null || !insumos) {
            obtenerDatos()
        }
    }, [insumos])

   

    const obtenerDatos = async () => {
        try {
            const data = await fetchInsumos()
            setInsumos(data)
        } catch (error) {
            console.error('Hubo un problema obteniendo los datos: ', error)
        }
    }

 

    const estados = estadosInsumos()

    if (insumos === null) {
        // Puedes mostrar un mensaje de carga mientras esperas que se resuelva la Promise
        return <div>Cargando insumos...</div>
    }

    return (
        <>
            <AdminLayout
                header={
                    <div className="font-bold flex w-full justify-between ">
                        <p className="text-xl text-black leading-tight">
                            Insumos
                        </p>
                        <div className="flex gap-2">
                            <ModalInsumoCrear
                                obtenerDatos={obtenerDatos}></ModalInsumoCrear>
                            <ModalCategoriasInsumos></ModalCategoriasInsumos>
                        </div>
                    </div>
                }>
                <Head>
                    <title>Insumos - Mar Nails</title>
                </Head>

                <div className="">
                    <div className="sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className=" bg-white border-b border-gray-200">
                                <Tabla
                                    columns={columns}
                                    data={insumos}
                                    filtrar={true}
                                    obtenerDatos={obtenerDatos}></Tabla>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
