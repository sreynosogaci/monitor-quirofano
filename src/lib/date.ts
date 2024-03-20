import { format } from 'date-fns'

// const zonaHoraria = 'America/Buenos_Aires'
export const formatZone = (date: Date) => {
    console.log(date)
    const pattern = 'dd/MM/yyyy'
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`
    const formattedData = `${format(date, pattern)} ${hoursString}:${minutesString}`
    // const dateAsUtc = zonedTimeToUtc(date, 'UTC')
    // return format(utcToZonedTime(dateAsUtc, zonaHoraria), pattern)
    return formattedData
}