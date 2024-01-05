const baseObj = {
    inicioTurno: '02/03/2017 08:00 hs',
    finTurno: '02/03/2017 09:00hs',
    paciente: {
        nombre: 'Juancito Albertito Perez',
        sexo: 'M',
        edad: '29 Años',
        piso: '2DO PISO',
        habitacion: 'Hab: 268',
        cama: 'Cama 2',
        plan: 'BÁSICO',
        nroAfil: '123456 12313 123 12001421',
    },
    profesional: {
        id: '707',
        nombre: 'Pedemera, Gabriel Enrique',
        especialidad: 'Obstetricia',
    },
    adicionales: '',
    diagObs: 'cesarea',
}

const estados = {
    1: 'En Área Quirúrgica',
    2: 'Admitido',
    3: 'Cama Asignada',
    4: 'Cancelado',
    5: 'Reservado',
    6: 'Sin Asignar',
}

export const getEstado = (estado: keyof typeof estados) => {
    const estadoStr = estados[estado]
    return estadoStr
}

export const getSalas = async () => {
    return [
        { id: 'QX1', label: 'QX 1 (2°Piso)' },
        { id: 'QX2', label: 'QX 2 (2°Piso)' },
        { id: 'QX3', label: 'QX 3 (2°Piso)' },
        { id: 'QX4', label: 'QX 4 (1°Piso)' },
        { id: 'END', label: 'Endoscopía' },
        { id: 'QX5', label: 'QX 5 (1°Piso)' },
        { id: 'QX6', label: 'QX 6 (1°Piso)' },
        { id: 'HEM', label: 'Hemodinamia' },
    ]
}

export const getTurnos = async () => {
    return [
        { ...baseObj, id: 'turno1', label: 'Turno 1', sala: 'QX1', horaInicio: 1, horaFin: 3, estado: 1 },
        { ...baseObj, id: 'turno2', label: 'Turno 1', sala: 'QX1', horaInicio: 3.5, horaFin: 5, estado: 2 },
        { ...baseObj, id: 'turno3', label: 'Turno 1', sala: 'QX1', horaInicio: 5, horaFin: 7, estado: 3 },
        { ...baseObj, id: 'turno4', label: 'Turno 1', sala: 'QX1', horaInicio: 7.5, horaFin: 10.5, estado: 4 },
    ]
}
