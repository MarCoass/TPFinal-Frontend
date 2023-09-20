function getCookie(name) {
    if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1)
            }
        }
    }
    return null
}

export default getCookie;