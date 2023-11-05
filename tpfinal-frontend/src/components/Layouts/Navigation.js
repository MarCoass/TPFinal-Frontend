import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { User } from 'lucide-react';

const Navigation = ({ user }) => {
    const router = useRouter()

    const { logout } = useAuth()

    const [open, setOpen] = useState(false)

    return (
        <nav className="border-b-2 border-black bg-lila-500">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between font-bold">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-12 w-auto fill-current text-violeta-500" />
                            </Link>
                        </div>

                        {user && user.id_rol == 1 ? (
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href="/tienda"
                                    active={router.pathname === '/tienda'}>
                                    Tienda
                                </NavLink>
                                <NavLink
                                    href="/administracion/"
                                    active={
                                        router.pathname === '/administracion/'
                                    }>
                                    Administracion
                                </NavLink>
                            </div>
                        ) : (
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href="/tienda"
                                    active={router.pathname === '/tienda'}>
                                    Tienda
                                </NavLink>
                                <NavLink
                                    href="/pedidos"
                                    active={router.pathname === '/pedidos'}>
                                    Pedidos personalizados
                                </NavLink>

                                <NavLink
                                    href="/informacion"
                                    active={router.pathname === '/informacion'}>
                                    Informacion
                                </NavLink>
                            </div>
                        )}
                    </div>
                    {/* Settings Dropdown */}
                    {user ? (
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <Dropdown
                                align="right"
                                width="48"
                                trigger={
                                    <div className="m-1 h-16 w-16 rounded-full border-2 border-black bg-cover bg-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"><User className=""/></div>}>
                                {user && user.id_rol == 1 ? (
                                    <DropdownButton>
                                        Configuracion
                                    </DropdownButton>
                                ) : (
                                    <DropdownButton>Perfil</DropdownButton>
                                )}

                                {user && user.id_rol != 1 ? (
                                    <DropdownButton>
                                        <NavLink
                                            href="/tienda/carrito"
                                            active={router.pathname === '/tienda/carrito'}>
                                             Carrito
                                        </NavLink>
                                       </DropdownButton>
                                ) : (null)}
                                <DropdownButton onClick={logout}>
                                    Logout
                                </DropdownButton>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className="flex">
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href="/login"
                                    active={router.pathname === '/login'}>
                                    Iniciar Sesion
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href="/register"
                                    active={router.pathname === '/register'}>
                                    Registrarse
                                </NavLink>
                            </div>
                        </div>
                    )}
                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={router.pathname === '/dashboard'}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive Settings Options */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-10 w-10 fill-current text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <div className="ml-3">
                                <div className="font-medium text-base text-gray-800">
                                    {user?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* Authentication */}
                            <ResponsiveNavButton onClick={logout}>
                                Logout
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
