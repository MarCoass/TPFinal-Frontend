import getCookie from '@/lib/cookies'
import axios from '@/lib/axios'


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
        
    } catch (error) {
        console.error('Error al eliminar:', error)
    }
}