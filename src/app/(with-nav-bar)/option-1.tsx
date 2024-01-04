import { Monitor } from '@/components/monitor'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { TriangleDownIcon, TriangleLeftIcon } from '@radix-ui/react-icons'
import React from 'react'

export const Option1 = () => {
    const datosTurno = {
        inicioTurno: '02/03/2017 08:00 hs',
        finTurno: '02/03/2017 09:00hs',
        paciente: {
            nombre: 'Juancito Albertito Perez',
            sexo: 'M',
            edad: '29 Años',
            piso: '2DO PISO',
            habitacion: 'Hab: 268',
            cama: 'Cama 2',
            plan: 'BÁSICO',
            nroAfil: '123456 12313 123 12001421'
        },
        profesional: {
            id: '707',
            nombre: 'Pedemera, Gabriel Enrique',
            especialidad: 'Obstetricia'
        },
        estado: 'En Área Quirúrgica',
        adicionales: '',
        diagObs: 'cesarea'
    }

    return (
        <div className='w-full h-screen bg-background flex justify-center items-center p-8'>
            <div className='grid grid-cols-12 h-full w-full grid-rows-[calc(100%-70px)_70px] border rounded-lg'>
                <div className='col-span-3 h-full flex items-center justify-center'>
                    <Calendar className='p-2 border rounded-sm'/>
                </div>
                <div className='col-span-9 h-full relative p-2'>
                    <div className='relative h-3/4 overflow-y-hidden'>
                        <Monitor />
                    </div>
                    <div className='relative h-1/4 py-4'>
                        <div className="absolute h-8 bg-yellow-600 w-64 top-4 right-6"></div>
                        <div className='[&>*]:text-xs h-full overflow-y-auto pretty-scrollbar-y'>
                            <div className='p-1 flex gap-2'>
                                <p className='w-20 font-bold text-right'>Turno:</p>
                                <p className='text-blue-200'>Inicio {datosTurno.inicioTurno} -  Fin {datosTurno.finTurno}</p>
                            </div>
                            <div className='p-1 flex gap-2'>
                                <p className='w-20 font-bold text-right'>Paciente:</p>
                                <div className='text-blue-200'>
                                    <p>(.........., ............) {datosTurno.paciente.nombre} ({datosTurno.paciente.sexo}, {datosTurno.paciente.edad}) ({datosTurno.paciente.piso}, {datosTurno.paciente.habitacion}, {datosTurno.paciente.cama})</p>
                                    <p>SUMA, Plan: {datosTurno.paciente.plan}, Nro Afi: {datosTurno.paciente.nroAfil}</p>
                                </div>
                            </div>
                            <div className='p-1 flex gap-2'>
                                <p className='w-20 font-bold text-right'>Profesional:</p>
                                <p className='text-blue-200'>({datosTurno.profesional.id}) {datosTurno.profesional.nombre} ({datosTurno.profesional.especialidad})</p>
                            </div>
                            <div className='p-1 flex gap-2'>
                                <p className='w-20 font-bold text-right'>Estado:</p>
                                <p className='text-blue-200'>{datosTurno.estado}</p>
                            </div>
                            <div className='p-1 flex gap-2'>
                                <p className='w-20 font-bold text-right'>Adicionales:</p>
                                <p className='text-blue-200'>{datosTurno.adicionales}</p>
                            </div>
                            <div className='p-1 flex gap-2'>
                                <p className='w-20 font-bold text-right'>Diag/Obs:</p>
                                <p className='text-blue-200'>{datosTurno.diagObs}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-span-3 p-1 grid gap-1 grid-cols-1 border-r'>
                    <div className='flex justify-between items-center gap-1'>
                        <Button variant='outline' className='grow h-full p-1 text-xs font-thin'>{'<M'}</Button>
                        <Button variant='outline' className='grow h-full p-1 text-xs font-thin'>{'<S'}</Button>
                        <Button variant='outline' className='grow h-full p-1 text-xs font-thin'>{'<D'}</Button>
                        <Button variant='outline' className='grow h-full p-1 text-xs font-thin'>{'D>'}</Button>
                        <Button variant='outline' className='grow h-full p-1 text-xs font-thin'>{'S>'}</Button>
                        <Button variant='outline' className='grow h-full p-1 text-xs font-thin'>{'M>'}</Button>
                    </div>
                    <div className='flex gap-1'>
                        <Button variant='outline' className='w-[calc(50%-2px)] h-full p-1 text-xs font-thin'>
                            Ir a fecha
                        </Button>
                        <Button variant='outline' className='grow h-full p-1 text-xs font-thin'>
                            Hoy
                        </Button>
                        <Button variant='outline' className='w-6 h-full p-1 text-xs font-thin'>I</Button>
                    </div>
                </div>
                <div className='col-span-9 flex justify-between p-1'>
                    <div className='w-3/5 h-full grid grid-cols-[24px_24px_repeat(6,_1fr)] gap-x-[2px] gap-y-1'>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>
                            <TriangleLeftIcon className='w-4 h-4' />
                        </Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>A</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>+ Turno</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>+ Estado</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>Modificar</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>Borrar</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>Cancelar</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>Turnos canc.</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>
                            <TriangleDownIcon className='w-4 h-4' />
                        </Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>Z</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>+ Reserva</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>-Estado</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>Cortar</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>Pegar</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>Sector</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>Protocolo QX</Button>
                    </div>
                    <div className='w-[80px] h-full grid gap-1'>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>no se</Button>
                        <Button variant='outline' className='w-full h-full p-1 text-xs font-thin'>no se 2</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
