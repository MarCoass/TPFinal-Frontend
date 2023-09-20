import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SideNavigation = ({ user }) => {
    const router = useRouter()
    const { logout } = useAuth()
    const [open, setOpen] = useState(false)

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
                        href="/administracion/productos"
                        active={
                            router.pathname === '/administracion/productos'
                        }>
                        Productos
                    </NavLink>
                    <NavLink
                        href="/administracion/insumos"
                        active={router.pathname === '/administracion/insumos'}>
                        Insumos
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
