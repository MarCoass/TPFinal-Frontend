import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import CardTarea from '../../../components/CardTarea'
import CrearTarea from './store'
import Button from '../../../components/Button'

const fetchTareas = () => {
    return axios.get('/api/tareas').then(res => res.data)
}

const IndexTareas = () => {
    const [tareas, setTareas] = useState([])

    useEffect(() => {
        async function obtenerTareas() {
            try {
                const data = await fetchTareas()
                setTareas(data)
                //console.log(data)
            } catch (error) {
                console.error('Error al obtener tareas:', error)
            }
        }
        obtenerTareas()
    }, [])

    //---------------PAGINACION---------------------------
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const itemsToShow = tareas.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = newPage => {
        setCurrentPage(newPage)
    }

    // Botón para ir a la página anterior
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    }

    // Botón para ir a la página siguiente
    const goToNextPage = () => {
        if (indexOfLastItem < tareas.length) {
            handlePageChange(currentPage + 1);
        }
    }

    return (
        <AdminLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tareas - Mar Nails
                </h2>
            }>
            <Head>
                <title>Tareas - Mar Nails </title>
            </Head>

            <div className="py-12">
                <div className="sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" bg-white border-b border-gray-200 ">
                            <div className="m-3 flex justify-end">
                                <CrearTarea></CrearTarea>
                            </div>

                            {tareas ? (
                                <div className='grid grid-cols-1'>
                                    <div className="m-4 grid grid-cols-2 lg:grid-cols-3 gap-4  justify-center">
                                        {itemsToShow.map(tarea => (
                                            <CardTarea
                                                key={tarea.id}
                                                tarea={tarea}></CardTarea>
                                        ))}
                                        <div className="flex items-center justify-end space-x-2 py-4">
                                            <Button
                                                className=" bg-violeta-300 hover:bg-violeta-500 rounded font-semibold text-white"
                                                size="sm"
                                                onClick={goToPreviousPage} >
                                                Previous
                                            </Button>
                                            <Button
                                                className="m-5 bg-violeta-300 hover:bg-violeta-500 rounded font-semibold text-white"
                                                size="sm"
                                                onClick={goToNextPage} >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>cargando....</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default IndexTareas
