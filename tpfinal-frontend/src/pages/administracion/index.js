import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import CalendarioTareas from '../../components/CalendarioTareas'
import TareasDashboard from './tareas/dashboard'


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
                <div className="bg-white grid grid-cols-2">
                    <div className="bg-rosado-200 p-5">Accesos rapidos</div>
                    <div className="p-5">
                        <p>Tareas</p>
                        <CalendarioTareas></CalendarioTareas>
                        <TareasDashboard></TareasDashboard>
                    </div>
                    <div className="p-5 bg-rosado-400">
                        <p>Pedidos personalizados</p>
                    </div>
                </div>
            </div>

            
        </AdminLayout>
    )
}

export default Dashboard
