'use client'

import { DynamicSchedule } from '@/components/dynamic-schedule'
import { getLabelHorario } from '@/lib/monitor'
import React, { useRef } from 'react'
import { TurnoItem } from '@/components/turno-item'
import { useSalas } from '@/hooks/use-salas'
import { useTurnos } from '@/hooks/use-turnos'
import { Turno } from '@/types/turno'
import { Spinner } from '@/components/spinner'

const Home = () => {
    const schedules: { label: string }[] = []
    for (let i = 0; i < 24; i++) {
        schedules.push({ label: getLabelHorario(i) })
        schedules.push({ label: getLabelHorario(i + 0.5) })
    }

    const { current: date } = useRef(new Date('2024-01-29'))

    const salas  = useSalas()
    const turnos = useTurnos(date)

    return (
        <div className='px-8 h-screen-nav-bar pb-8'>
            { (turnos && salas) ? (
                <DynamicSchedule<Turno>
                    columns        = { salas }
                    rows           = { schedules }
                    items          = { turnos }
                    rowHeight      = { 30 }
                    linesPerRow    = { 2 }
                    columnAssigner = { (t, c) => t.TurSala.toString().trim() === c.id.toString().trim()}
                    ItemComponent  = { TurnoItem }
                    withHeaderLink = { true }
                />
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default Home
