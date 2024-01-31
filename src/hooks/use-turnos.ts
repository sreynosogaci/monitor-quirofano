import { useToast } from '@/components/ui/use-toast'
import { Turno } from '@/types/turno'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export const useTurnos = (date: Date | undefined) => {
    const [turnos, setTurnos] = useState<Turno[] | null>(null)
    const { toast } = useToast()
    
    useEffect(() => {
        setTurnos([])

        const fetchTurnos = async () => {
            try {
                const formattedDate = format(date || new Date(), 'yyyy-MM-dd')
                const response = await fetch(`/api/turnos?date=${formattedDate}`)
                const data = await response.json()

                setTurnos(data.data)
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Ocurrió un error al obtener los turnos',
                })
                console.error(error)
                setTurnos([])
            }
        }

        fetchTurnos()
    }, [date])

    return turnos
}
