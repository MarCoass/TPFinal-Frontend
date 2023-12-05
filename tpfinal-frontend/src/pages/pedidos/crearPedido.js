import axios from '@/lib/axios'
import SelectCiudades from '@/components/Formularios/SelectCiudades'
import SelectTips from '@/components/Formularios/SelectTips'
import { NeoInput } from '@/components/Input'
import { useEffect, useState } from 'react'
import CustomSpinner from '@/components/CustomSpinner'
import swal from 'sweetalert'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogAction,
} from '@/components/ui/alert-dialog'

import { useAuth } from '@/hooks/auth'
import { Info } from 'lucide-react'

const { default: getCookie } = require('@/lib/cookies')

const fetchParametros = () => {
    return axios.get('/api/parametros').then(res => res.data)
}

export function CrearPedido() {
    const { user } = useAuth()
    const [descripcion, setDescripcion] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [imagen, setImagen] = useState('')
    const [tip, setTip] = useState('')
    const handleImagenChange = e => {
        // Manejar el cambio en la selección de imagen
        const file = e.target.files[0] // Obtener el archivo de la selección

        if (file) {
            // Validar si se seleccionó un archivo
            setImagen(file)
        }
    }

    // Función para manejar cambios en las cantidades de los insumos
    const handleCantidadInsumosChange = nuevasCantidades => {
        // Combina las nuevas cantidades con el estado existente
        setCantidadesInsumos(prevCantidades => ({
            ...prevCantidades,
            ...nuevasCantidades,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            // Crea un objeto con los datos del formulario
            const formData = new FormData()
            formData.append('nombre', 'Pedido personalizado ' + user.username)
            formData.append('descripcion', descripcion)
            formData.append('ciudad', ciudad.id)
            formData.append('imagen', imagen)
            formData.append('id_user', user.id)
            formData.append('id_tip', tip)
            let url = '/api/pedidoStore'

            console.log(ciudad)
            // Agrega el token CSRF al encabezado de la solicitud
            const headers = {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            }

            // Realiza la solicitud POST a tu servidor Laravel
            const response = await axios.post(url, formData, {
                headers,
            })

            console.log(response)
            swal({
                icon: 'success',
                title: 'Producto agregado correctamente.',
                text: 'Se creo un nuevo producto exitosamente.',
                button: {
                    text: 'Cerrar',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
        } catch (error) {
            console.error('Error al enviar la solicitud:', error)
            swal({
                icon: 'error',
                title: 'Error al crear un nuevo producto.',
                text: 'Ocurrio un error al cargar el producto.',
                button: {
                    text: 'Cerrar',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
        }
    }

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

    return (
        <AlertDialog>
            <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                Nuevo pedido personalizado
            </AlertDialogTrigger>

            <AlertDialogContent className="overflow-auto bg-rosado-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="flex flex-col gap-2 font-bold">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Nuevo pedido personalizado
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="flex flex-col">
                        <label htmlFor="descripcion">Descripcion:</label>
                        <textarea
                            className=" resize-none rounded-[5px] border-2 border-black p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                            required
                            placeholder="Describa lo mas especificamente posible su idea."
                            id="descripcion"
                            type="textarea"
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row gap-5">
                        <div className="">
                            <label htmlFor="ciudades">Ciudad de retiro:</label>
                            <SelectCiudades
                                mostrarEnvio={true}
                                id="ciudades"
                                value={ciudad}
                                onChange={newCiudad => setCiudad(newCiudad)}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="tip">Forma y largo:</label>
                            <SelectTips
                                id="tip"
                                value={tip}
                                onChange={newTipId =>
                                    setTip(newTipId)
                                }></SelectTips>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="imagen">Imagen de inspiracion: </label>
                        <input
                            id="imagen"
                            type="file"
                            accept=".jpg,.png,.jpeg" // Acepta archivos de imagen
                            onChange={handleImagenChange} // Maneja el cambio en la selección de imagen
                        />
                    </div>

                    <div className="bg-rosado-200 p-4">
                        Informacion importante:
                        {parametrosArray ? (
                            <div>
                                <ul className="list-disc ml-4 font-bold">
                                    <li>
                                        Mientras mas especifica sea la
                                        descripcion, mejor.
                                    </li>
                                    <li>
                                        La imagen es ilustrativa, los colores
                                        pueden variar.
                                    </li>
                                    <li>
                                        El envio a domicilio no es obligatorio,
                                        tambien se puede retirar por el local
                                        sin cargo.
                                    </li>
                                    <li>
                                        Valor de la seña: $
                                        {parametrosArray['valor_senia']}{' '}
                                        <span className="text-red-600">
                                            La seña es obligatoria.
                                        </span>
                                    </li>

                                    <li>
                                        <ul>
                                            {' '}
                                            Demora:{' '}
                                            <span className="text-red-600">
                                                La demora es un aproximado{' '}
                                                <br />
                                            </span>
                                            <li className=" ml-4 ">
                                                Para cotizaciones:{' '}
                                                {
                                                    parametrosArray[
                                                        'demora_cotizacion'
                                                    ]
                                                }
                                            </li>
                                            <li className=" ml-4 ">
                                                Para pedidos:{' '}
                                                {
                                                    parametrosArray[
                                                        'demora_trabajo'
                                                    ]
                                                }
                                            </li>
                                        </ul>
                                    </li>
                                </ul>{' '}
                            </div>
                        ) : (
                            <CustomSpinner
                                mensaje={
                                    'Cargando productos...'
                                }></CustomSpinner>
                        )}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                        <AlertDialogAction type="submit">
                            Hacer pedido
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export function InfoPedido() {
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
    return (
        <AlertDialog>
            <AlertDialogTrigger className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-400 px-8 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                ¿Como realizar un pedido?
            </AlertDialogTrigger>

            <AlertDialogContent className="overflow-auto bg-rosado-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Como realizar un pedido?
                    </AlertDialogTitle>
                </AlertDialogHeader>

                {parametrosArray ? (
                    <div>
                        <ul className="list-decimal ml-4 font-bold">
                            <li>
                                Completa el formulario, mientras mas especifica
                                sea la descripcion mejor.
                            </li>
                            <li>
                                Espera la cotizacion, puede tardar
                                aproximadamente{' '}
                                {parametrosArray['demora_cotizacion']}, te va a
                                llegar una notificacion via Whatsapp.
                            </li>
                            <li>
                                Si el precio y fecha de entrega te parece bien,
                                acepta el pedido.{' '}
                                <span className="text-red-600">
                                    {' '}
                                    Una vez aceptada la cotizacion no puede
                                    cancelarse ni realizar cambios en el pedido.
                                </span>
                            </li>
                            <li>
                                Espera a que tu pedido este listo, puede tardar
                                aproximadamente{' '}
                                {parametrosArray['demora_trabajo']}, te va a
                                llegar una notificacion via Whatsapp.
                            </li>
                            <li>
                               Acorda el envio a domicilio o retiro por local con la manicurista.
                            </li>
                            <li>
                               Disfruta tus nuevas press on!
                            </li>
                        </ul>
                        <span className="text-violeta-500 font-bold">
                                    {' '}
                                   Cualquier consulta no dudes escribirnos por nuestras redes.
                                </span>{' '}
                    </div>
                ) : (
                    <CustomSpinner
                        mensaje={'Cargando productos...'}></CustomSpinner>
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel>Cerrar</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
