import React from 'react'
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
import { useState, useEffect } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropdownMenuCheckboxes } from '@/components/DropdownMenu'
import Catalogo from './catalogo'

export default function StoreLayout({ children }) {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const handleClick = () => {
        setIsVisible(!isVisible);
    };


    //arrays de filtros para los productos, el valor 'nombre' tiene el dato exactamente como aparecen los nombres en la dn
    //excepto por el largo de uñas, ahí voy a tener que establecer un mínimo de largo y un máximo de corto y comparar el largo de los tips del producto para filtrar
    const [diseño, setDiseño] = useState([
        { nombre: 'Lisas', seleccionado: false },
        { nombre: 'Diseño simple', seleccionado: false },
        { nombre: 'Diseño complejo', seleccionado: false },
    ]);


    const [forma, setForma] = useState([
        { nombre: 'almond', seleccionado: false },
        { nombre: 'cuadrada', seleccionado: false },
        { nombre: 'coffin', seleccionado: false },
    ]);

    const [largo, setLargo] = useState([
        { nombre: 'Largas', seleccionado: false },
        { nombre: 'Cortas', seleccionado: false },
    ]);

    const [ciudad, setCiudad] = useState([
        { nombre: 'Plaza Huincul', seleccionado: false },
        { nombre: 'Cipolletti', seleccionado: false },
        { nombre: 'Cutral-co', seleccionado: false },
    ]);

    const onCheckboxChange = (filtroName, filtro) => {
        switch (filtroName) {
            case "Diseños":
                setDiseño(filtro);
                break;
            case "Forma":
                setForma(filtro);
                break;
            case "Largo":
                setLargo(filtro);
                break;
            case "Disponibilidad":
                setCiudad(filtro);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
       console.log(diseño)
       {React.Children.map(children, (child) => {
       console.log (React.isValidElement(child)) 

    })}
    }, [])

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
                                        <div className='inline-flex items-center px-1 pt-1 font-medium leading-5 focus:outline-none transition duration-150 ease-in-out'>
                                            <button onClick={handleClick}>
                                                filtros {isVisible ? "<" : ">"}
                                            </button>
                                        </div>
                                        <div className='inline-flex items-center px-1 pt-1 font-medium leading-5 focus:outline-none transition duration-150 ease-in-out'>
                                            {isVisible && <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                <div className="flex">
                                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex self-center  mt-1">
                                                        <DropdownMenuCheckboxes
                                                            nombreMenu="Diseños"
                                                            filtro={diseño}
                                                            onCheckboxChange={onCheckboxChange}
                                                        ></DropdownMenuCheckboxes>
                                                        <DropdownMenuCheckboxes
                                                            nombreMenu="Largo"
                                                            filtro={largo}
                                                            onCheckboxChange={onCheckboxChange}
                                                        ></DropdownMenuCheckboxes>
                                                        <DropdownMenuCheckboxes
                                                            nombreMenu="Forma"
                                                            filtro={forma}
                                                            onCheckboxChange={onCheckboxChange}
                                                        ></DropdownMenuCheckboxes>
                                                        <DropdownMenuCheckboxes
                                                            nombreMenu="Disponibilidad"
                                                            filtro={ciudad}
                                                            onCheckboxChange={onCheckboxChange}
                                                        ></DropdownMenuCheckboxes>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {isVisible && <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-8">
                                <div className="flex">
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex self-center  mt-1">
                                        <Filtros>

                                        </Filtros>
                                    </div>
                                </div>
                            </div>
                        </div>} */}

                    </nav>}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        console.log(diseño)
                        return React.cloneElement(child, {
                            diseño: diseño,
                            forma: forma,
                            largo: largo,
                            ciudad: ciudad,
                        });
                    }
                    return child;
                })}

            </AppLayout>
        </>
    )
}


