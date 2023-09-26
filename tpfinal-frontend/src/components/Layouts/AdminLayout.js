import { useAuth } from '@/hooks/auth'
import SideNavigation from './SideNavigation'

const AdminLayout = ({ header, children }) => {
    const { user } = useAuth()
    
    return (
        <div className="min-h-screen bg-naranja-50 grid grid-flow-col ">
            <SideNavigation user={user} />
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
