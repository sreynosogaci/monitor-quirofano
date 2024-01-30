import { Estado } from './estado'
import { HistoriaClinica } from './historias'
import { Internacion } from './internacion'
import { Medico } from './medico'
import { ObraSocial } from './obra-social'

// export type Turno = ReturnType<typeof prismadb.tURNOS.findUnique> & {
//     estado: Estado | null
//     historiaClinica: HistoriaClinica | null
//     internacion: Internacion | null
//     obraSocial: ObraSocial | null
// }

export interface Turno {
    TurID:             number;
    TurSala:           number;
    Turfecha:          Date;
    TurHora:           string;
    TurVisitado:       string;
    TurVisitadoFecha:  Date;
    MECodigo:          number;
    TurAnestesista:    string;
    TurUsuarioAnulo:   string;
    TurInternado:      string;
    TurFechaAsist:     Date;
    TurHoraAsist:      string;
    TurIngQuirofano:   Date;
    TurFinQuirofano:   Date;
    TurObservSala:     string;
    TurSalaDestino:    number;
    TurMedEfeEspec:    string;
    TurAGINumInt:      number;
    TurAGInterDirecto: string;
    TurSiglasEstudio:  string;
    TurFecProbInt:     Date;
    TurHoraProInt:     string;
    TurContacto:       string;
    TurDNIPte:         number;
    TurOsCodigo:       number;
    TurProcCodigo:     number;
    TurAsistio:        number;
    TurObservaciones:  string;
    TurNroIntInter:    number;
    TurAsisteMEdCabe:  string;
    TurMedEstudio:     number;
    TurNro:            number;
    TurHoraIni:        Date;
    TurHoraFin:        Date;
    estado:            Estado | null,
    historiaClinica:   HistoriaClinica | null,
    internacion:       Internacion | null,
    obraSocial:        ObraSocial | null
    medico:            Medico | null
}