import getCookie from '@/lib/cookies'
import axios from '@/lib/axios'


export default function handleUpdate(id, url){
    try {
        const xsrfToken = getCookie('XSRF-TOKEN')
        const response = axios.post(
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
        console.error('Error al modificar:', error)
    }
}