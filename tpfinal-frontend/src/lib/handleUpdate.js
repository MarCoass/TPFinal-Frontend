import getCookie from '@/lib/cookies'
import axios from '@/lib/axios'
import swal from 'sweetalert'

export default async function handleUpdate(id, url, formData, obtenerDatos) {
    try {
        const xsrfToken = getCookie('XSRF-TOKEN')
        const response = axios.post(`${url}${id}`, formData, {
            headers: {
                'X-XSRF-TOKEN': xsrfToken,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        swal({
            icon: 'success',
            title: 'Actualizado correctamente.',

            button: {
                text: 'Cerrar',
                className:
                    'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
            },
        })
        obtenerDatos()
    } catch (error) {
        console.error('Error al modificar:', error)
        swal({
            icon: 'error',
            title: 'Ocurrio un error al actualizar.',
            button: {
                text: 'Cerrar',
                className:
                    'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
            },
        })
    }
}
export async function handleUpdateParametros(url, formData) {
    try {
        const xsrfToken = getCookie('XSRF-TOKEN')
        const response = axios.post(`${url}`, formData, {
            headers: {
                'X-XSRF-TOKEN': xsrfToken,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        console.log(response)

        swal({
            icon: 'success',
            title: 'Actualizado correctamente.',

            button: {
                text: 'Cerrar',
                className:
                    'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
            },
        })
    } catch (error) {
        console.error('Error al modificar:', error)
        swal({
            icon: 'error',
            title: 'Ocurrio un error al actualizar.',
            button: {
                text: 'Cerrar',
                className:
                    'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
            },
        })
    }
}
