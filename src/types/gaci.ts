import { CONTRATO, ESPECIALIDADES, ESTADOSTURNOQX, HISTORIAS, INTERNAD, MEDICOS, OBRASOCIAL, SALAS, TURNOS } from '@prisma/client'

export type Sala = SALAS
export type HistoriaClinica = HISTORIAS
export type Internacion = INTERNAD
export type Plan = CONTRATO
export type Especialidad = ESPECIALIDADES
export type Estado = ESTADOSTURNOQX

export type Medico = MEDICOS & {
    especialidad: Especialidad
}

export type ObraSocial = OBRASOCIAL & {
    plan: Plan
}

export type Turno = TURNOS & {
    estado: Estado
    historiaClinica: HistoriaClinica
    internacion: Internacion
    obraSocial: ObraSocial
    medico: Medico
}
