'use client'

// import Image from 'next/image'
// import Logo from '@/assets/logo.png'
import { useBoolean, useEventListener } from 'usehooks-ts'
import { cn } from '@/lib/utils'
// import { useMediaQueryXl } from '@/hooks/use-media-queries'
import { Button } from './ui/button'
import Link from 'next/link'
import { NavBarOption } from '@/types/utils'
// import { ChangeTheme } from './change-theme'

const NavOptions = ({ options }: { options: NavBarOption[] }) => (
    <ul className={cn('hidden xl:flex xl:flex-row xl:gap-5')}>
        { options.map(op => (
            <li key={op.value}>
                <Button variant="link"> 
                    <Link href={op.value}>{op.label}</Link>
                </Button>
            </li>
        ))}
    </ul>
)

const InternalNavBar = ({ className }: { className?: string }) => {
    const { value: moved, setFalse: setMovedFalse, setTrue: setMovedTrue } = useBoolean(false)

    const navOptions = [
        { label: 'Agenda', value: '/agenda' },
        { label: 'Monitor', value: '/monitor' },
    ]

    const onScroll = () => {
        if (window.scrollY > 0) {
            setMovedTrue()
        } else {
            setMovedFalse()
        }
    }

    useEventListener('scroll', onScroll)

    return (
        <nav
            className={cn(
                'px-4 w-full h-nav-bar-height border-b border-b-transparent xl:px-0',
                'transition-all fixed z-50 top-0 backdrop-blur-md',
                moved && 'border-b-border',
                className
            )}
        >
            <div className="w-full h-full mx-auto max-w-7xl flex justify-center items-center relative">
                <NavOptions options={navOptions}/>
                {/* <Image src={Logo} alt='Logo' className='h-2/3 max-h-10 w-max absolute left-0' /> */}
                {/* <ModeToggle className='absolute right-0 hidden xl:inline-flex'/> */}
                {/* <ChangeTheme /> */}
            </div>
        </nav>
    )
}


export const NavBar = ({ dynamic }: { dynamic?: boolean }) => {

    return (
        <>
            { dynamic ? (
                <div className='absolute top-0 left-[calc(50vw-20px)] z-50 h-4 group w-10 bg-red-300 '>
                    <InternalNavBar
                        className='opacity-0 translate-y-[-64px] group-hover:opacity-100 group-hover:translate-y-0 left-0'
                    />
                </div>
            ) : (
                <InternalNavBar />
            )}
        </>
    )
}