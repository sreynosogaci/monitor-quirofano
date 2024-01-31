'use client'

import { getEquivalenciaHorario } from '@/lib/monitor'
import { cn } from '@/lib/utils'
import { Turno } from '@/types/turno'
import { EstadoEnum } from '@/types/estado'

type TurnoItemProps = {
    item: Turno;
    linesPerRow: number
    onClick?: (item: Turno) => void
}

export const TurnoItem = ({ item, linesPerRow, onClick }: TurnoItemProps) => {

    const handleClick = () => {
        if (onClick) {
            onClick(item)
        }
    }

    let horaIni = new Date(item.TurHoraIni).getUTCHours()
    let horaFin = new Date(item.TurHoraFin).getUTCHours()
    const minutosIni = new Date(item.TurHoraIni).getUTCMinutes()
    const minutosFin = new Date(item.TurHoraFin).getUTCMinutes()

    if (minutosIni === 30) {
        horaIni += 0.5
    }
    if (minutosFin === 30) {
        horaFin += 0.5
    }

    const gridRowStart = getEquivalenciaHorario(horaIni, linesPerRow)
    const gridRowEnd = getEquivalenciaHorario(horaFin, linesPerRow)

    const historiaClinica = item.historiaClinica
    // const edad = historiaClinica?.HCFechaNacim ? new Date().getFullYear() - new Date(historiaClinica.HCFechaNacim).getFullYear() : null
    const medico = item.medico
    // const sexo = historiaClinica?.HCSexo === 'M' ? 'Masculino' : 'Femenino'

    return (
        <div
            className = "bg-background border border-black/30 rounded-md overflow-hidden [&>*]:text-xs shadow-xl"
            style     = {{ gridRowStart, gridRowEnd }}
            onClick   = {handleClick}
        >
            <div
                className={cn(
                    'h-[50px] w-full flex items-center justify-center p-2',
                    'text-black text-sm font-bold text-center',
                    'overflow-y-auto pretty-scrollbar-y overflow-x-hidden',
                    'bg-slate-500',
                    item.estado?.EstTQCod === EstadoEnum.ADMITIDO && 'bg-yellow-400',
                    item.estado?.EstTQCod === EstadoEnum.PREADMITIDO && 'bg-blue-700',
                    item.estado?.EstTQCod === EstadoEnum['EN AREA QUIRÚRGICA'] && 'bg-green-400',
                    item.estado?.EstTQCod === EstadoEnum.RESERVADO && 'bg-gray-600',
                )}
            >
                <p>{item.estado ? item.estado.EstTQDsc : 'Sin estado'}</p>
            </div>
            <div className="h-[calc(100%-40px)] w-full p-2">
                <p>
                    <span className="font-bold">Pac: </span>
                    {historiaClinica?.HCApeSol?.trim()}, {historiaClinica?.HCNombre?.trim()}
                </p>
                <p>
                    <span className="font-bold">Profesional: </span>
                    {medico?.MENombre} ({medico?.especialidad?.ESDescripcion})
                </p>
            </div>
        </div>
    )
}
