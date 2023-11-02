import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import CardTarea from '../../../components/CardTarea'
import CrearTarea from './store'
import Button, { NeoButton, NeoButtonChico } from '../../../components/Button'

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

    const canGoToPreviousPage = currentPage > 1
    const canGoToNextPage = indexOfLastItem < tareas.length
    // Botón para ir a la página anterior
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1)
        }
    }

    // Botón para ir a la página siguiente
    const goToNextPage = () => {
        if (indexOfLastItem < tareas.length) {
            handlePageChange(currentPage + 1)
        }
    }

    return (
        <AdminLayout
            header={
                <h2 className="font-bold text-xl leading-tight">
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
                                <>
                                    <div className="m-4 grid grid-cols-3 lg:grid-cols-4 gap-4  justify-center">
                                    {itemsToShow.map(tarea => (
                                        <CardTarea
                                            key={tarea.id}
                                            tarea={tarea}></CardTarea>
                                    ))}
                                  
                                </div>
                                <div className="flex items-center justify-end space-x-2 p-4">
                                        <NeoButtonChico
                                            onClick={goToPreviousPage}
                                            disabled={!canGoToPreviousPage}>
                                            Anterior
                                        </NeoButtonChico>
                                        <NeoButtonChico
                                            
                                            onClick={goToNextPage}
                                            disabled={!canGoToNextPage}>
                                            Next
                                        </NeoButtonChico>
                                    </div>
                                </>
                                
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
