import { useSala } from '@/hooks/use-sala'
import { DynamicSchedule } from '@/components/dynamic-schedule'
import { TurnoItem } from '@/components/turno-item'
import { getLabelHorario } from '@/lib/monitor'
import { Turno } from '@/types/turno'
import React, { useState } from 'react'
import { DetallesTurno } from '../detalles-turno'
import { FiltroFecha } from '../filtro-fecha'
import { format } from 'date-fns'
import { useTurnosPorSemana } from '@/hooks/use-turnos-por-semana'
import { Spinner } from '@/components/spinner'

const ColumnPage = async ({ params }: { params: { column: string } }) => {
    const [filtroFecha, setFiltroFecha] = useState<Date | undefined>()
    const [turnoSeleccionado, setTurnoSeleccionado] = useState<Turno | null>(null)
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

    const sala   = useSala(+column)
    const turnos = useTurnosPorSemana(filtroFecha)

    console.log(turnos)

    return (
        <div className='px-8 pb-8 h-full'>
            <div className='flex gap-4 h-[10%] items-center'>
                <h1 className='text-2xl font-bold mb-4'>{column}</h1>
                <FiltroFecha date={filtroFecha} setDate={setFiltroFecha} />
                <p>Fecha actual: {format(filtroFecha || new Date(), 'dd/MM/yyyy')}</p>
            </div>
            <div className='h-full'>
                { !sala || !turnos ? (
                    <>
                        {/* <DynamicSchedule<Turno>
                            columns         = { days }
                            rows            = { schedules }
                            items           = { turnos }
                            rowHeight       = { 50 }
                            linesPerRow     = { 1 }
                            columnAssigner  = { (t, c) => t. === c.id.toString().trim()}
                            ItemComponent   = { TurnoItem }
                            withHeaderLink  = { true }
                            itemOnClick     = { setTurnoSeleccionado }
                        />
                        <DetallesTurno
                            turnoSeleccionado    = { turnoSeleccionado }
                            setTurnoSeleccionado = { setTurnoSeleccionado }
                        /> */}
                    </>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    )
}

export default ColumnPage
