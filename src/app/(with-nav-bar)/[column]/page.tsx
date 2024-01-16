import { DynamicSchedule } from '@/components/dynamic-schedule'
import { TurnoItem } from '@/components/turno-item'
import { getLabelHorario } from '@/lib/monitor'
import { Turno, getTurnos } from '@/services/turnos'
import React from 'react'

const ColumnPage = async ({ params }: { params: { column: string } }) => {
    const { column } = params

    const days = [
        { id: 'monday', label: 'Lunes' },
        { id: 'tuesday', label: 'Martes' },
        { id: 'wednesday', label: 'Miercoles' },
        { id: 'thursday', label: 'Jueves' },
        { id: 'friday', label: 'Viernes' },
        { id: 'saturday', label: 'Sabado' },
        { id: 'sunday', label: 'Domingo' }
    ]

    const schedules: { label: string }[] = []
    for (let i = 0; i < 24; i++) {
        schedules.push({ label: getLabelHorario(i) })
        schedules.push({ label: getLabelHorario(i + 0.5) })
    }

    const turnos = await getTurnos(column)

    return (
        <div className='px-8 pb-8 h-full'>
            <h1 className='text-2xl font-bold mb-4'>{column}</h1>
            <div className='h-screen-nav-bar max-h-[600px]'>
                <DynamicSchedule<Turno>
                    columns        = { days }
                    rows           = { schedules }
                    items          = { turnos }
                    rowHeight      = { 30 }
                    linesPerRow    = { 2 }
                    columnAssigner = { (t, c) => c.id === 'wednesday' }
                    ItemComponent  = { TurnoItem }
                />
            </div>
        </div>
    )
}

export default ColumnPage
