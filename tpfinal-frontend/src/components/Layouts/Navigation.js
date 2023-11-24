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
import { User } from 'lucide-react'
import DropdownLink from '../DropdownLink'

const Navigation = ({ user }) => {
    const router = useRouter()

    const { logout } = useAuth()

    const [open, setOpen] = useState(false)

    return (
        <nav className="border-b-2 border-black bg-lila-500 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between font-bold">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-12 w-auto fill-current text-violeta-500" />
                            </Link>
                        </div>

                        {user && user.id_rol == 1 ? (
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex sm:align-middle  py-3 text-center font-bold ">
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
                                {user && (
                                    <NavLink
                                        href="/pedidos"
                                        active={router.pathname === '/pedidos'}>
                                        Pedidos personalizados
                                    </NavLink>
                                )}
                            </div>
                        )}
                    </div>
                    {user ? (
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <Dropdown
                                align="right"
                                width="48"
                                trigger={
                                    <div className=" rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                                        <User className="w-6 h-6" />
                                    </div>
                                }>
                                {user && user.id_rol == 1 ? (
                                    <DropdownLink  href="/administracion/preferencias">
                                        Preferencias
                                    </DropdownLink>
                                ) : (
                                    <DropdownLink  href="/perfil">Perfil</DropdownLink>
                                )}

                                {user && user.id_rol != 1 ? (
                                    <DropdownLink  href="/tienda/carrito">
                                        Carrito
                                    </DropdownLink>
                                ) : null}
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
                    <div className="mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 bg-violeta-500 border-2 text-black  hover:border-2 border-black rounded-[5px] hover:bg-violeta-100 focus:outline-none focus:bg-violeta-500  transition duration-150 ease-in-out">
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
                <div className=" sm:hidden flex flex-col items-center justify-center gap-2 py-5">
                    <div className="pt-2 pb-3 space-y-1 w-1/2 ">
                        <ResponsiveNavLink
                            href="/tienda"
                            active={router.pathname === '/tienda'}>
                            Tienda
                        </ResponsiveNavLink>
                        {user && user.id_rol == 1 && (
                            <ResponsiveNavLink
                                href="/administracion"
                                active={router.pathname === '/administracion'}>
                                Administracion
                            </ResponsiveNavLink>
                        )}
                        {user && user.id_rol == 2 && (
                            <div>
                                <ResponsiveNavLink
                                    href="/perfil"
                                    active={router.pathname === '/perfil'}>
                                    Perfil
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href="/tienda/carrito"
                                    active={
                                        router.pathname === '/tienda/carrito'
                                    }>
                                    Carrito
                                </ResponsiveNavLink>
                            </div>
                        )}
                    </div>
                    <div className=" pb-1 ">
                        <div className=" space-y-1">
                            {user ? (
                                <ResponsiveNavButton onClick={logout}>
                                    Cerrar sesion
                                </ResponsiveNavButton>
                            ) : (
                                <div className="border-black border-t-2">
                                    <ResponsiveNavLink
                                        href="/login"
                                        active={router.pathname === '/login'}>
                                        Iniciar sesion
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href="/register"
                                        active={
                                            router.pathname === '/register'
                                        }>
                                        Registrarse
                                    </ResponsiveNavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
