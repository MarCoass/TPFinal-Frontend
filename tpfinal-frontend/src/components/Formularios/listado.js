import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { ListboxWrapper } from './listboxWrapper'
import InputInsumo from './InputInsumo'

const fetchInsumos = () => {
    return axios.get('/administracion/insumos').then(res => res.data)
}

export default function ListadoInsumos({ onCantidadInsumosChange }) {
    const [insumos, setInsumos] = useState([])  
    const [selectedKeys, setSelectedKeys] = React.useState([])

    useEffect(() => {
        async function obtenerInsumos() {
            try {
                const data = await fetchInsumos()
                setInsumos(data)

                // console.log(data)
            } catch (error) {
                console.error('Error al obtener insumos:', error)
                // En caso de error, simplemente establece insumos como un array vacío
                setInsumos([])
            }
        }

        obtenerInsumos()
    }, [])


    const getCantidadInsumosSeleccionados = () => {
        const cantidades = {}

        selectedKeys.forEach(id_insumo => {
            const insumo = insumos.find(
                item => item.id === parseInt(id_insumo, 10),
            )
            if (insumo) {
                // Aquí puedes definir cómo obtener la cantidad de cada insumo si es necesario.
                // Por ejemplo, puedes solicitar la cantidad al usuario o tenerla como un estado local.
                cantidades[insumo.id] = 0 // Inicialmente, todas las cantidades son 0.
            }
        })

        // Luego, llama a la función de devolución de llamada para pasar las cantidades al componente padre.
        onCantidadInsumosChange(cantidades)
    }

    return (
        <div className="h-max gap-4 flex">
            <ListboxWrapper className="h-60" >
                <p>Seleccione los insumos utilizados</p>
                <Listbox className='overflow-y-auto h-60'
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
                {selectedKeys.size > 0 ? (
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
