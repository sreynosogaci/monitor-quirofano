import { cn } from '@/lib/utils'
import { Calendar, LucideIcon, Monitor } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type CardProps = { href: string, title: string, icon: LucideIcon, color: string, className?: string }

const Card = ({ title, icon, color, className, href }: CardProps) => {
    const Icon = icon

    return (
        <Link
            href={href}
            className={cn(
                'flex flex-1 h-full items-center justify-center gap-2 border border-muted-foreground rounded',
                'p-4 cursor-pointer transition-colors',
                className
            )}
        >
            <Icon className='w-8 h-8' fill={color}/>
            <h2 className='text-[24px] font-bold'>{title}</h2>
        </Link>
    )
}

const HomePage = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center mb-10">Colón</h1>
            <div className='w-[600px] flex gap-4 items-center justify-center h-[200px]'>
                <Card 
                    icon={Calendar}
                    href='/agenda'
                    title='Agenda'
                    color='#f45d48'
                    className='hover:bg-[#f45d4870]'
                />
                <Card 
                    icon={Monitor}
                    href='/monitor'
                    title='Monitor'
                    color='#078080'
                    className='hover:bg-[#07808070]'
                />
            </div>
        </div>
    )
}

export default HomePage
