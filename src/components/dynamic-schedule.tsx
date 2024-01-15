import { cn } from '@/lib/utils'
import { getUUID } from '@/lib/uuid'
import React, { PropsWithChildren } from 'react'

interface BaseItem { id: string, columnId: string, row: number, rowSpan: number }
type Column = { id: string, label: string }
type Row = { label: string }

type SubComponentProps<T> = {
    item: T & Partial<BaseItem>
    linesPerRow: number
}

type DynamicSchedule<T> = {
    columns:        Column[],
    rows:           Row[]
    rowHeight:      number
    linesPerRow:    number
    className?:     string
    columnAssigner: (item: T, column: Column) => boolean
    items:          (T & Partial<BaseItem>)[]
    ItemComponent:  (props: SubComponentProps<T>) => JSX.Element
}

type DynamicScheduleLines = {
    columns:      number,
    rows:         number,
    columnsStyle: React.CSSProperties,
    rowsStyle:    React.CSSProperties
}

type DynamicScheduleHeader = PropsWithChildren<{
    className?: string
    style:      React.CSSProperties
}>

type DynamicScheduleRows = {
    rows:        Row[],
    rowsStyle:   React.CSSProperties,
    linesPerRow: number
}

const DynamicScheduleHeaderItem = ({ children }: PropsWithChildren) => {
    return (
        <p className='text-sm font-bold flex items-center justify-center text-muted-foreground'>
            {children}
        </p>
    )
}

const DynamicScheduleHeader = ({ style, className, children }: DynamicScheduleHeader) => {
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

const DynamicScheduleRows = ({ rows, rowsStyle, linesPerRow }: DynamicScheduleRows) => {
    const itemStyle = {
        paragraph: { gridRow: `span ${linesPerRow} / span ${linesPerRow}` },
        span: { height: `calc(100% / ${linesPerRow})`}
    }

    return (
        <div className='grid w-full' style={rowsStyle}>
            {rows.map((row) => (
                <p
                    key       = { getUUID() }
                    className = 'w-full h-full flex justify-center text-muted-foreground pr-2 relative p-0'
                    style     = { itemStyle.paragraph }
                >
                    <span
                        className = 'absolute top-0 left-0 w-full flex items-center justify-center'
                        style     = { itemStyle.span }
                    >
                        {row.label}
                    </span>
                </p>
            ))}
        </div>
    )
}

const DynamicScheduleLines = ({ columns, rows, columnsStyle, rowsStyle }: DynamicScheduleLines) => {
    const rowsArray: number[] = new Array(rows).fill(0)
    const columnsArray: number[] = new Array(columns).fill(0)

    return (
        <div
            className = 'absolute h-full w-full left-0 top-12 z-0 px-4 grid'
            style     = {rowsStyle}
        >
            {rowsArray.map(() => (
                <div
                    key       = { getUUID() }
                    className = 'border-b grid h-full'
                    style     = { columnsStyle }
                >
                    {columnsArray.map(() => (
                        <div key={getUUID()} className='border-r w-full h-full'></div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export const DynamicSchedule = <T,>(props: DynamicSchedule<T>) => {
    const { columns, rows, rowHeight, linesPerRow, className, items, ItemComponent, columnAssigner } = props
    const firstColumnsWidth = 100

    const styleObject = {
        columns: { gridTemplateColumns: `${firstColumnsWidth}px repeat(${columns.length}, 1fr)` },
        rows:    { gridTemplateRows: `repeat(${rows.length * linesPerRow}, ${rowHeight}px)` }
    }

    return (
        <div
            className={cn(
                'relative border rounded h-full overflow-x-hidden overflow-y-auto pretty-scrollbar-y px-4',
                className
            )}
        >
            <DynamicScheduleHeader
                style={styleObject.columns}
            >
                <DynamicScheduleHeaderItem>Horario</DynamicScheduleHeaderItem>
                {columns.map((column) => (
                    <DynamicScheduleHeaderItem key={getUUID()}>
                        {column.label}
                    </DynamicScheduleHeaderItem>
                ))}
            </DynamicScheduleHeader>

            <DynamicScheduleLines
                columns      = { columns.length }
                rows         = { rows.length * linesPerRow }
                columnsStyle = { styleObject.columns }
                rowsStyle    = { styleObject.rows }
            />

            <div className='w-full grid gap-2 h-full' style={styleObject.columns}>
                <DynamicScheduleRows
                    rows        = { rows }
                    rowsStyle   = { styleObject.rows }
                    linesPerRow = { linesPerRow }
                />

                {columns.map((column) => (
                    <div
                        key       = { getUUID() }
                        className = 'grid w-full z-40 pr-2 h-full grid-cols-1'
                        style     = { styleObject.rows }
                    >
                        { items.filter(i => columnAssigner(i, column)).map((item) => {
                            return (
                                <ItemComponent
                                    key         = { getUUID() }
                                    item        = { item as T & Partial<BaseItem> }
                                    linesPerRow = { linesPerRow }
                                />
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}
