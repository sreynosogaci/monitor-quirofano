import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
// import { Button } from '@/components/ui/button'
import { Turno } from '@/types/turno'
import { formatZone } from '@/lib/date'

type DetallesTurnoProps = {
    turnoSeleccionado: Turno | null
    setTurnoSeleccionado: React.Dispatch<React.SetStateAction<Turno | null>>
}

export const DetallesTurno = (props: DetallesTurnoProps) => {
    const { turnoSeleccionado, setTurnoSeleccionado } = props

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setTurnoSeleccionado(null)
        }
    }

    const historiaClinica = turnoSeleccionado?.historiaClinica
    const edadTurnoSeleccionado = historiaClinica?.HCFechaNacim ? new Date().getFullYear() - new Date(historiaClinica.HCFechaNacim).getFullYear() : null
    const medico      = turnoSeleccionado?.medico
    const sexo        = historiaClinica?.HCSexo === 'M' ? 'Masculino' : 'Femenino'
    const inicioTurno = turnoSeleccionado?.TurHoraIni ? formatZone(new Date(turnoSeleccionado.TurHoraIni)) : ''
    const finTurno    = turnoSeleccionado?.TurHoraFin ? formatZone(new Date(turnoSeleccionado.TurHoraFin)) : ''

    return (
        <Sheet open={!!turnoSeleccionado} onOpenChange={handleOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Nro. Historia Clínica: {historiaClinica?.HCNumero}</SheetTitle>
                    <SheetDescription>Datos del turno</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    {/* { JSON.stringify(turnoSeleccionado) } */}
                    {turnoSeleccionado && (
                        <div className="h-full overflow-y-auto pretty-scrollbar-y [&>*]:text-sm">
                            <h3 className="w-20 font-bold">Turno:</h3>
                            <div className="ml-4 text-blue-800 grid grid-cols-[50px_1fr]">
                                <p>Inicio:</p>
                                <p>{inicioTurno}hs</p>
                                <p>Fin:</p>
                                <p>{finTurno}hs</p>
                            </div>
                            <h3 className="w-20 font-bold">Paciente:</h3>
                            <div className="ml-4 text-blue-800">
                                <p>{historiaClinica?.HCNombre} ({sexo}, {edadTurnoSeleccionado})</p>
                                {/* <p>({turnoSeleccionado.paciente.piso}, {turnoSeleccionado.paciente.habitacion}, {turnoSeleccionado.paciente.cama})</p>
                            <p>SUMA, Plan: {turnoSeleccionado.paciente.plan}</p>
                            <p>Nro Afi: {turnoSeleccionado.paciente.nroAfil}</p> */}
                            </div>
                            <h3 className="w-20 font-bold">Profesional:</h3>
                            <div className="ml-4 text-blue-800">
                                <p>
                                    {medico?.MENombre} ({medico?.especialidad?.ESDescripcion})
                                </p>
                            </div>
                            <p className="w-20 font-bold">Estado:</p>
                            <div className="ml-4 text-blue-800">
                                <p>{turnoSeleccionado.estado ? turnoSeleccionado.estado.EstTQDsc : 'Sin estado'}</p>
                            </div>
                            <p className="w-20 font-bold">Adicionales:</p>
                            <div className="ml-4 text-blue-800">
                                <p>{''}</p>
                            </div>
                            <p className="w-20 font-bold">Diag/Obs:</p>
                            <div className="ml-4 text-blue-800">
                                <p>{turnoSeleccionado.TurObservaciones}</p>
                            </div>
                        </div>
                    )}
                </div>
                {/* <SheetFooter>
                    <Button>Cambiar estado</Button>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}
