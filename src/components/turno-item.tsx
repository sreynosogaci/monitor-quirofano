'use client'

import { getEquivalenciaHorario } from '@/lib/monitor'
import { cn } from '@/lib/utils'
import { Turno } from '@/types/gaci'
import { getDatosTurno } from '@/lib/turno'

type TurnoItemProps = {
    item: Turno;
    linesPerRow: number
    onClick?: (item: Turno) => void
}

const Text = ({ title, content }: { title: string, content: string }) => {
    return (
        <p className="text-[10px]">
            <span className="text-black font-bold">{title}</span>
            {' '}<span className='text-blue-800'>{content}</span>
        </p>
    )

}

export const TurnoItem = ({ item, linesPerRow, onClick }: TurnoItemProps) => {

    const handleClick = () => {
        if (onClick) {
            onClick(item)
        }
    }

    const {
        cama,
        cirugia,
        edad,
        habitacion,
        horaFin,
        horaInicio,
        medicoEspecialidad,
        medicoNombre,
        nroHistoria,
        obraSocial,
        observaciones,
        paciente,
        planCobertura,
        sexo,
        horaIni,
        horaFinal,
        estadoColor
    } = getDatosTurno(item)

    const gridRowStart = getEquivalenciaHorario(horaIni, linesPerRow)
    const gridRowEnd = getEquivalenciaHorario(horaFinal, linesPerRow)


    return (
        <div
            className = "bg-background border border-black/30 rounded-md overflow-hidden [&>*]:text-[10px] shadow-xl"
            style     = {{ gridRowStart, gridRowEnd }}
            onClick   = {handleClick}
        >
            <div
                className={cn(
                    'h-[50px] w-full flex items-center justify-center p-2',
                    'text-black text-sm font-bold text-center bg-slate-500',
                    'overflow-y-auto pretty-scrollbar-y overflow-x-hidden',
                )}
                style={{ backgroundColor: estadoColor }}
            >
                <p>{item.estado ? item.estado.EstTQDsc : 'Sin estado'}</p>
            </div>
            <div className="h-[calc(100%-40px)] w-full p-2 text-xs">
                <Text title='Inicio:' content={horaInicio} />
                <Text title='Fin:' content={horaFin} />
                <Text title='Paciente:' content={`${paciente} (${sexo})`} />
                <div className='flex gap-1'>
                    <Text title='Edad:' content={edad?.toString() || ''} />
                    <Text title='Historia clínica:' content={nroHistoria.toString()} />
                </div>
                <div className='flex gap-1'>
                    <Text title='Internación:' content={nroHistoria.toString()} />
                    <Text title='Habitación/cama:' content={`${habitacion}/${cama}`} />
                </div>
                <Text title='Obra social:' content={obraSocial} />
                <Text title='Plan:' content={planCobertura} />
                <Text title='Cirujano:' content={`${medicoNombre} (${medicoEspecialidad})`} />
                <Text title='Cirugía:' content={cirugia} />
                <Text title='Observaciones:' content={observaciones} />
            </div>
        </div>
    )
}
