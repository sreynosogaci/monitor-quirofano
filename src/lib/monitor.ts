export const getLabelHorario = (hora: number) => {
    if (hora - Math.floor(hora) === 0.5) {
        if (hora < 10) return `0${Math.floor(hora)}:30`
        return `${Math.floor(hora)}:30`
    } else {
        if (hora < 10) return `0${hora}:00`
        return `${hora}:00`
    }
}

export const getEquivalenciaHorario = (hora: number, modifier: number) => {
    return (hora * 2 * modifier) + 1
}