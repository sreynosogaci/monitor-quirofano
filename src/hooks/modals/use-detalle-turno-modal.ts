import { Turno } from '@/types/gaci'
import { create } from 'zustand'

type DetalleTurnoModal = {
    turno: Turno,
    isOpen: boolean
    onOpen: (turno: Turno) => void
    onClose: () => void
}

export const useDetalleTurnoModal = create<DetalleTurnoModal>((set) => ({
    turno: null,
    isOpen: false,
    onOpen: (turno: Turno | null) => set({ isOpen: true, turno }),
    onClose: () => set({ isOpen: false })
}))