import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'

const Dashboard = () => {
    return (
        <AdminLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Administracion - Mar Nails
                </h2>
            }>
            <Head>
                <title>Administracion - Mar Nails</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Administracion
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard
