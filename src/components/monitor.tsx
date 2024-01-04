import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    className?: string
}

export const Monitor = ({ className }: Props) => {
    const getLabelHorario = (hora: number) => {
        if (hora - Math.floor(hora) === 0.5) {
            if (hora < 10) return `0${Math.floor(hora)}:30`
            return `${Math.floor(hora)}:30`
        } else {
            if (hora < 10) return `0${hora}:00`
            return `${hora}:00`
        }
    }

    const getEquivalenciaHorario = (hora: number) => {
        return (hora * 2) + 1
    }

    const horarios: number[] = []
    for (let i = 0; i < 24; i++) {
        horarios.push(i)
        horarios.push(i + 0.5)
    }

    const salas = [
        { id: 'sala1', label: 'Sala 1' },
        { id: 'sala2', label: 'Sala 2' },
        { id: 'sala3', label: 'Sala 3' },
        { id: 'sala4', label: 'Sala 4' },
        { id: 'sala5', label: 'Sala 5' },
    ]

    const turnos = [
        { id: 'turno1', label: 'Turno 1', sala: 'sala1', horaInicio: 1, horaFin: 10 },
        { id: 'turno2', label: 'Turno 2', sala: 'sala2', horaInicio: 9.5, horaFin: 11.5 },
        { id: 'turno3', label: 'Turno 3', sala: 'sala3', horaInicio: 10, horaFin: 12.5 },
        { id: 'turno4', label: 'Turno 4', sala: 'sala4', horaInicio: 11, horaFin: 13 },
        { id: 'turno5', label: 'Turno 5', sala: 'sala5', horaInicio: 23.5, horaFin: 25 },
    ]


    const firstColumnWidth = 80
    const rowHeight = 50

    return (
        <div className={cn(
            'relative border rounded h-full overflow-x-hidden overflow-y-auto pretty-scrollbar-y px-4',
            className
        )}>
            <div
                className='w-full grid gap-2 border-b h-12 sticky top-0 bg-background z-50'
                style={{ gridTemplateColumns: `${firstColumnWidth}px repeat(${salas.length}, 1fr)` }}
            >
                <p className='text-sm font-bold text-end flex items-center justify-center text-muted-foreground'>Horario</p>
                {salas.map((sala) => (
                    <p
                        key={sala.id}
                        className='text-sm font-bold flex items-center justify-center text-muted-foreground'
                    >
                        {sala.label}
                    </p>
                ))}
            </div>
            {/* Líneas */}
            <div className={`absolute w-full left-0 top-12 z-0 px-4 grid grid-rows-[repeat(49,${rowHeight}px)]`}>
                {new Array(49).fill(0).map((_, i) => (
                    <div
                        key={i}
                        className='border-b grid'
                        style={{ gridTemplateColumns: `${firstColumnWidth}px repeat(${salas.length}, 1fr)` }}
                    >
                        {salas.map((sala) => (
                            <div key={sala.id} className='border-r'></div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Datos */}
            <div
                className='w-full grid gap-2'
                style={{ gridTemplateColumns: `${firstColumnWidth}px repeat(${salas.length}, 1fr)` }}
            >
                <div
                    id='columna-horarios'
                    className={`grid grid-rows-[repeat(49,${rowHeight}px)] w-full`}
                >
                    {horarios.map((hora) => (
                        <>
                            <p className='text-end w-full flex items-center justify-center text-muted-foreground pr-2'>
                                {getLabelHorario(hora)}
                            </p>
                        </>
                    ))}
                </div>
                {salas.map((sala) => (
                    <div key={sala.id} className={`grid grid-rows-[repeat(49,${rowHeight}px)] w-full z-40 pr-2`}>
                        {turnos.filter(t => t.sala === sala.id).map((turno) => (
                            <div
                                key={turno.id}
                                className='bg-red-400 rounded-md'
                                style={{
                                    gridRowStart: getEquivalenciaHorario(turno.horaInicio),
                                    gridRowEnd: getEquivalenciaHorario(turno.horaFin),
                                }}
                            >
                                <p className='text-center flex items-center justify-center text-muted-foreground'>
                                    {turno.label}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
