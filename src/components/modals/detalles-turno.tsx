import React, { PropsWithChildren } from 'react'
import { Modal } from '../ui/modal'
import { useDetalleTurnoModal } from '@/hooks/modals/use-detalle-turno-modal'
import { getDatosTurno } from '@/lib/turno'
import { cn } from '@/lib/utils'

const Text = ({ title, content }: { title: string, content: string }) => {
    return (
        <p className="text-[14px]">
            <span className="text-black font-bold">{title}</span>
            {' '}<span className='text-blue-800'>{content}</span>
        </p>
    )
}

const Agrupador = ({ children }: PropsWithChildren) => {
    return (
        <div className='grid grid-flow-col auto-cols-[200px] gap-2'>
            {children}
        </div>
    )
}

export const DetallesTurnoModal = () => {
    const { isOpen, onClose, turno } = useDetalleTurnoModal((state) => ({
        isOpen: state.isOpen,
        onClose: state.onClose,
        turno: state.turno
    }))

    const datosTurno = getDatosTurno(turno)

    if (!datosTurno) {
        return null
    }

    const {
        cama,
        cirugia,
        edad,
        habitacion,
        horaFin,
        horaInicio,
        medicoEspecialidad,
        medicoNombre,
        nroHistoria,
        obraSocial,
        observaciones,
        paciente,
        planCobertura,
        sexo,
        estado,
        estadoColor
    } = datosTurno

    return (
        <Modal
            title="Detalle del Turno"
            description="Información del turno seleccionado."
            isOpen={isOpen}
            onClose={onClose}
        >
            { datosTurno && (
                <div className='w-[600px]'>
                    <div
                        className={cn(
                            'h-[50px] w-full flex items-center justify-center p-2',
                            'text-black text-sm font-bold text-center bg-slate-500',
                            'overflow-y-auto pretty-scrollbar-y overflow-x-hidden',
                        )}
                        style={{ backgroundColor: estadoColor }}
                    >
                        <p>{estado || 'Sin estado'}</p>
                    </div>
                    <div className='mt-4 flex flex-col gap-2'>
                        <Agrupador>
                            <Text title='Inicio:' content={horaInicio} />
                            <Text title='Fin:' content={horaFin} />
                        </Agrupador>
                        <Text title='Paciente:' content={`${paciente} (${sexo})`} />
                        <Agrupador>
                            <Text title='Edad:' content={edad?.toString() || ''} />
                            <Text title='Historia clínica:' content={nroHistoria.toString()} />
                        </Agrupador>
                        <Agrupador>
                            <Text title='Internación:' content={nroHistoria.toString()} />
                            <Text title='Habitación:' content={habitacion.toString()} />
                            <Text title='Cama:' content={cama.toString()} />
                        </Agrupador>
                        <Agrupador>
                            <Text title='Obra social:' content={obraSocial} />
                            <Text title='Plan:' content={planCobertura} />
                        </Agrupador>
                        <Text title='Cirujano:' content={`${medicoNombre} (${medicoEspecialidad})`} />
                        <Text title='Cirugía:' content={cirugia} />
                        <Text title='Observaciones:' content={observaciones} />
                    </div>
                </div>
            )}
        </Modal>
    )
}
