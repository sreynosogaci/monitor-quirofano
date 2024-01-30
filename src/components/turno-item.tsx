'use client'

import { getEquivalenciaHorario } from '@/lib/monitor'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useState } from 'react'
import { Turno } from '@/types/turno'
import { format } from 'date-fns'
import { EstadoEnum } from '@/types/estado'
import { Button } from './ui/button'

export const TurnoItem = ({ item, linesPerRow }: { item: Turno; linesPerRow: number }) => {
    const [turnoSeleccionado, setTurnoSeleccionado] = useState<Turno | null>(null)

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setTurnoSeleccionado(null)
        }
    }

    const horaIni = parseInt(format(item.TurHoraIni, 'H'))
    const horaFin = parseInt(format(item.TurHoraFin, 'H'))

    const gridRowStart = getEquivalenciaHorario(horaIni, linesPerRow)
    const gridRowEnd = getEquivalenciaHorario(horaFin, linesPerRow)


    return (
        <>
            <div
                className = "bg-foreground border rounded-md overflow-hidden"
                style     = {{ gridRowStart, gridRowEnd }}
                onClick   = {() => setTurnoSeleccionado(item)}
            >
                <div
                    className={cn(
                        'h-[50px] w-full flex items-center justify-center p-2',
                        'text-black text-sm font-bold text-center',
                        'overflow-y-auto pretty-scrollbar-y overflow-x-hidden',
                        'bg-slate-500',
                        item.estado?.EstTQCod === EstadoEnum.ADMITIDO && 'bg-yellow-400',
                        item.estado?.EstTQCod === EstadoEnum.PREADMITIDO && 'bg-blue-700',
                        item.estado?.EstTQCod === EstadoEnum['EN AREA QUIRÚRGICA'] && 'bg-green-400',
                        item.estado?.EstTQCod === EstadoEnum.RESERVADO && 'bg-gray-600',
                    )}
                >
                    <p>{item.estado ? item.estado.EstTQDsc : 'Sin estado'}</p>
                </div>
                <div className="h-[calc(100%-40px)] w-full p-2">
                    <p className="text-muted">
                        <span className="font-bold">Paciente: </span>
                        {'Paciente nombre'}
                    </p>
                    <p className="text-muted">
                        <span className="font-bold">Profesional: </span>
                        {'Profesional nombre'}
                    </p>
                </div>
            </div>
            <Sheet open={!!turnoSeleccionado} onOpenChange={handleOpenChange}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>DNI Paciente: {item.TurDNIPte}</SheetTitle>
                        <SheetDescription>
                            Datos del turno
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        {/* { JSON.stringify(turnoSeleccionado) } */}
                        { turnoSeleccionado && (
                            <div className='h-full overflow-y-auto pretty-scrollbar-y [&>*]:text-sm'>
                                <h3 className='w-20 font-bold'>Turno:</h3>
                                <div className='ml-4 text-blue-200 grid grid-cols-[50px_1fr]'>
                                    <p>Inicio:</p>
                                    <p>{format(turnoSeleccionado.TurHoraIni, 'dd/MM/yyyy HH:mm')}hs</p>
                                    <p>Fin:</p>
                                    <p>{format(turnoSeleccionado.TurHoraFin, 'dd/MM/yyyy HH:mm')}hs</p>
                                </div>
                                <h3 className='w-20 font-bold'>Paciente:</h3>
                                {/* <div className='ml-4 text-blue-200'>
                                    <p>{turnoSeleccionado.paciente.nombre} ({turnoSeleccionado.paciente.sexo}{turnoSeleccionado.paciente.edad})</p>
                                    <p>({turnoSeleccionado.paciente.piso}, {turnoSeleccionado.paciente.habitacion}, {turnoSeleccionado.paciente.cama})</p>
                                    <p>SUMA, Plan: {turnoSeleccionado.paciente.plan}</p>
                                    <p>Nro Afi: {turnoSeleccionado.paciente.nroAfil}</p>
                                </div> */}
                                <h3 className='w-20 font-bold'>Profesional:</h3>
                                {/* <div className='ml-4 text-blue-200'>
                                    <p>({turnoSeleccionado.profesional.id}) {turnoSeleccionado.profesional.nombre} ({turnoSeleccionado.profesional.especialidad})</p>
                                </div> */}
                                <p className='w-20 font-bold'>Estado:</p>
                                <div className='ml-4 text-blue-200'>
                                    <p>{turnoSeleccionado.estado ? turnoSeleccionado.estado.EstTQDsc : 'Sin estado'}</p>
                                </div>
                                <p className='w-20 font-bold'>Adicionales:</p>
                                <div className='ml-4 text-blue-200'>
                                    <p>{''}</p>
                                </div>
                                <p className='w-20 font-bold'>Diag/Obs:</p>
                                <div className='ml-4 text-blue-200'>
                                    <p>{turnoSeleccionado.TurObservaciones}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <SheetFooter>
                        <Button>
                            Cambiar estado
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}
