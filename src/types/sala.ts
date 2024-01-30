export interface Sala {
    SaCodigo:        number
    SaNombre:        string
    SaTurnos:        number
    SaEstado:        number
    SaProcedimiento: number
    SaDuraTurno:     number
    SaUlTurGen:      Date // Ultimo turno generado
    SaLuCodigo:      number // Lugar
    SaDomingo:       string // 'S' o 'N'
    SaHoraDesde:     Date
    SaHoraHasta:     Date
    SaLunes:         string // 'S' o 'N'
    SaHoraDesdeLun:  Date
    SaHoraHastaLun:  Date
    SaMartes:        string // 'S' o 'N'
    SaHoraDesdeMar:  Date
    SaHoraHastaMar:  Date
    SaMiercoles:     string // 'S' o 'N'
    SaHoraDesdeMier: Date
    SaHoraHastaMier: Date
    SaJueves:        string // 'S' o 'N'
    SaHoraDesdeJue:  Date
    SaHoraHastaJue:  Date
    SaViernes:       string // 'S' o 'N'
    SaHoraDesdeVie:  Date
    SaHoraHastaVier: Date
    SaSabado:        string // 'S' o 'N'
    SaHoraDesdeSab:  Date
    SaHoraHastaSab:  Date
    SaColor:         string
    SaHorasCierre:   number
    SaControlSala:   string
    SaSectorBase:    number
    SaCama:          number
    SaHabitacion:    number
    SaNoQx:          string
    SaEquipo:        string
    SaChkCod:        string
}
