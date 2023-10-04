import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { ListboxWrapper } from './listboxWrapper'
import InputInsumo from './InputInsumo'

const fetchInsumos = () => {
    return axios.get('/administracion/insumos').then(res => res.data)
}

export default function ListadoInsumos({
    onCantidadInsumosChange,
    idProducto,
}) {
    const [insumos, setInsumos] = useState([])
    const [selectedKeys, setSelectedKeys] = React.useState([])

    useEffect(() => {
        async function obtenerInsumos() {
            try {
                const data = await fetchInsumos()
                setInsumos(data)
                if (idProducto != null) {
                    const insumosCargados = await insumosUsados(idProducto)
                    // Filtrar los insumos que coinciden con data
                    const insumosFiltrados = insumosCargados.filter(insumo =>
                        data.some(dataInsumo => dataInsumo.id === insumo.id),
                    )
                    // Obtener los IDs de los insumos filtrados
                    const insumoIDs = insumosFiltrados.map(insumo => insumo.id)
                    setSelectedKeys(insumoIDs)
                }

                // setInsumos(data)
            } catch (error) {
                console.error('Error al obtener insumos:', error)
                // En caso de error, simplemente establece insumos como un array vacío
                setInsumos([])
            }
        }

        obtenerInsumos()
    }, [])

    useEffect(() => {
        console.log(selectedKeys)
    }, [selectedKeys])

    return (
        <div className="flex gap-4 ">
            <ListboxWrapper>
                <p>Seleccione los insumos utilizados</p>
                <Listbox
                    items={insumos}
                    aria-label="Multiple selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}>
                    {insumo => (
                        <ListboxItem key={insumo.id}>
                            {insumo.nombre}
                        </ListboxItem>
                    )}
                </Listbox>
            </ListboxWrapper>
            <div className="">
                <p>Seleccione la cantidad de cada insumo</p>
                {selectedKeys.length > 0 ? (
                    [...selectedKeys].map(id_insumo => {
                        const insumo = insumos.find(
                            insumo => insumo.id === parseInt(id_insumo, 10),
                        )

                        return (
                            <InputInsumo
                                id={insumo.id}
                                nombre={insumo.nombre}
                                key={insumo.id}
                                onCantidadChange={cantidad =>
                                    onCantidadInsumosChange({
                                        [insumo.id]: cantidad
                                    })
                                }></InputInsumo>
                        ) // Asegúrate de incluir un 'return' aquí
                    })
                ) : (
                    <p>No se han seleccionado insumos</p> // Puedes mostrar 'Selected value' aquí
                )}
            </div>
        </div>
    )
}
