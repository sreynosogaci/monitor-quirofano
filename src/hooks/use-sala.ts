import { Sala } from '@/types/sala'
import React, { useEffect } from 'react'

export const useSala = (salaId: number | undefined) => {
    const [sala, setSala] = React.useState<Sala | null>(null)

    useEffect(() => {
        if (salaId) {
            fetch(`/api/salas/${salaId}`)
                .then((res) => res.json())
                .then((data) => setSala(data))
        }
    }, [salaId])

    return sala
}
