import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = await prismadb.sALAS.findMany()
        return NextResponse.json({ data: response, error: null })
    } catch (error) {
        console.log('Error en GET /api/salas', error)
        return NextResponse.json({ data: null, error: error })
    }
}