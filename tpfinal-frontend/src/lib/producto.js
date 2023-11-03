import axios from "./axios"

export function esSet(id){
    return axios.get('/esSet/'+id).then(res => res.data)
}

export function insumosUsados(id){
    return axios.get('insumosUsados/'+id).then(res=> res.data)
}