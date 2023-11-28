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
import CustomSpinner from '@/components/CustomSpinner'

const fetchInsumos = () => {
    return axios.get('/administracion/insumos').then(res => res.data)
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
                    <div className="overflow-hidden container md:mx-auto py-2">
                            {insumos ? (
                                <Tabla
                                    columns={columns}
                                    data={insumos}
                                    filtrar={true}
                                    obtenerDatos={obtenerDatos}></Tabla>
                            ) : (
                                <CustomSpinner
                                    mensaje={
                                        'Cargando insumos...'
                                    }></CustomSpinner>
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
