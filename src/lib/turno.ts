import { formatZone } from '@/lib/date'
import { getEstadoColor } from '@/lib/monitor'
import { Turno } from '@/types/gaci'

type DatosTurno = {
    horaIni: number
    horaFinal: number
    horaInicio: string
    horaFin: string
    paciente: string
    edad: number | null
    sexo: string
    nroHistoria: number
    habitacion: number
    cama: number
    obraSocial: string
    planCobertura: string
    medicoNombre: string
    medicoEspecialidad: string
    observaciones: string
    cirugia: string
    estado: string,
    estadoColor: string
}

export const getDatosTurno = function (item: Turno | null): DatosTurno | null {
    if (!item) return null
    
    let horaIni      = new Date(item.TurHoraIni).getUTCHours()
    let horaFinal    = new Date(item.TurHoraFin).getUTCHours()
    const minutosIni = new Date(item.TurHoraIni).getUTCMinutes()
    const minutosFin = new Date(item.TurHoraFin).getUTCMinutes()
    if (minutosIni === 30) horaIni += 0.5
    if (minutosFin === 30) horaFinal += 0.5

    const historiaClinica = item.historiaClinica

    // Horarios
    const horaInicio = item.TurHoraIni ? formatZone(new Date(item.TurHoraIni)) : ''
    const horaFin    = item.TurHoraFin ? formatZone(new Date(item.TurHoraFin)) : ''

    // Paciente
    const nombrePaciente   = historiaClinica?.HCNombre?.trim()
    const apellidoPaciente = historiaClinica?.HCApeSol?.trim()
    const paciente    = `${apellidoPaciente} ${nombrePaciente}`
    const edad        = historiaClinica?.HCFechaNacim ? new Date().getFullYear() - new Date(historiaClinica.HCFechaNacim).getFullYear() : null
    const sexo        = historiaClinica?.HCSexo === 'M' ? 'Masculino' : 'Femenino'
    const nroHistoria = historiaClinica.HCNumero

    // Habitación
    const habitacion = item.internacion.INHabitacion
    const cama       = item.internacion.INCama

    // Obra social
    // const obraSocialId  = item.obraSocial.OSCodigo
    const obraSocial    = item.obraSocial.OSRazonSocial
    const planCobertura = item.obraSocial.plan.CoNomPlan

    // Medico
    const medico = item.medico
    const medicoNombre = medico?.MENombre
    const medicoEspecialidad = medico?.especialidad?.ESDescripcion.trim()

    // Observaciones
    const observaciones = item.TurObservaciones

    // Cirugía
    const cirugia = item.TurSiglasEstudio

    // Estado
    const estado = item.estado?.EstTQDsc
    const estadoColor = getEstadoColor(item.estado?.EstTQCod)

    return {
        horaIni,
        horaFinal,
        horaInicio,
        horaFin,
        paciente,
        edad,
        sexo,
        nroHistoria,
        habitacion,
        cama,
        obraSocial,
        planCobertura,
        medicoNombre,
        medicoEspecialidad,
        observaciones,
        cirugia,
        estado,
        estadoColor
    }
}
