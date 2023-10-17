import axios from "./axios";

export function insumosUsados(id){
    return axios
    .get(
        `/insumosUsados/${id}`
    )
    .then(res => res.data)
}
export function fetchInsumos(){
    return axios
    .get(
        `/administracion/insumos`
    )
    .then(res => res.data)
}