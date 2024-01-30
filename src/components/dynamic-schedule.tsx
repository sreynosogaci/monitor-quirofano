import { cn } from '@/lib/utils'
import { getUUID } from '@/lib/uuid'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

interface BaseItem { id: string, columnId: string, row: number, rowSpan: number }
type Column = { id: string, label: string }
type Row = { label: string }

type SubComponentProps<T> = {
    item: T & Partial<BaseItem>
    linesPerRow: number
    onClick?: (item: T & Partial<BaseItem>) => void
}

type DynamicSchedule<T> = {
    columns:          Column[],
    rows:             Row[]
    rowHeight:        number
    linesPerRow:      number
    headerClassName?: string
    linesClassName?:  string
    className?:       string
    columnAssigner:   (item: T, column: Column) => boolean
    items:            (T & Partial<BaseItem>)[]
    ItemComponent:    (props: SubComponentProps<T>) => JSX.Element
    withHeaderLink?:  boolean
    itemOnClick:      (item: T & Partial<BaseItem>) => void
}

type DynamicScheduleLines = {
    columns:      number,
    rows:         number,
    columnsStyle: React.CSSProperties,
    rowsStyle:    React.CSSProperties
    className?:   string
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

const DynamicScheduleHeaderItem = ({ href='#', children }: PropsWithChildren<{ href?: string }>) => {
    return (
        <Link href={href} className={cn(
            'flex items-center justify-center text-center',
            href === '#' ? 'cursor-default' : 'cursor-pointer hover:underline'
        )}>
            <p className='text-sm font-bold text-muted-foreground'>
                {children}
            </p>
        </Link>
    )
}

const DynamicScheduleHeader = ({ style, className, children }: DynamicScheduleHeader) => {
    return (
        <div
            className={cn(
                'col-span-1 grid border-b h-12 sticky top-0 z-40 bg-background',
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

const DynamicScheduleLines = ({ columns, rows, columnsStyle, rowsStyle, className }: DynamicScheduleLines) => {
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
                    className = { cn('border-b grid h-full', className) }
                    style     = { columnsStyle }
                >
                    {columnsArray.map(() => (
                        <div
                            key={getUUID()}
                            className={cn('border-r w-full h-full', className)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export const DynamicSchedule = <T,>(props: DynamicSchedule<T>) => {
    const { 
        columns, 
        rows, 
        rowHeight, 
        linesPerRow, 
        className, 
        linesClassName,
        headerClassName,
        items, 
        ItemComponent,
        columnAssigner,
        withHeaderLink,
        itemOnClick
    } = props
    
    const firstColumnsWidth = 100

    const styleObject = {
        columns: { gridTemplateColumns: `${firstColumnsWidth}px repeat(${columns.length}, minmax(200px, 1fr))` },
        rows:    { gridTemplateRows: `repeat(${rows.length * linesPerRow}, ${rowHeight}px)` }
    }

    return (
        <div
            className={cn(
                'relative border rounded h-full overflow-x-auto overflow-y-auto px-4 grid bg-background',
                className
            )}
        >
            <DynamicScheduleHeader
                className={headerClassName}
                style={styleObject.columns}
            >
                <DynamicScheduleHeaderItem>Horario</DynamicScheduleHeaderItem>
                {columns.map((column) => (
                    <DynamicScheduleHeaderItem
                        key  = { getUUID() }
                        href = { withHeaderLink ? `/${column.id}` : undefined }
                    >
                        {column.label}
                    </DynamicScheduleHeaderItem>
                ))}
            </DynamicScheduleHeader>

            <DynamicScheduleLines
                columns      = { columns.length }
                rows         = { rows.length * linesPerRow }
                columnsStyle = { styleObject.columns }
                rowsStyle    = { styleObject.rows }
                className    = { linesClassName }
            />

            <div className='w-full grid h-full' style={styleObject.columns}>
                <DynamicScheduleRows
                    rows        = { rows }
                    rowsStyle   = { styleObject.rows }
                    linesPerRow = { linesPerRow }
                />

                {columns.map((column) => (
                    <div
                        key       = { getUUID() }
                        className = 'grid w-full z-30 h-full grid-cols-1'
                        style     = { styleObject.rows }
                    >
                        { items.filter(i => columnAssigner(i, column)).map((item) => {
                            return (
                                <ItemComponent
                                    key         = { getUUID() }
                                    item        = { item as T & Partial<BaseItem> }
                                    linesPerRow = { linesPerRow }
                                    onClick     = { itemOnClick }
                                />
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}
