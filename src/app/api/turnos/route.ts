import { NextRequest, NextResponse } from 'next/server'
import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const defaultDate = format(new Date(), 'yyyy-MM-dd')
    const date = searchParams.get('date') || defaultDate

    try {
        const turnos = await prismadb.tURNOS.findMany({
            select: {
                TurID: true,
                TurSala: true,
                Turfecha: true,
                TurHora: true,
                TurEstado: true,
                TurVisitado: true,
                TurVisitadoFecha: true,
                MECodigo: true,
                TurAnestesista: true,
                TurUsuarioAnulo: true,
                TurInternado: true,
                TurFechaAsist: true,
                TurHoraAsist: true,
                TurIngQuirofano: true,
                TurFinQuirofano: true,
                TurObservSala: true,
                TurSalaDestino: true,
                TurMedEfeEspec: true,
                TurAGINumInt: true,
                TurAGInterDirecto: true,
                TurSiglasEstudio: true,
                TurFecProbInt: true,
                TurHoraProInt: true,
                TurContacto: true,
                TurDNIPte: true,
                TurOsCodigo: true,
                TurProcCodigo: true,
                TurAsistio: true,
                TurObservaciones: true,
                TurNroIntInter: true,
                TurAsisteMEdCabe: true,
                TurMedEstudio: true,
                TurNro: true,
                TurHoraIni: true,
                TurHoraFin: true,
            },
            where: {
                Turfecha: new Date(date)
            },
        })

        const response = await Promise.all(turnos.map(async (turno) => {
            let estado = null
            if (turno.TurEstado) {
                estado = await prismadb.eSTADOSTURNOQX.findUnique({
                    where: { EstTQCod: turno.TurEstado },
                })
            }

            return { ...turno, estado }
        }))

        return NextResponse.json({ data: response, error: null })
    } catch (error) {
        console.log('Error en GET /api/turnos', error)
        return NextResponse.json({ data: null, error: error })
    }
}