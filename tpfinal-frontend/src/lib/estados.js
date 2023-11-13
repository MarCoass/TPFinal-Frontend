export function estadosProductos() {
    const estados = [
        {
            id: 0,
            nombre: 'No disponible',
        },
        {
            id: 1,
            nombre: 'Disponible',
        },
    ]
    return estados
}

export function estadosCarrito() {
    const estados = [
        {
            id: 0,
            nombre: 'Activo',
        },
        {
            id: 1,
            nombre: 'Comprado',
        },
    ]
    return estados
}

export function estadosInsumos() {
    const estados = [
        {
            id: 0,
            nombre: 'Stock disponible',
        },
        {
            id: 1,
            nombre: 'Stock bajo',
        },
        {
            id: 2,
            nombre: 'Sin stock',
        },
    ]
    return estados
}

export function estadosTareas() {
    const estados = [
        {
            id: 0,
            nombre: 'Pendiente',
        },
        {
            id: 1,
            nombre: 'Terminada',
        }
    ]
    return estados
}

export function estadosPedido() {
    const estados = [
        {
            id: 0,
            nombre: 'Sin cotizar',
        },
        {
            id: 1,
            nombre: 'Cotizacion enviada',
        },
        {
            id: 2,
            nombre: 'Cotizacion aceptada',
        },
        {
            id: 3,
            nombre: 'Cotizacion rechazada',
        },
        {
            id: 4,
            nombre: 'Pedido empezado',
        },
        {
            id: 5,
            nombre: 'Pedido terminado',
        },
        {
            id: 6,
            nombre: 'Pedido entregado',
        },
    ]
    return estados
}
