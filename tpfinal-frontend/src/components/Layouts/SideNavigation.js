import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


const SideNavigation = ({ user }) => {
    const router = useRouter()
    const { logout } = useAuth()

    return (
        <nav className="bg-white border-b border-gray-100 w-64 h-screen">
            <div className="border-b ">
                <div className="flex-shrink-0 flex justify-center items-center p-4">
                    <Link href="/">
                        <ApplicationLogo className="block h-14 w-auto fill-current text-violeta-500" />
                    </Link>
                </div>
            </div>
            <div className=" grid content-between h-100">
                <div className="flex flex-col gap-4 my-6">
                    <NavLink
                        href="/administracion/"
                        active={router.pathname === '/administracion'}>
                        Inicio
                    </NavLink>
                    <NavLink
                        href="/administracion/productos"
                        active={
                            router.pathname === '/administracion/productos'
                        }>
                        Productos
                    </NavLink>
                    <NavLink href="/" active={router.pathname === '/'}>
                        Pedidos personalizados
                    </NavLink>
                    <NavLink
                        href="/administracion/insumos"
                        active={router.pathname === '/administracion/insumos'}>
                        Insumos
                    </NavLink>
                    <NavLink
                        href="/administracion/tareas"
                        active={router.pathname === '/administracion/tareas'}>
                        Tareas
                    </NavLink>
                    <NavLink
                        href="/administracion/proveedores"
                        active={
                            router.pathname === '/administracion/proveedores'
                        }>
                        Proveedores
                    </NavLink>
                </div>

                <div className="flex flex-col gap-4 mt-36 border-t">
                    <NavLink href="/">Configuracion</NavLink>
                    <NavLink href="/" onClick={logout}>
                        Cerrar Sesion
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default SideNavigation

export function NeoSideNavigation({ active, setActive, children }) {
     const router = useRouter()
    const { logout } = useAuth()
    const [isVisible, setIsVisible] = useState(false)
    const closeDrawer = () => {
        setIsVisible(false)
        setTimeout(() => {
            setActive(false)
        }, 300)
    }
    useEffect(() => {
        if (active) {
            setIsVisible(true)
        }
    }, [active])

    if (!active) return null

    return (
        <div
            role="dialog"
            aria-modal="true"
            style={{
                opacity: isVisible ? '1' : '0',
                visibility: isVisible ? 'visible' : 'hidden',
            }}
            onClick={closeDrawer}
            className="fixed left-0 top-0 z-50 flex h-[100dvh] w-screen items-start justify-start bg-gray-500/50 transition-all duration-300">
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    transform: `translateX(${isVisible ? '0' : '-300px'})`,
                }}
                className=" z-10 h-full w-[300px] border-2 border-black bg-[#bc95d4] font-bold transition-transform duration-300">
                 <div className="flex flex-col  ">
                    <NavLink
                        href="/administracion/"
                        active={router.pathname === '/administracion'}>
                        Inicio
                    </NavLink>
                    <NavLink
                        href="/administracion/productos"
                        active={
                            router.pathname === '/administracion/productos'
                        }>
                        Productos
                    </NavLink>
                    <NavLink href="/" active={router.pathname === '/'}>
                        Pedidos personalizados
                    </NavLink>
                    <NavLink
                        href="/administracion/insumos"
                        active={router.pathname === '/administracion/insumos'}>
                        Insumos
                    </NavLink>
                    <NavLink
                        href="/administracion/tareas"
                        active={router.pathname === '/administracion/tareas'}>
                        Tareas
                    </NavLink>
                    <NavLink
                        href="/administracion/proveedores"
                        active={
                            router.pathname === '/administracion/proveedores'
                        }>
                        Proveedores
                    </NavLink>
                </div>
                <div className="flex flex-col border-t-2 border-black">
                    <NavLink href="/">Configuracion</NavLink>
                    <NavLink href="/" onClick={logout}>
                        Cerrar Sesion
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
