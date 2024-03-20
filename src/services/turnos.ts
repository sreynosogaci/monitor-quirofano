import prismadb from '@/lib/prismadb'
import { Turno } from '@/types/gaci'
import { TURNOS } from '@prisma/client'

export const procesarTurnos = async (turnos: TURNOS[]): Promise<Turno[]> => {
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
            medico = await prismadb.  mEDICOS.findUnique({
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

    const filtered = response.filter(turno => turno.internacion !== null && turno.estado !== null)

    return filtered
}