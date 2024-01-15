'use client'

import { getEquivalenciaHorario } from '@/lib/monitor'
import { cn } from '@/lib/utils'
import { Turno, getEstado } from '@/services/turnos'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { useState } from 'react'

export const TurnoItem = ({ item, linesPerRow }: { item: Turno; linesPerRow: number }) => {
    const [turnoSeleccionado, setTurnoSeleccionado] = useState<null | Turno>(null)

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setTurnoSeleccionado(null)
        }
    }

    return (
        <>
            <div
                key={item.id}
                className="bg-foreground border rounded-md overflow-hidden"
                style={{
                    gridRowStart: getEquivalenciaHorario(item.horaInicio, linesPerRow),
                    gridRowEnd: getEquivalenciaHorario(item.horaFin, linesPerRow),
                }}
                onClick={() => setTurnoSeleccionado(item)}
            >
                <div
                    className={cn(
                        'h-[50px] w-full flex items-center justify-center p-2',
                        'text-black text-sm font-bold text-center',
                        'overflow-y-auto pretty-scrollbar-y overflow-x-hidden',
                        item.estado === 1 && 'bg-green-400',
                        item.estado === 2 && 'bg-yellow-400',
                        item.estado === 3 && 'bg-blue-700',
                        item.estado === 4 && 'bg-violet-400',
                        item.estado === 5 && 'bg-blue-400',
                        item.estado === 6 && 'bg-gray-400'
                    )}
                >
                    <p>{getEstado(item.estado)}</p>
                </div>
                <div className="h-[calc(100%-40px)] w-full p-2">
                    <p className="text-muted">
                        <span className="font-bold">Paciente: </span>
                        {item.paciente.nombre}
                    </p>
                    <p className="text-muted">
                        <span className="font-bold">Profesional: </span>
                        {item.profesional.nombre}
                    </p>
                </div>
            </div>
            <Sheet open={!!turnoSeleccionado} onOpenChange={handleOpenChange}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you are done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        {/* { JSON.stringify(turnoSeleccionado) } */}
                        { turnoSeleccionado && (
                            <div className='h-full overflow-y-auto pretty-scrollbar-y [&>*]:text-sm'>
                                <h3 className='w-20 font-bold'>Turno:</h3>
                                <div className='ml-4 text-blue-200'>
                                    <p>Inicio {turnoSeleccionado.inicioTurno}</p>
                                    <p>Fin {turnoSeleccionado.finTurno}</p>
                                </div>
                                <h3 className='w-20 font-bold'>Paciente:</h3>
                                <div className='ml-4 text-blue-200'>
                                    <p>{turnoSeleccionado.paciente.nombre} ({turnoSeleccionado.paciente.sexo}{turnoSeleccionado.paciente.edad})</p>
                                    <p>({turnoSeleccionado.paciente.piso}, {turnoSeleccionado.paciente.habitacion}, {turnoSeleccionado.paciente.cama})</p>
                                    <p>SUMA, Plan: {turnoSeleccionado.paciente.plan}</p>
                                    <p>Nro Afi: {turnoSeleccionado.paciente.nroAfil}</p>
                                </div>
                                <h3 className='w-20 font-bold'>Profesional:</h3>
                                <div className='ml-4 text-blue-200'>
                                    <p>({turnoSeleccionado.profesional.id}) {turnoSeleccionado.profesional.nombre} ({turnoSeleccionado.profesional.especialidad})</p>
                                </div>
                                <p className='w-20 font-bold'>Estado:</p>
                                <div className='ml-4 text-blue-200'>
                                    <p>{turnoSeleccionado.estado}</p>
                                </div>
                                <p className='w-20 font-bold'>Adicionales:</p>
                                <div className='ml-4 text-blue-200'>
                                    <p>{turnoSeleccionado.adicionales}</p>
                                </div>
                                <p className='w-20 font-bold'>Diag/Obs:</p>
                                <div className='ml-4 text-blue-200'>
                                    <p>{turnoSeleccionado.diagObs}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter> */}
                </SheetContent>
            </Sheet>
        </>
    )
}
