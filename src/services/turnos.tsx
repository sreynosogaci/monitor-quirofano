export type Turno = {
    id: string
    label: string
    sala: string
    horaInicio: number
    horaFin: number
    estado: keyof typeof estados
    inicioTurno: string
    finTurno: string
    paciente: {
        nombre: string
        sexo: string
        edad: string
        piso: string
        habitacion: string
        cama: string
        plan: string
        nroAfil: string
    }
    profesional: {
        id: string
        nombre: string
        especialidad: string
    }
    adicionales: string
    diagObs: string
}

const baseObj = {
    inicioTurno: '02/03/2017 08:00 hs',
    finTurno: '02/03/2017 09:00hs',
    paciente: {
        nombre: 'Juan Perez',
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

export const getTurnos = async (): Promise<Turno[]> => {
    return [
        { ...baseObj, id: 'turno1', label: 'Turno 1', sala: 'QX1', horaInicio: 2, horaFin: 3, estado: 5 },
        { ...baseObj, id: 'turno2', label: 'Turno 1', sala: 'QX1', horaInicio: 3.5, horaFin: 5, estado: 2 },
        { ...baseObj, id: 'turno3', label: 'Turno 1', sala: 'QX1', horaInicio: 5, horaFin: 7, estado: 3 },
        { ...baseObj, id: 'turno4', label: 'Turno 1', sala: 'QX1', horaInicio: 7.5, horaFin: 10.5, estado: 4 },

        { ...baseObj, id: 'turno5', label: 'Turno 1', sala: 'QX2', horaInicio: 0, horaFin: 8.5, estado: 1 },
        { ...baseObj, id: 'turno6', label: 'Turno 1', sala: 'QX2', horaInicio: 10, horaFin: 15.5, estado: 2 },
        { ...baseObj, id: 'turno7', label: 'Turno 1', sala: 'QX2', horaInicio: 16, horaFin: 18, estado: 3 },
        { ...baseObj, id: 'turno8', label: 'Turno 1', sala: 'QX2', horaInicio: 18, horaFin: 22.5, estado: 4 },

        { ...baseObj, id: 'turno9', label: 'Turno 1', sala: 'QX3', horaInicio: 3, horaFin: 7, estado: 1 },
        { ...baseObj, id: 'turno10', label: 'Turno 1', sala: 'QX3', horaInicio: 7.5, horaFin: 9, estado: 2 },
        { ...baseObj, id: 'turno11', label: 'Turno 1', sala: 'QX3', horaInicio: 9.5, horaFin: 16, estado: 3 },
        { ...baseObj, id: 'turno12', label: 'Turno 1', sala: 'QX3', horaInicio: 17, horaFin: 18.5, estado: 4 },

        { ...baseObj, id: 'turno13', label: 'Turno 1', sala: 'QX4', horaInicio: 4, horaFin: 7, estado: 1 },
        { ...baseObj, id: 'turno14', label: 'Turno 1', sala: 'QX4', horaInicio: 9, horaFin: 13, estado: 2 },
        { ...baseObj, id: 'turno15', label: 'Turno 1', sala: 'QX4', horaInicio: 16, horaFin: 21, estado: 3 },
        { ...baseObj, id: 'turno16', label: 'Turno 1', sala: 'QX4', horaInicio: 22, horaFin: 23, estado: 4 },
        
        { ...baseObj, id: 'turno9', label: 'Turno 1', sala: 'QX5', horaInicio: 12, horaFin: 13, estado: 1 },
        { ...baseObj, id: 'turno10', label: 'Turno 1', sala: 'QX5', horaInicio: 13.5, horaFin: 15, estado: 2 },
        { ...baseObj, id: 'turno11', label: 'Turno 1', sala: 'QX5', horaInicio: 15, horaFin: 17, estado: 3 },
        { ...baseObj, id: 'turno12', label: 'Turno 1', sala: 'QX5', horaInicio: 17.5, horaFin: 19.5, estado: 4 },
        
        { ...baseObj, id: 'turno13', label: 'Turno 1', sala: 'QX6', horaInicio: 1, horaFin: 5, estado: 1 },
        { ...baseObj, id: 'turno14', label: 'Turno 1', sala: 'QX6', horaInicio: 6, horaFin: 12, estado: 2 },
        { ...baseObj, id: 'turno15', label: 'Turno 1', sala: 'QX6', horaInicio: 13, horaFin: 15, estado: 3 },
        { ...baseObj, id: 'turno16', label: 'Turno 1', sala: 'QX6', horaInicio: 20, horaFin: 24, estado: 4 },

        { ...baseObj, id: 'turno13', label: 'Turno 1', sala: 'END', horaInicio: 4, horaFin: 7, estado: 1 },
        { ...baseObj, id: 'turno13', label: 'Turno 1', sala: 'END', horaInicio: 8, horaFin: 10, estado: 1 },
        { ...baseObj, id: 'turno14', label: 'Turno 1', sala: 'END', horaInicio: 14, horaFin: 18, estado: 2 },
        { ...baseObj, id: 'turno14', label: 'Turno 1', sala: 'END', horaInicio: 19, horaFin: 20, estado: 2 },

        { ...baseObj, id: 'turno15', label: 'Turno 1', sala: 'HEM', horaInicio: 1, horaFin: 4, estado: 2 },
        { ...baseObj, id: 'turno15', label: 'Turno 1', sala: 'HEM', horaInicio: 6, horaFin: 6.5, estado: 3 },
        { ...baseObj, id: 'turno16', label: 'Turno 1', sala: 'HEM', horaInicio: 6.5, horaFin: 10, estado: 4 },
        { ...baseObj, id: 'turno16', label: 'Turno 1', sala: 'HEM', horaInicio: 12, horaFin: 13, estado: 4 },
    ]
}
