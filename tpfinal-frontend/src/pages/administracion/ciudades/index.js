import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import CustomSpinner from '@/components/CustomSpinner'
import Tabla from '../../../components/Tablas/data-table'
import { columnsCiudades } from './columns'
import { ModalCiudadStore } from '../../../components/Modales/modalCiudades'
const fetchCiudades = () => {
    return axios.get('/api/ciudades').then(res => res.data)
}

export default function Ciudades() {
    const [ciudades, setCiudades] = useState(null)
    const obtenerDatos = async () => {
        try {
            const data = await fetchCiudades()
            setCiudades(data)
        } catch (error) {
            console.error('Hubo un problema obteniendo los datos: ', error)
        }
    }

    useEffect(() => {
        if (ciudades === null || !ciudades) {
            obtenerDatos()
        }
    }, [ciudades])

    return (
        <div className=''>
            <ModalCiudadStore obtenerDatos={obtenerDatos}></ModalCiudadStore>
            {ciudades ? (
                <Tabla
                    obtenerDatos={obtenerDatos}
                    columns={columnsCiudades}
                    data={ciudades}></Tabla>
            ) : (
                <CustomSpinner mensaje={'Cargando clientes...'}></CustomSpinner>
            )}
        </div>
    )
}
