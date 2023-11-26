import getCookie from '@/lib/cookies'
import axios from '@/lib/axios'
import swal from 'sweetalert'

export default async function handleDelete(id, url, obtenerDatos) {
    try {
        const xsrfToken = getCookie('XSRF-TOKEN')
        const response = await axios.delete(`${url}${id}`, {
            headers: {
                'X-XSRF-TOKEN': xsrfToken,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        if (response.data.exito) {
          
            swal({
                icon: 'success',
                title: 'Eliminado correctamente.',
                button: {
                    text: 'Cerrar',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
            obtenerDatos()
        } else {
            console.log(response.data.message)
            swal({
                icon: 'error',
                title: 'Ocurrio un error al eliminar.',
                text: response.data.message,
                button: {
                    text: 'Cerrar',
                    className:
                        'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
                },
            })
        }

      /*   console.log(response.data) */
    } catch (error) {
        console.error('Error al eliminar:', error)
        swal({
            icon: 'error',
            title: 'Ocurrio un error al eliminar.',
            button: {
                text: 'Cerrar',
                className:
                    'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
            },
        })
    }
}
