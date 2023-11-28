import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import CustomSpinner from '@/components/CustomSpinner'
import Tabla from '@/components/Tablas/data-table'
import { columns } from './columnsCategoriaInsumos'
import { ModalCategoriaInsumoStore } from '../../../../components/Modales/modalCategoriasInsumos'

const fetchCategorias = () => {
    return axios.get('/api/administracion/categoriasInsumos').then(res => res.data)
}

export default function CategoriasInsumos() {
    const [categorias, setCategorias] = useState(null)
    const obtenerDatos = async () => {
        try {
            const data = await fetchCategorias()
            setCategorias(data)
        } catch (error) {
            console.error('Hubo un problema obteniendo los datos: ', error)
        }
    }

    useEffect(() => {
        if (categorias === null || !categorias) {
            obtenerDatos()
        }
    }, [categorias])

    return (
        <div className=''>
            <ModalCategoriaInsumoStore obtenerDatos={obtenerDatos}></ModalCategoriaInsumoStore>
            {categorias ? (
                <Tabla
                    obtenerDatos={obtenerDatos}
                    columns={columns}
                    data={categorias}></Tabla>
            ) : (
                <CustomSpinner mensaje={'Cargando clientes...'}></CustomSpinner>
            )}
        </div>
    )
}
