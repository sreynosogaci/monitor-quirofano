import { DynamicSchedule } from '@/components/dynamic-schedule'
import { getLabelHorario } from '@/lib/monitor'
import { Turno, getSalas, getTurnos } from '@/services/turnos'
import React from 'react'
import { TurnoItem } from './turno-item'

const PruebaPage = async () => {
    // const columns = [
    //     { id: 'monday', label: 'Lunes' },
    //     { id: 'tuesday', label: 'Martes' },
    //     { id: 'wednesday', label: 'Miercoles' },
    //     { id: 'thursday', label: 'Jueves' },
    //     { id: 'friday', label: 'Viernes' },
    //     { id: 'saturday', label: 'Sabado' },
    //     { id: 'sunday', label: 'Domingo' }
    // ]

    const schedules: { label: string }[] = []
    for (let i = 0; i < 24; i++) {
        schedules.push({ label: getLabelHorario(i) })
        schedules.push({ label: getLabelHorario(i + 0.5) })
    }

    const salas  = await getSalas()
    const turnos = await getTurnos()

    return (
        <div className='px-8 h-screen-nav-bar pb-8'>
            <DynamicSchedule<Turno>
                columns        = { salas }
                rows           = { schedules }
                items          = { turnos }
                rowHeight      = { 60 }
                linesPerRow    = { 1 }
                columnAssigner = { (t, c) => t.sala === c.id }
                ItemComponent  = { TurnoItem }
            />
        </div>
    )
}

export default PruebaPage
