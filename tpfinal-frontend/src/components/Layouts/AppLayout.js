import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'

const AppLayout = ({ header, children, footer }) => {
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-naranja-100">
            <Navigation user={user} />

            {/* Page Heading */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>

            {/* Page footer */}
            <footer className="bg-white shadow sticky bottom-0 z-50">
                <div className="max-w-auto mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {footer}
                </div>
            </footer>
        </div>
    )
}

export default AppLayout
