/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils'
import { getEstado, getSalas, getTurnos } from '@/services/turnos'
import React from 'react'

type Props = {
    className?: string
}

export const Monitor = async ({ className }: Props) => {
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

    const salas = await getSalas()
    const turnos = await getTurnos()

    const cntFilasHorarios    = (horarios.length * 2)
    const cntFilasSalas       = horarios.length
    const anchoPrimeraColumna = 80
    const altoFila            = 30
    const altoFilaSala        = altoFila * 2

    return (
        <div className={cn(
            'relative border rounded h-full overflow-x-hidden overflow-y-auto pretty-scrollbar-y px-4',
            className
        )}>
            <div
                className='w-full grid gap-2 border-b h-12 sticky top-0 bg-background z-50'
                style={{ gridTemplateColumns: `${anchoPrimeraColumna}px repeat(${salas.length}, 1fr)` }}
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
            <div
                id       ='lineas'
                className='absolute h-full w-full left-0 top-12 z-0 px-4 grid'
                style    ={{ gridTemplateRows: `repeat(${cntFilasHorarios}, ${altoFila}px)`}}
            >
                {new Array((cntFilasHorarios)).fill(0).map((_, i) => (
                    <div
                        key={i}
                        className='border-b grid h-full'
                        style={{ gridTemplateColumns: `${anchoPrimeraColumna}px repeat(${salas.length}, 1fr)` }}
                    >
                        {salas.map((sala) => (
                            <div key={sala.id} className='border-r w-full h-full'>
                                
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Datos */}
            <div
                className='w-full grid gap-2 h-full'
                style={{ gridTemplateColumns: `${anchoPrimeraColumna}px repeat(${salas.length}, 1fr)` }}
            >
                {/* Horarios */}
                <div
                    id='horarios'
                    className='grid w-full'
                    style={{ gridTemplateRows: `repeat(${cntFilasHorarios}, ${altoFila}px)`}}
                >
                    {horarios.map((hora) => (
                        <>
                            <p key={hora} className={cn(
                                'w-full h-full flex justify-center text-muted-foreground pr-2',
                                'row-span-2 relative p-0 leading-4 '
                            )}>
                                <span style={{ marginTop: `calc((${altoFila}px - 1rem) / 2)`}}>
                                    {getLabelHorario(hora)}
                                </span>
                            </p>
                        </>
                    ))}
                </div>

                {/* Turnos */}
                {salas.map((sala) => (
                    <div 
                        id={sala.id}
                        key={sala.id}
                        className='grid w-full z-40 pr-2 h-full grid-cols-1'
                        style={{ gridTemplateRows: `repeat(${cntFilasSalas}, ${altoFilaSala}px)`}}
                    >
                        { turnos.filter(t => t.sala === sala.id).map((turno) => (
                            <div
                                key={turno.id}
                                className='bg-foreground border rounded-md overflow-hidden'
                                style={{
                                    gridRowStart: getEquivalenciaHorario(turno.horaInicio),
                                    gridRowEnd: getEquivalenciaHorario(turno.horaFin),
                                }}
                            >
                                <div className={cn(
                                    'h-[50px] w-full flex items-center justify-center p-2',
                                    'text-black text-sm font-bold text-center',
                                    'overflow-y-auto pretty-scrollbar-y overflow-x-hidden',
                                    turno.estado === 1 && 'bg-green-400',
                                    turno.estado === 2 && 'bg-yellow-400',
                                    turno.estado === 3 && 'bg-blue-700',
                                    turno.estado === 4 && 'bg-violet-400',
                                    turno.estado === 5 && 'bg-blue-400',
                                    turno.estado === 6 && 'bg-gray-400',
                                )}>
                                    <p>{getEstado(turno.estado as any)}</p>
                                </div>
                                <div className='h-[calc(100%-40px)] w-full p-2'>
                                    <p className='text-muted'>
                                        <span className='font-bold'>Paciente: </span>
                                        {turno.paciente.nombre}
                                    </p>
                                    <p className='text-muted'>
                                        <span className='font-bold'>Profesional: </span>
                                        {turno.profesional.nombre}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
