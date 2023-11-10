import axios from './axios'

export function insumosUsados(id) {
    return axios.get(`/insumosUsados/${id}`).then(res => res.data)
}
export function fetchInsumos() {
    return axios.get(`/administracion/insumos`).then(res => res.data)
}

export function fetchProducto(id) {
    return axios.get('/administracion/producto/' + id).then(res => res.data)
}


export function fetchPedidosUsuario(idUsuario) {
    return axios.get('/api/pedidos/' + idUsuario).then(res => res.data)
}
