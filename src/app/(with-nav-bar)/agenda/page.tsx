'use client'

import { DynamicSchedule } from '@/components/dynamic-schedule'
import { getLabelHorario } from '@/lib/monitor'
import { useState } from 'react'
import { TurnoItem } from '@/components/turno-item'
import { useSalas } from '@/hooks/use-salas'
import { useTurnos } from '@/hooks/use-turnos'
import { Spinner } from '@/components/spinner'
import { FiltroFecha } from '@/components/filtro-fecha'
import { format } from 'date-fns'
import { Turno } from '@/types/gaci'
import { useDetalleTurnoModal } from '@/hooks/modals/use-detalle-turno-modal'

const Home = () => {
    const [filtroFecha, setFiltroFecha] = useState<Date | undefined>()
    const schedules: { label: string }[] = []
    for (let i = 0; i < 24; i++) {
        schedules.push({ label: getLabelHorario(i) })
        schedules.push({ label: getLabelHorario(i + 0.5) })
    }

    const salas  = useSalas()
    const turnos = useTurnos(filtroFecha)

    const onOpen = useDetalleTurnoModal((state) => state.onOpen)

    const openDetallesTurno = (turno: Turno) => {
        onOpen(turno)
    }

    return (
        <div className='px-8 py-8 flex h-screen gap-2 flex-col'>
            <div className='flex gap-4 h-[10%] items-center'>
                <FiltroFecha date={filtroFecha} setDate={setFiltroFecha} />
                <p>Fecha actual: {format(filtroFecha || new Date(), 'dd/MM/yyyy')}</p>
            </div>
            { (turnos && salas) ? (
                <div className='h-[90%] rounded-xl overflow-hidden shadow-2xl'>
                    <DynamicSchedule<Turno>
                        columns         = { salas }
                        rows            = { schedules }
                        items           = { turnos }
                        rowHeight       = { 90 }
                        minColumnWidth  = { 250 }
                        linesPerRow     = { 1 }
                        columnAssigner  = { (t, c) => t.TurSala.toString().trim() === c.id.toString().trim()}
                        ItemComponent   = { TurnoItem }
                        withHeaderLink  = { true }
                        itemOnClick     = { openDetallesTurno }
                        className       = 'bg-muted'
                        headerClassName = 'bg-muted'
                    />
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default Home
