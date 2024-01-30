import { Estado } from './estado'

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
    estado:            Estado | null
}