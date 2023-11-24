import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import CardTarea from '../../../components/CardTarea'
import Button, { NeoButton, NeoButtonChico } from '../../../components/Button'
import { ModalCrearTarea } from '../../../components/Modales/modalTarea'

const fetchTareas = () => {
    return axios.get('/api/tareas').then(res => res.data)
}

const IndexTareas = () => {
    const [tareas, setTareas] = useState(null)
    //---------------PAGINACION---------------------------
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8)
    const [indexOfLastItem, setIndexOfLastItem] = useState(
        currentPage * itemsPerPage,
    )
    const [indexOfFirstItem, setIndexOfFirstItem] = useState(
        indexOfLastItem - itemsPerPage,
    )
    const [itemsToShow, setItemsToShow] = useState()
    const [canGoToPreviousPage, setCanGoToPreviousPage] = useState(
        currentPage > 1,
    )
    const [canGoToNextPage, setCanGoToNextPage] = useState()

    useEffect(() => {
        if (tareas === null || !tareas) {
            obtenerDatos();
        } else {
            const newIndexOfLastItem = currentPage * itemsPerPage;
            const newIndexOfFirstItem = newIndexOfLastItem - itemsPerPage;
            setIndexOfLastItem(newIndexOfLastItem);
            setIndexOfFirstItem(newIndexOfFirstItem);
            setItemsToShow(tareas.slice(newIndexOfFirstItem, newIndexOfLastItem));
            setCanGoToPreviousPage(currentPage > 1);
            setCanGoToNextPage(newIndexOfLastItem < tareas.length);
        }
    }, [tareas, currentPage]);

    const obtenerDatos = async () => {
        try {
            const data = await fetchTareas()
            setTareas(data)
        } catch (error) {
            console.error('Hubo un problema obteniendo los datos: ', error)
        }
    }

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
    const totalPages = Math.ceil(tareas.length / itemsPerPage);
    if (currentPage < totalPages) {
        handlePageChange(currentPage + 1);
    }
}

    return (
        <AdminLayout
            header={
                <div className="font-bold flex w-full justify-between ">
                    <p className="text-xl text-black leading-tight">
                        Tareas - Mar Nails
                    </p>
                    <ModalCrearTarea
                        obtenerDatos={obtenerDatos}></ModalCrearTarea>
                </div>
            }>
            <Head>
                <title>Tareas - Mar Nails </title>
            </Head>

            <div className="">
                <div className="sm:px-6 lg:px-8">
                    {tareas ? (
                        <>
                            <div className="m-2 md:m-4 flex flex-row flex-wrap gap-5 justify-center md:justify-evenly">
                                {itemsToShow &&
                                    itemsToShow.map(tarea => (
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
        </AdminLayout>
    )
}

export default IndexTareas
