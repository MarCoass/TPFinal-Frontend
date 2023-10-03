import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import CustomSpinner from '@/components/CustomSpinner'



const fetchProductos = (producto) => {
    return axios
        .get(
            `/api/administracion/producto/${producto}`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

const fetchSet = (producto) => {
    return axios
        .get(
            `/set/${producto}`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

const fetchCategoriaSet = (idSet) => {
    return axios
        .get(
            `/categoriaSet/${idSet}`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

const fetchTips = (idTips) => {
    return axios
        .get(
            `/administracion/tip/${idTips}`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

const fetchInsumos = (idInsumo) => {
    return axios
        .get(
            `/administracion/insumo/${idInsumo}`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}


const fetchCiudad = (idCiudad) => {
    return axios
        .get(
            `/ciudad/${idCiudad}`, // Usa axios.get en lugar de fetch
        )
        .then(res => res.data)
}

export default function infoProducto({ params }) {
    const [infoProducto, setProducto] = useState(null)
    const [infoSet, setSet] = useState(null)
    const [infoTips, setTips] = useState(null)
    const [infoInsumo, setInsumo] = useState(null)
    const [infoCategoria, setCategoria] = useState(null)
    const [infoCiudades, setCiudades] = useState(null)
    const router = useRouter()
    const { producto } = router.query
    //tengo que traer:
    //categoriaSet --> es necesario?
    //tips
    //insumo
    //ciudades
    useEffect(() => {
        if (producto != null) {
            async function obtenerDatos() {
                try {
                    const dataProducto = await fetchProductos(producto)
                    // console.log(dataProducto)
                    setProducto(dataProducto)
                    const dataSet = await fetchSet(producto)
                    // console.log('entra al log', dataSet)
                    setSet(dataSet)
                    const dataTips = await fetchTips(dataSet.id_tips)
                    // console.log(dataTips)
                    setTips(dataTips)
                    const dataInsumo = await fetchInsumos(dataTips.id_insumo)
                    // console.log(dataInsumo)
                    setInsumo(dataInsumo)
                    const dataCategoria = await fetchCategoriaSet(dataSet.id_categoria)
                    // console.log(dataCategoria)
                    setCategoria(dataCategoria)
                    //aca voy a tener que meter un foreach para generar un array cuando haya más de una ciudad
                    const dataCiudades = await fetchCiudad(dataProducto.id_ciudad)
                    // console.log(dataCiudades)
                    setCiudades(dataCiudades)



                } catch (error) {
                    console.error('Hubo un problema obteniendo los datos: ', error)
                }
            }
            obtenerDatos()
        }
    }, [producto])
    // 
    const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL + '/storage/';
    return (
        <AppLayout>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center container bg-white overflow-hidden shadow-sm sm:rounded-lg sm:px-6 lg:px-8 ">
                        {infoProducto && infoCategoria && infoInsumo && infoSet && infoTips && infoCiudades? (
                            <div className=" p-6 bg-white border-b border-gray-200">

                                <div className='min-w-2xl'> <img
                                    alt={infoProducto.descripcion}
                                    className="h-40 rounded-2xl w-full object-cover"
                                    src={urlBase + infoProducto.url_imagen}></img></div>

                                <div>
                                    <div>
                                        <div className=''><p className='text-xl font-bold'>{infoProducto.nombre}</p></div>
                                        <p className='text-lg'>${infoProducto.precio}</p></div>
                                    <div className='flex flex-row gap-4 '>
                                        {/* <div className='cantidad-producto flex flex-row itens-center border-2 max-w-min rounded-full'><button name='quitar una unidad de producto' className='flex-items-center text-xs bg-gray-300 p-1 rounded-full h-min leading-none'>-</button><input className='border-0 w-20' value={1}></input><button  name='sumar una unidad de producto' >+</button></div> */}
                                        <button className='inline-flex items-center justify-center px-4 py-2 bg-violeta-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-violeta-600 active:bg-violeta-800 focus:outline-none focus:border-gray-900 focus:ring ring-violeta-200 disabled:opacity-25 transition ease-in-out duration-150'>Agregar al carrito</button>
                                    </div>

                                    <div className='info-producto'>
                                        <p>Descripción:</p>
                                        <div><p className='text-lg'>disponibilidad de entrega: {infoCiudades.nombre}</p></div>
                                        <div><p className='text-lg'>{infoProducto.descripcion}</p></div>
                                        <p>Largo: {infoTips.largo}cm ({infoInsumo.tags})</p>
                                        <p>Categoría: {infoCategoria.nombre}</p>
                                    </div>
                                </div>

                            </div>

                        ) : (
                            <div>
                                <CustomSpinner
                                mensaje={'Cargando producto...'}>
                                </CustomSpinner>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>

    )
}
