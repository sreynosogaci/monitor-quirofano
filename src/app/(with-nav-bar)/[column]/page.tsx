'use client'

import { useSala } from '@/hooks/use-sala'
import { DynamicSchedule } from '@/components/dynamic-schedule'
import { TurnoItem } from '@/components/turno-item'
import { getLabelHorario } from '@/lib/monitor'
import { Turno } from '@/types/gaci'
import React, { useState } from 'react'
import { FiltroFecha } from '@/components/filtro-fecha'
import { format } from 'date-fns'
import { useTurnosPorSemana } from '@/hooks/use-turnos-por-semana'
import { Spinner } from '@/components/spinner'
import { Skeleton } from '@/components/ui/skeleton'
import { useDays } from '@/hooks/use-days'
import { useDetalleTurnoModal } from '@/hooks/modals/use-detalle-turno-modal'

const ColumnPage = ({ params }: { params: { column: string } }) => {
    const { column } = params
    const [filtroFecha, setFiltroFecha] = useState<Date | undefined>()

    const schedules: { label: string }[] = []
    for (let i = 0; i < 24; i++) {
        schedules.push({ label: getLabelHorario(i) })
        schedules.push({ label: getLabelHorario(i + 0.5) })
    }

    const days   = useDays(filtroFecha)
    const sala   = useSala(+column)
    const turnos = useTurnosPorSemana(sala, filtroFecha)

    const columnAssigner = (turno: Turno, dia: { id: string, label:string }) => {
        const diaTurno = turno.Turfecha ? new Date(turno.Turfecha).getUTCDay() : 0 
        const diaId = dia.id
        return diaTurno === +diaId
    }

    const onOpen = useDetalleTurnoModal((state) => state.onOpen)

    const openDetallesTurno = (turno: Turno) => {
        onOpen(turno)
    }

    return (
        <div className='px-8 py-8 flex h-screen gap-2 flex-col w-full'>
            <div className='relative flex gap-4 h-[10%] items-center w-full'>
                <div className='w-[250px]'>
                    { sala ? (
                        <h1 className='text-2xl font-bold'>{sala?.SaCodigo}, {sala?.SaNombre}</h1>
                    ) : (
                        <Skeleton className='w-[250px] h-[30px]'/>
                    )}
                </div>
                <div className='flex gap-4 items-center'>
                    <FiltroFecha date={filtroFecha} setDate={setFiltroFecha} />
                    <p>Fecha actual: {format(filtroFecha || new Date(), 'dd/MM/yyyy')}</p>
                </div>
            </div>
            { (sala && turnos && days) ? (
                <div className='h-[90%] rounded-xl overflow-hidden shadow-2xl'>
                    <DynamicSchedule<Turno>
                        columns         = { days }
                        rows            = { schedules }
                        items           = { turnos }
                        rowHeight       = { 90 }
                        minColumnWidth  = { 200 }
                        linesPerRow     = { 1 }
                        columnAssigner  = { columnAssigner }
                        ItemComponent   = { TurnoItem }
                        withHeaderLink  = { false }
                        itemOnClick     = { openDetallesTurno }
                        headerClassName = 'bg-muted'
                        className       = 'bg-muted'
                    />
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default ColumnPage
