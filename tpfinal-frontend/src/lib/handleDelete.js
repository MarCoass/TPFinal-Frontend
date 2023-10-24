import getCookie from '@/lib/cookies'
import axios from '@/lib/axios'
import swal from 'sweetalert'



export default function handleDelete(id, url){
    try {
        const xsrfToken = getCookie('XSRF-TOKEN')
        const response = axios.delete(
            `${url}${id}`,
            {
                headers: {
                    'X-XSRF-TOKEN': xsrfToken,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            },
        )
        swal({
            icon: 'success',
            title: 'Eliminado correctamente.',
            button: {
                text: 'Cerrar',
                className:
                    'bg-violeta-300 hover:bg-violeta-500 rounded text-white',
            },
        })
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