import { useToast } from '@/components/ui/use-toast'
import { Sala } from '@/types/sala'
import { Turno } from '@/types/turno'
import { addDays, format } from 'date-fns'
import { useEffect, useState } from 'react'

export const useTurnosPorSemana = (sala: Sala | null, date: Date | undefined) => {
    const [turnos, setTurnos] = useState<Turno[] | null>(null)
    const { toast } = useToast()
    
    useEffect(() => {
        const dateToUse = date || new Date()

        const fetchTurnos = async (salaId: number, currentDate: Date) => {
            try {
                const formattedDate = format(currentDate, 'yyyy-MM-dd')
                const response = await fetch(`/api/salas/${salaId}/turnos?date=${formattedDate}`)
                const data = await response.json()

                return data.data
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Ocurrió un error al obtener los turnos',
                })
                console.error(error)
                return []
            }
        }

        if (!sala) {
            return
        }
        
        setTurnos([])

        const promises: Promise<Turno[]>[] = []
        for (let i = -3; i <= 3; i++) {
            const currentDate = addDays(dateToUse, i)
            promises.push(fetchTurnos(sala.SaCodigo, currentDate))
        }

        Promise.all(promises).then((data) => {
            const newTurnos: Turno[] = []
            data.forEach((turnos) => {
                newTurnos.push(...turnos)
            })
            setTurnos(newTurnos)
        })

    }, [sala, date])

    return turnos
}
