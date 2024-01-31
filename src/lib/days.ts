'use client'

function rearrangeDays(currentDay: string) {
    const days = [
        { id: '1', label: 'Lunes' },
        { id: '2', label: 'Martes' },
        { id: '3', label: 'Miercoles' },
        { id: '4', label: 'Jueves' },
        { id: '5', label: 'Viernes' },
        { id: '6', label: 'Sabado' },
        { id: '0', label: 'Domingo' },
    ]

    const currentDayIndex = days.findIndex((day) => day.id === currentDay)

    let newDays: typeof days = []
    if (currentDayIndex >= 3) {
        const temp = days.slice(currentDayIndex - 3, currentDayIndex + 1)
        const temp2 = days
            .filter(day => !temp.some((d) => d.id === day.id))
            .sort((a, b) => parseInt(a.id) - parseInt(b.id))
        newDays = [...temp, ...temp2]
    } else {
        const temp = days.slice(0, currentDayIndex + 1)
        const temp2 = days.filter(day => !temp.some((d) => d.id === day.id))
        for (let i = 0; i < (3 - currentDayIndex); i++) {
            const tempDay = temp2.pop()
            if (tempDay) {
                temp.unshift(tempDay)
            }
        }
        newDays = [...temp, ...temp2]
    }

    return newDays
}

export const getDays = (baseDate: Date) => {
    // Necesito acomodar estos dias dejando al dia actual en el medio por ejemplo,
    // Si hoy es martes, deberia quedar asi:
    // [
    //     { id: '6', label: 'Sabado' },
    //     { id: '0', label: 'Domingo' },
    //     { id: '1', label: 'Lunes' },
    //     { id: '2', label: 'Martes' },
    //     { id: '3', label: 'Miercoles' },
    //     { id: '4', label: 'Jueves' },
    //     { id: '5', label: 'Viernes' }
    // ]

    const newDays = rearrangeDays(baseDate.getDay().toString())

    return newDays
}
