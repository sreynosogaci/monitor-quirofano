import { NextResponse } from 'next/server'

export async function GET() {
    const { authenticated, data } = await getServerSessionData()
    if (!authenticated) {
        return NextResponse.json({ error: 'Operación no permitida' })
    }
    const { emptoken, personaId } = data

    try {
        const securityServices = SecurityServices.getInstance()
        const pagesByPerson    = await securityServices.getPagesByPerson(emptoken, +personaId)
        return NextResponse.json({ pages: pagesByPerson })
    } catch (error) {
        logError(error)
        return NextResponse.json({ pages: null })
    }
}