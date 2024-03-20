import { useToast } from '@/components/ui/use-toast'
import { Sala } from '@/types/gaci'
import { useEffect, useState } from 'react'

export const useSalas = () => {
    const [salas, setSalas] = useState<(Sala & { id: string, label: string })[] | null>(null)
    const { toast } = useToast()

    useEffect(() => {
        const fetchSalas = async () => {
            try {
                const response = await fetch('/api/salas')
                const data = await response.json()
                const newData = data.data.map((sala: Sala) => {
                    return {
                        ...sala,
                        id: sala.SaCodigo,
                        label: sala.SaNombre,
                    }
                })
                setSalas(newData)
            } catch (error) {
                console.log(error)
                toast({
                    title: 'Error',
                    description: 'Ocurrió un error al obtener las salas',
                })
                setSalas([])
            }
        }

        fetchSalas()
    }, [])

    return salas
}
