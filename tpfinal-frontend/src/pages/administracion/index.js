import CardDashboard from '@/components/CardDashboard'
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
               
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Administracion
                        </div>
                        <div className='grid lg:grid-cols-4 grid-cols-2 gap-4 p-5'>
                            <CardDashboard titulo="Productos"  url="/administracion/productos"></CardDashboard>
                            <CardDashboard titulo="Insumos" url="/administracion/insumos"></CardDashboard>
                            <CardDashboard titulo="Pedidos personalizados" url="/"></CardDashboard>
                            <CardDashboard titulo="Proveedores" url="/"></CardDashboard>
                            <CardDashboard titulo="Tareas" url="/"></CardDashboard>
                        </div>
                    </div>
               
            </div>
        </AdminLayout>
    )
}

export default Dashboard
