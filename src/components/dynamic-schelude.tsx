import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

const DynamicScheduleHeaderItem = ({ children }: PropsWithChildren) => {
    return (
        <p className='text-sm font-bold flex items-center justify-center text-muted-foreground'>
            {children}
        </p>
    )
}

type DynamicScheludeHeader = PropsWithChildren<{
    className?: string
    style: React.CSSProperties
}>

const DynamicScheludeHeader = ({ style, className, children }: DynamicScheludeHeader) => {
    return (
        <div
            className={cn(
                'w-full grid gap-2 border-b h-12 sticky top-0 bg-background z-50',
                className
            )}
            style={style}
        >
            {children}
        </div>
    )
}

type DynamicScheludeProps = {
    className?: string
}

export const DynamicSchelude = ({ className }: DynamicScheludeProps) => {

    const styleObject = { gridTemplateColumns: `${anchoPrimeraColumna}px repeat(${salas.length}, 1fr)` }

    return (
        <div
            className={cn(
                'relative border rounded h-full overflow-x-hidden overflow-y-auto pretty-scrollbar-y px-4',
                className
            )}
        >
            <DynamicScheludeHeader
                style={styleObject}
            >
                <DynamicScheduleHeaderItem>Horario</DynamicScheduleHeaderItem>
                {salas.map((sala) => (
                    <DynamicScheduleHeaderItem key={sala.id}>
                        {sala.label}
                    </DynamicScheduleHeaderItem>
                ))}
            </DynamicScheludeHeader>
        </div>
    )
}
