'use client'

import { getEquivalenciaHorario } from '@/lib/monitor'
import { cn } from '@/lib/utils'
import { Turno, getEstado } from '@/services/turnos'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

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
                        { JSON.stringify(turnoSeleccionado) }
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}
