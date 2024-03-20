import { NextRequest, NextResponse } from 'next/server'
import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'
import { procesarTurnos } from '@/services/turnos'

export async function GET(
    request: NextRequest,
    { params }: { params: { salaId: string } }
) {
    try {
        const searchParams = request.nextUrl.searchParams
        const defaultDate = format(new Date(), 'yyyy-MM-dd')
        const date = searchParams.get('date') || defaultDate
        const salaId = parseInt(params.salaId)

        const turnos = await prismadb.tURNOS.findMany({
            where: {
                TurSala: salaId,
                Turfecha: new Date(date),
            },
        })

        const processed = await procesarTurnos(turnos)

        return NextResponse.json({ data: processed, error: null })
    } catch (error) {
        console.log('Error en GET /api/turnos', error)
        return NextResponse.json({ data: null, error: error })
    }
}