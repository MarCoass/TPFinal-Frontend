import axios from '@/lib/axios'
import SelectCiudades from '@/components/Formularios/SelectCiudades'
import SelectTips from '@/components/Formularios/SelectTips'
import { NeoInput } from '@/components/Input'
import { useEffect, useState } from 'react'
import { NeoButton } from '@/components/Button'
import swal from 'sweetalert'

import { useAuth } from '@/hooks/auth'

const { default: getCookie } = require('@/lib/cookies')

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
        console.log(tip)
        try {
            // Crea un objeto con los datos del formulario
            const formData = new FormData()
            formData.append('nombre', 'Pedido personalizado '+user.username)
            formData.append('descripcion', descripcion)
            formData.append('ciudad', ciudad)
            formData.append('imagen', imagen)
            formData.append('id_user', user.id)

            formData.append('id_tip', tip)
            let url = '/api/pedidoStore'

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
    return (
        <div className="">
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="">
                Crear pedido personalizado
                <div className="">
                    <label>Descripcion:</label>
                    <NeoInput
                    required
                        type="text"
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                    />
                </div>
                <div className="">
                    <label>Ciudades:</label>
                    <SelectCiudades
                        value={ciudad}
                        onChange={newCiudad => setCiudad(newCiudad)}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                        type="file"
                        accept=".jpg,.png,.jpeg" // Acepta archivos de imagen
                        onChange={handleImagenChange} // Maneja el cambio en la selección de imagen
                    />
                </div>
            

<SelectTips
    value={tip}
    onChange={newTipId => setTip(newTipId)}>
</SelectTips>


                <NeoButton>Hacer pedido</NeoButton>
            </form>
        </div>
    )
}
