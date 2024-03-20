'use client'

import { PropsWithChildren } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'
import { cn } from '@/lib/utils'

type ModalProps = PropsWithChildren<{
    title: string,
    description: string,
    isOpen: boolean,
    onClose: () => void,
    className?: string
    style?: React.CSSProperties
}>

export const Modal = (props: ModalProps) => {
    const { title, description, isOpen, onClose, children, className, style } = props

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent
                className={cn(
                    'max-w-max max-h-[80vh] overflow-y-auto pretty-scrollbar-y',
                    className
                )}
                style={style}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
