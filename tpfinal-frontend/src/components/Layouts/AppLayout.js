import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'

const AppLayout = ({ header, children, footer }) => {
    const { user } = useAuth()

    return (
        <div className="min-h-screen">
            <Navigation user={user} />

            {/* Page Heading */}
            <header className="bg-lila-500 shadow">
                <div className="bg-lila-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main className="bg-lila-300 min-h-screen">{children}</main>

            
        </div>
    )
}

export default AppLayout
