import { Colors } from '@/constants/colors'
import { EstadoEnum } from '@/types/estado'

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

export const getEstadoColor = (estado: string) => {
    switch (estado) {
        case EstadoEnum.RESERVADO: return Colors.reservado
        case EstadoEnum.PREADMITIDO: return Colors.admitido
        case EstadoEnum.PRESENTE: return Colors.presente
        case EstadoEnum.ADMITIDO: return Colors.admitido
        case EstadoEnum.PREPARADO: return Colors.preparado
        case EstadoEnum.SOLICITADO: return Colors.solicitado
        case EstadoEnum['EN AREA QUIRÚRGICA']: return Colors.enAreaQuirurgica
        case EstadoEnum['INGRESO A QUIRÓFANO']: return Colors.ingresoAQuirofano
        case EstadoEnum['INICIO DE ANESTESIA']: return Colors.inicioDeAnestesia
        case EstadoEnum['INICIO DE PROCEDIMIENTO']: return Colors.inicioDeProcedimiento
        case EstadoEnum['FIN DE PROCEDIMIENTO']: return Colors.finDelProcedimiento
        case EstadoEnum['FIN DE ANESTESIA']: return Colors.finDeLaAnestesia
        case EstadoEnum['FUERA DE AREA QUIRÚRGICA']: return Colors.fueraDeAreaQuirurgica
    }
}