export function convertirFechaLarga(fecha) {
    var partes = fecha.split('-')
    if (partes.length !== 3) {
        return 'Fecha inválida'
    }

    var año = partes[0]
    var mes = parseInt(partes[1])
    var dia = parseInt(partes[2])

    // Nombres de los meses en español
    var meses = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
    ]

    // Obtener el nombre del mes
    var nombreMes = meses[mes - 1]

    // Crear la nueva fecha en el formato deseado
    var nuevaFecha = dia + ' de ' + nombreMes + ', ' + año

    return nuevaFecha
}

export function convertirFechaCorta(fecha) {
    // Dividir la fecha en sus componentes (año, mes y día)
    var partes = fecha.split('-')
    if (partes.length !== 3) {
        return 'Fecha inválida'
    }

    // Crear una nueva fecha en el formato deseado (dd/mm/yyyy)
    var nuevaFecha = partes[2] + '/' + partes[1] + '/' + partes[0]

    return nuevaFecha
}

