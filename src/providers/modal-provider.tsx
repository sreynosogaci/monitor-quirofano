'use client'

import { DeleteModal } from '@/components/modals/delete'
import { DetallesTurnoModal } from '@/components/modals/detalles-turno'
import { useIsMounted } from 'usehooks-ts'

export const ModalProvider = () => {
    const isMounted = useIsMounted()

    if (!isMounted) return null

    return (
        <>
            <DeleteModal />
            <DetallesTurnoModal />
        </>
    )
}
