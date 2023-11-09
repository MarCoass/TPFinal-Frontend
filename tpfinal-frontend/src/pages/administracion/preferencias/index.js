import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import { NeoButton } from '../../../components/Button'
import { handleUpdateParametros } from '../../../lib/handleUpdate'
import { Toggle } from '../../../components/ui/toggle'

const fetchParametros = () => {
    return axios.get('/api/parametros').then(res => res.data)
}

const Dashboard = () => {
    const [parametros, setParametros] = useState()
    const [parametrosArray, setParametrosArray] = useState()

    useEffect(() => {
        async function obtenerParametros() {
            try {
                const data = await fetchParametros()
                setParametros(data)
            } catch (error) {
                console.error('Error al obtener parametros:', error)
            }
        }
        obtenerParametros()
    }, [])

    useEffect(() => {
        if (parametros != null) {
            let array = {}
            parametros.forEach(parametro => {
                array[parametro.nombre] = parametro.valor
            })
            setParametrosArray(array)
        }
    }, [parametros])

    const handleInputChange = (paramName, value) => {
        // Create a copy of the current state
        const updatedParametrosArray = { ...parametrosArray }
        // Update the value for the specific parameter
        updatedParametrosArray[paramName] = value
        // Update the state with the new values
        setParametrosArray(updatedParametrosArray)
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const formData = new FormData()

            // Itera a través de los valores de parametrosArray y agrégalos al FormData
            for (const paramName in parametrosArray) {
                formData.append(paramName, parametrosArray[paramName])
            }

            handleUpdateParametros('/api/parametros/update', formData)
        } catch (error) {
            console.error('Error al actualizar los parámetros:', error)
            alert('Hubo un error al actualizar los datos. Inténtalo de nuevo.')
        }
    }

    return (
        <AdminLayout
            header={
                <h2 className="font-bold text-xl text-gray-800 leading-tight">
                    Preferencias - Mar Nails
                </h2>
            }>
            <Head>
                <title>Preferencias - Mar Nails</title>
            </Head>

            <div className="py-6 ">
                {parametrosArray ? (
                    <form onSubmit={handleSubmit}>
                        <div className=" grid grid-cols-2 gap-4 mx-4">
                            <div className="rounded-[5px] border-2 border-black  font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="font-bold text-xl border-b-2 border-black bg-rosado-400 p-3">
                                    Redes
                                </p>
                                <div className="p-4 gap-4 grid grid-cols-2">
                                    <div className="mb-4">
                                        <p className="font-bold text-lg">
                                            Instagram
                                        </p>
                                        <div className="flex flex-col">
                                            <label htmlFor="instagram_nombre">
                                                Username
                                            </label>
                                            <Input
                                                id="instagram_nombre"
                                                value={
                                                    parametrosArray[
                                                        'instagram_nombre'
                                                    ]
                                                }
                                                onChange={e =>
                                                    handleInputChange(
                                                        'instagram_nombre',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <label htmlFor="instagram_url">
                                                URL
                                            </label>
                                            <Input
                                                id="instagram_url"
                                                value={
                                                    parametrosArray[
                                                        'instagram_url'
                                                    ]
                                                }
                                                onChange={e =>
                                                    handleInputChange(
                                                        'instagram_url',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="font-bold text-lg">
                                            WhatsApp
                                        </p>
                                        <div className="flex flex-col  ">
                                            <label htmlFor="whatsapp">
                                                Numero
                                            </label>
                                            <Input
                                                className="max-w-max"
                                                id="whatsapp"
                                                value={
                                                    parametrosArray['whatsapp']
                                                }
                                                onChange={e =>
                                                    handleInputChange(
                                                        'whatsapp',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-bold text-lg">
                                            Horario de atencion
                                        </p>
                                        <div className="flex flex-col ">
                                            <label htmlFor="horario_atencion_apertura">
                                                Desde:{' '}
                                            </label>
                                            <Input
                                                id="horario_atencion_apertura"
                                                value={
                                                    parametrosArray[
                                                        'horario_atencion_apertura'
                                                    ]
                                                }
                                                onChange={e =>
                                                    handleInputChange(
                                                        'horario_atencion_apertura',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col ">
                                            <label htmlFor="horario_atencion_cierre">
                                                Hasta:{' '}
                                            </label>
                                            <Input
                                                id="horario_atencion_cierre"
                                                value={
                                                    parametrosArray[
                                                        'horario_atencion_cierre'
                                                    ]
                                                }
                                                onChange={e =>
                                                    handleInputChange(
                                                        'horario_atencion_cierre',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-[5px] border-2 border-black  font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="font-bold text-xl border-b-2 border-black bg-rosado-400 p-3">
                                    Tienda
                                </p>
                                <div className="p-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="valor_senia">
                                            Valor de la seña:
                                        </label>
                                        <Input
                                            type="number"
                                            id="valor_senia"
                                            value={
                                                parametrosArray['valor_senia']
                                            }
                                            onChange={e =>
                                                handleInputChange(
                                                    'valor_senia',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="demora_cotizacion">
                                            Demora cotizacion:
                                        </label>
                                        <Input
                                            id="demora_cotizacion"
                                            value={
                                                parametrosArray[
                                                    'demora_cotizacion'
                                                ]
                                            }
                                            onChange={e =>
                                                handleInputChange(
                                                    'demora_cotizacion',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="demora_trabajo">
                                            Demora trabajo:
                                        </label>
                                        <Input
                                            id="demora_trabajo"
                                            value={
                                                parametrosArray[
                                                    'demora_trabajo'
                                                ]
                                            }
                                            onChange={e =>
                                                handleInputChange(
                                                    'demora_trabajo',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="pedidos_abiertos">
                                            Pedidos abiertos:
                                        </label>
                                         <input
                                            type="radio"
                                            id="pedidos_abiertos"
                                            value={
                                                parametrosArray[
                                                    'pedidos_abiertos'
                                                ]
                                            }
                                            onChange={e =>
                                                handleInputChange(
                                                    'pedidos_abiertos',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 mx-4 flex justify-end">
                            {' '}
                            <NeoButton type="submit">Guardar cambios</NeoButton>
                        </div>
                    </form>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </AdminLayout>
    )
}

export default Dashboard
