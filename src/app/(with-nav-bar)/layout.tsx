import { NavBar } from '@/components/nav-bar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar dynamic />
            <div className='bg-slate-200'>
                {children}
            </div>
        </>
    )
}
