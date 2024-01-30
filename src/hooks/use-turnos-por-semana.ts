import { useToast } from '@/components/ui/use-toast'
import { Turno } from '@/types/turno'
import { addDays, format } from 'date-fns'
import { useEffect, useState } from 'react'

export const useTurnosPorSemana = (date: Date | undefined) => {
    const [turnos, setTurnos] = useState<(Turno & { dateToCompare: Date })[] | null>(null)
    const { toast } = useToast()
    
    useEffect(() => {
        const dateToUse = date || new Date()

        const fetchTurnos = async (currentDate: Date) => {
            try {
                console.log(`Obtengo turnos con ${currentDate}`)
                const formattedDate = format(currentDate, 'yyyy-MM-dd')
                const response = await fetch(`/api/turnos?date=${formattedDate}`)
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

        const promises: Promise<Turno[]>[] = []
        for (let i = -3; i <= 3; i++) {
            const currentDate = addDays(dateToUse, i)
            promises.push(fetchTurnos(currentDate))
        }

        Promise.all(promises).then((data) => {
            const newTurnos: (Turno & { dateToCompare: Date })[] = []
            data.forEach((turnos, idx) => {
                const converted: (Turno & { dateToCompare: Date })[] = turnos.map((turno) => ({
                    ...turno,
                    dateToCompare: addDays(dateToUse, -3 + idx),
                }))
                newTurnos.push(...converted)
            })
            setTurnos(newTurnos)
        })

    }, [date])

    return turnos
}
