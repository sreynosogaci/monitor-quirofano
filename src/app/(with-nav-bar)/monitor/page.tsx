'use client'

import { DynamicSchedule } from '@/components/dynamic-schedule'
import { getLabelHorario } from '@/lib/monitor'
import { useMemo } from 'react'
import { TurnoItem } from '@/components/turno-item'
import { useSalas } from '@/hooks/use-salas'
import { useTurnos } from '@/hooks/use-turnos'
import { Spinner } from '@/components/spinner'
import { Turno } from '@/types/gaci'

const Home = () => {
    const fecha = useMemo(() => new Date(), [])
    const schedules: { label: string }[] = []
    for (let i = 0; i < 24; i++) {
        schedules.push({ label: getLabelHorario(i) })
        schedules.push({ label: getLabelHorario(i + 0.5) })
    }

    const salas  = useSalas()
    const turnos = useTurnos(fecha)

    return (
        <div className='flex h-screen gap-2 flex-col'>
            { (turnos && salas) ? (
                <div className='h-full rounded-xl overflow-hidden shadow-2xl'>
                    <DynamicSchedule<Turno>
                        columns         = { salas }
                        rows            = { schedules }
                        items           = { turnos }
                        rowHeight       = { 90 }
                        minColumnWidth  = { 250 }
                        linesPerRow     = { 1 }
                        columnAssigner  = { (t, c) => t.TurSala.toString().trim() === c.id.toString().trim()}
                        ItemComponent   = { TurnoItem }
                        withHeaderLink  = { false }
                        className       = 'bg-muted'
                        headerClassName = 'bg-muted'
                    />
                </div>
            ) : (
                <div className='h-screen w-screen flex items-center justify-center'>
                    <Spinner />
                </div>
            )}
        </div>
    )
}

export default Home
