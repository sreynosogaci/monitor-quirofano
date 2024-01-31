import { Sala } from '@/types/sala'
import React, { useEffect } from 'react'

export const useSala = (salaId: number | undefined) => {
    const [sala, setSala] = React.useState<Sala | null>(null)

    useEffect(() => {
        if (salaId) {
            const url = `/api/salas/${salaId}`
            fetch(url)
                .then((res) => res.json())
                .then((data) => setSala(data.data))
        }
    }, [salaId])

    return sala
}
