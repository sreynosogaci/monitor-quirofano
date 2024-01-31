import prismadb from '@/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: { salaId: string } }
) {
    try {
        const salaId = parseInt(params.salaId)

        const response = await prismadb.sALAS.findUnique({
            where: {
                SaCodigo: salaId
            }
        })

        return NextResponse.json({ data: response, error: null })
    } catch (error) {
        console.log('Error en GET /api/salas', error)
        return NextResponse.json({ data: null, error: error })
    }
}