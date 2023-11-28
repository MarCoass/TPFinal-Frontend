import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import CustomSpinner from '@/components/CustomSpinner'
import Tabla from '@/components/Tablas/data-table'
import { columns } from './columnsCategoriaInsumos'
import { columnsCategoriasSets } from './columnsCategoriaSets'
import { ModalCategoriaInsumoStore } from '../../../../components/Modales/modalCategoriasInsumos'
import { ModalCategoriaSetStore } from '../../../../components/Modales/modalCategoriasSets'


const fetchCategoriasInsumos = () => {
    return axios.get('/api/administracion/categoriasInsumos').then(res => res.data)
}

const fetchCategoriasSets = () => {
    return axios.get('/api/categoriasSets').then(res => res.data)
}

export function CategoriasInsumos() {
    const [categorias, setCategorias] = useState(null)
    const obtenerDatos = async () => {
        try {
            const data = await fetchCategoriasInsumos()
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
                    data={categorias}
                    pageSize={5}></Tabla>
            ) : (
                <CustomSpinner mensaje={'Cargando clientes...'}></CustomSpinner>
            )}
        </div>
    )
}

export function CategoriasSets() {
    const [categorias, setCategorias] = useState(null)
    const obtenerDatos = async () => {
        try {
            const data = await fetchCategoriasSets()
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
            <ModalCategoriaSetStore obtenerDatos={obtenerDatos}></ModalCategoriaSetStore>
            {categorias ? (
                <Tabla
                    obtenerDatos={obtenerDatos}
                    columns={columnsCategoriasSets}
                    data={categorias}
                    pageSize={5}
                    ></Tabla>
            ) : (
                <CustomSpinner mensaje={'Cargando clientes...'}></CustomSpinner>
            )}
        </div>
    )
}
