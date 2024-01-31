import { getDays } from '@/lib/days'
import { useEffect, useState } from 'react'

export const useDays = (filtroFecha: Date | undefined) => {
    const [days, setDays] = useState<{ id: string, label: string }[] | null>(null)

    useEffect(() => {
        setDays(getDays(filtroFecha || new Date()))
    }, [filtroFecha])

    return days
}
