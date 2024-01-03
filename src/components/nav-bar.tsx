'use client'

// import Image from 'next/image'
// import Logo from '@/assets/logo.png'
import { useBoolean, useEventListener } from 'usehooks-ts'
import { cn } from '@/lib/utils'
// import { useMediaQueryXl } from '@/hooks/use-media-queries'
import { ModeToggle } from '@/components/dark-mode-toggle-button'
// import { ChangeTheme } from './change-theme'


export const NavBar = () => {
    const { value: moved, setFalse: setMovedFalse, setTrue: setMovedTrue } = useBoolean(false)

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
                moved && 'border-b-border'
            )}
        >
            <div className="w-full h-full mx-auto max-w-7xl flex justify-center items-center relative">
                {/* <Image src={Logo} alt='Logo' className='h-2/3 max-h-10 w-max absolute left-0' /> */}
                <ModeToggle className='absolute right-0 hidden xl:inline-flex'/>
                {/* <ChangeTheme /> */}
            </div>
        </nav>
    )
}