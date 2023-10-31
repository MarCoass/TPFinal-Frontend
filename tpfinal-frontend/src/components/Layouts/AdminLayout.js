import { useAuth } from '@/hooks/auth'
import SideNavigation, { NeoSideNavigation } from './SideNavigation'
import { useState } from 'react'

const AdminLayout = ({ header, children }) => {
    const { user } = useAuth()
    const [isNavActive, setIsNavActive] = useState(false)

    const openNav = () => {
        setIsNavActive(true)
    }
    return (
        <div className="min-h-screen bg-naranja-50 grid grid-flow-col ">
            {/*  <SideNavigation user={user} /> */}
            <div>
                <button onClick={openNav}>Abrir Menú</button>
                <NeoSideNavigation
                    active={isNavActive}
                    setActive={setIsNavActive}>
                    
                </NeoSideNavigation>
            </div>
            <div className="justify-center col-span-12">
                {/* Page Heading */}
                <header className="bg-white shadow">
                    <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>

                {/* Page Content */}
                <main>{children}</main>
            </div>
        </div>
    )
}

export default AdminLayout
