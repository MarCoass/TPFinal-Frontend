import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { Filtros } from '@/components/filtros'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'

export default function StoreLayout({ children }) {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const handleClick = () => {
        setIsVisible(!isVisible);
      };
    return (
        <>
            <AppLayout
                header={
                    <nav className="bg-white border-gray-100">
                        <div className="max-w-7xl  border-b mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink
                                            href="/tienda/catalogo"
                                            active={router.pathname === '/tienda/catalogo'}>
                                            Catalogo
                                        </NavLink>
                                        <NavLink
                                            href="/tienda/ofertas"
                                            active={router.pathname === '/tienda/ofertas'}>
                                            Ofertas
                                        </NavLink>
                                        <NavLink
                                            href="/tienda/favoritos"
                                            active={router.pathname === '/tienda/favoritos'}>
                                            Favoritos
                                        </NavLink>
                                        <div  className='inline-flex items-center px-1 pt-1 font-medium leading-5 focus:outline-none transition duration-150 ease-in-out'>
                                            <button onClick={handleClick}>
                                            filtros
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isVisible && <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-8">
                                <div className="flex">
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex self-center  mt-1">
                                       <Filtros>

                                       </Filtros>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        
                    </nav>}>

                {children}
            </AppLayout>
        </>
    )
}


