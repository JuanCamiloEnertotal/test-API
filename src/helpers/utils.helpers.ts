


export const getMonth = (monthNumber: number)  => {
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    if (monthNumber < 1 || monthNumber > 12) {
        throw new Error("Número de mes inválido. Debe estar entre 1 y 12.");
    }

    return monthNames[monthNumber - 1];
}