import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'

import axios from '@/lib/axios'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Tabla from '../../../../components/Tablas/data-table'
import {columnsPrecios} from './columnsPrecios'

const fetchInsumo = id => {
    return axios
        .get(
            `/api/administracion/insumo/${id}`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

export default function InsumoUpdate() {
    const { user } = useAuth()

    const rolesAutorizados = [1]
    useEffect(() => {
        if (user) {
            if (!rolesAutorizados.includes(user.id_rol)) {
                router.push('/dashboard')
            }
        }
    }, [user])

    const { id } = useRouter().query
    const [insumo, setInsumo] = useState([])
    const [listadoPrecios, setListadoPrecios] = useState([])

    useEffect(() => {
        if (id) {
            async function obtenerInsumo() {
                try {
                    const data = await fetchInsumo(id)
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
    }, [])

    useEffect(() => {
        if (insumo.precios_proveedores) {
            const formattedData = insumo.precios_proveedores.map(item => {
                return {
                    id: item.id,
                    id_insumo: item.id_insumo,
                    id_proveedor: item.id_proveedor,
                    precio: item.precio,
                    proveedor: item.proveedor.nombre,
                }
            })
            /*    console.log(JSON.stringify(formattedData, null, 2)) */
            setListadoPrecios(formattedData)
            console.log(listadoPrecios)
        }
    },[insumo])

    if (insumo.nombre === null) {
        return <div>Cargando insumo...</div>
    }

    return (
        <>
            <AdminLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Insumo
                    </h2>
                }>
                <Head>
                    <title>Ver Insumo - Mar Nails</title>
                </Head>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 ">
                            {insumo === null ? (
                                <div>cargando....</div>
                            ) : (
                                <div>
                                    <Tabs
                                        defaultValue="informacion"
                                        className="">
                                        <TabsList>
                                            <TabsTrigger value="informacion">
                                                Informacion
                                            </TabsTrigger>
                                            <TabsTrigger value="precios">
                                                Lista de precios
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="informacion">
                                            <div>
                                                <p>Nombre: {insumo.nombre}</p>
                                                <p>
                                                    Descripcion:{' '}
                                                    {insumo.descripcion}
                                                </p>
                                                <p>Stock: {insumo.stock}</p>
                                                <p>
                                                    Stock minimo:{' '}
                                                    {insumo.stock_minimo}
                                                </p>
                                                <p></p>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="precios">
                                            Lista de precios
                                            {listadoPrecios ? (
                                                <Tabla
                                                    columns={columnsPrecios}
                                                    data={listadoPrecios}
                                                />
                                            ) : (
                                                <p>Cargando datos...</p>
                                            )}
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            )}
                        </div>
                    </div>
                </div>{' '}
            </AdminLayout>
        </>
    )
}
