import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET({ params }: { params: { salaId: string } }) {
    const salaId = parseInt(params.salaId)

    try {
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