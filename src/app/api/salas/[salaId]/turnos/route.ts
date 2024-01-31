import { NextRequest, NextResponse } from 'next/server'
import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'

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

        const response = await Promise.all(turnos.map(async (turno) => {
            // Obtengo estado
            let estado = null
            if (turno.TurEstado) {
                estado = await prismadb.eSTADOSTURNOQX.findUnique({
                    where: { EstTQCod: turno.TurEstado },
                })
            }

            // Obtengo Historia clínica
            let historiaClinica = null
            if (turno.TurDNIPte) {
                historiaClinica = await prismadb.hISTORIAS.findUnique({
                    where: { HCNumIng: turno.TurDNIPte },
                })
            }

            let internacion = null
            if (turno.TurNroIntInter) {
                internacion = await prismadb.iNTERNAD.findUnique({
                    where: { INNumInt: turno.TurNroIntInter }
                })
            }

            let obraSocial = null
            if (turno.TurOsCodigo) {
                obraSocial = await prismadb.oBRASOCIAL.findUnique({
                    where: { OSCodigo: turno.TurOsCodigo },
                })

                let plan = null
                if (obraSocial && turno.TurOSPlan) {
                    const temp = await prismadb.cONTRATO.findMany({
                        where: {
                            OSCodigo: turno.TurOsCodigo,
                            CoPlan: turno.TurOSPlan
                        }
                    })
                    plan = temp[0]
                }
                obraSocial = { ...obraSocial, plan }
            }

            let medico = null
            if (turno.TurMedEstudio) {
                medico = await prismadb.mEDICOS.findUnique({
                    where: { MECodigo: turno.TurMedEstudio }
                })
                let especialidad = null
                if (medico && medico.MEEspecialidad) {
                    especialidad = await prismadb.eSPECIALIDADES.findUnique({
                        where: { ESCodigo: medico.MEEspecialidad }
                    })
                }
                medico = { ...medico, especialidad }
            }

            return {
                ...turno,
                estado,
                historiaClinica,
                internacion,
                obraSocial,
                medico
            }
        }))

        return NextResponse.json({ data: response, error: null })
    } catch (error) {
        console.log('Error en GET /api/turnos', error)
        return NextResponse.json({ data: null, error: error })
    }
}