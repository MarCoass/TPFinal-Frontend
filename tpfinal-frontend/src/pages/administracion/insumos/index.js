import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Tabla from '@/components/Table'

const fetchInsumos = () => {
    return axios.get('/administracion/insumos').then(res => res.data)
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

export default function adminIndex() {
    const { user } = useAuth()

    const rolesAutorizados = [1]
    useEffect(() => {
        if (user) {
            if (!rolesAutorizados.includes(user.id_rol)) {
                router.push('/dashboard')
            }
        }
    }, [user])

    const [insumos, setInsumos] = useState(null)

    useEffect(() => {
        async function obtenerInsumos() {
            try {
                const data = await fetchInsumos()
                setInsumos(data)
                console.log(data)
            } catch (error) {
                console.error('Error al obtener insumos:', error)
            }
        }

        obtenerInsumos()
    }, [])


    
    if (insumos === null) {
        // Puedes mostrar un mensaje de carga mientras esperas que se resuelva la Promise
        return <div>Cargando insumos...</div>
    }

    return (
        <>
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Insumos
                    </h2>
                }>
                <Head>
                    <title>Insumos - Mar Nails</title>
                </Head>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <Tabla columns={columns} rows={insumos}></Tabla>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}
