import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import { NeoButton } from '../../../components/Button'
import { handleUpdateParametros } from '../../../lib/handleUpdate'
import { Label } from '@/components/ui/label'

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

            <div className="py-6">
                {parametrosArray ? (
                    <div className="flex flex-col gap-4 mx-4">
                        <form onSubmit={handleSubmit}>
                            <div className="rounded-[5px] border-2 border-black  font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="font-bold text-2xl border-b-2 border-black bg-rosado-400 p-3">
                                    Informacion general
                                </p>{' '}
                                <div className="p-5">
                                    <p className="text-xl">Redes</p>
                                    <div className="flex flex-row gap-5 flex-wrap">
                                        <div className="mb-4">
                                            <p className="font-bold text-lg">
                                                Instagram
                                            </p>
                                            <div className="flex flex-col">
                                                <label htmlFor="instagram_nombre">
                                                    Username
                                                </label>
                                                <Input
                                                    className="max-w-max"
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
                                                    className="max-w-max"
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
                                                        parametrosArray[
                                                            'whatsapp'
                                                        ]
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
                                                    className="max-w-max"
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
                                                    className="max-w-max"
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
                                <div className="p-5">
                                    <p className=" text-xl">Tienda</p>
                                    <div className="flex flex-row gap-5 flex-wrap">
                                        <div className="flex flex-col">
                                            <label htmlFor="valor_senia">
                                                Valor de la seña:
                                            </label>
                                            <Input
                                                className="max-w-max"
                                                type="number"
                                                id="valor_senia"
                                                value={
                                                    parametrosArray[
                                                        'valor_senia'
                                                    ]
                                                }
                                                onChange={e =>
                                                    handleInputChange(
                                                        'valor_senia',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="demora_cotizacion">
                                                Demora cotizacion:
                                            </label>
                                            <Input
                                                className="max-w-max"
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
                                        <div className="flex flex-col">
                                            <label htmlFor="demora_trabajo">
                                                Demora trabajo:
                                            </label>
                                            <Input
                                                className="max-w-max"
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
                                            <Label
                                                htmlFor="pedidos_abiertos"
                                                className="text-lg font-bold">
                                                Pedidos abiertos:{' '}
                                            </Label>
                                            <input
                                                className="rounded-full p-3 appearance-none  checked:hover:bg-violeta-500 checked:focus:bg-violeta-400 checked:bg-violeta-400 checked:focus:ring-violeta-400 focus:ring-violeta-400"
                                                type="checkbox"
                                                id="pedidos_abiertos"
                                                checked={
                                                    parametrosArray[
                                                        'pedidos_abiertos'
                                                    ] == 1
                                                }
                                                onChange={e => {
                                                    const newValue = e.target
                                                        .checked
                                                        ? 1
                                                        : 0
                                                    handleInputChange(
                                                        'pedidos_abiertos',
                                                        newValue,
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 m-4 flex justify-end">
                                    <NeoButton type="submit">
                                        Guardar cambios
                                    </NeoButton>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </AdminLayout>
    )
}

export default Dashboard
