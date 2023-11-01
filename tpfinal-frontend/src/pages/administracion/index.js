import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import CalendarioTareas from '../../components/CalendarioTareas'
import TareasDashboard from './tareas/dashboard'

const Dashboard = () => {
    return (
        <AdminLayout
            header={
                <h2 className="font-bold text-xl text-gray-800 leading-tight">
                    Administracion - Mar Nails
                </h2>
            }>
            <Head>
                <title>Administracion - Mar Nails</title>
            </Head>

            <div className="py-12 ">
                <div className=" grid grid-cols-6 grid-rows-5 gap-4">
                    <div className="bg-rosado-200 col-span-4 row-span-3">
                        Accesos rapidos
                    </div>

                    <div className="col-span-2 row-span-5 col-start-5">
                        <TareasDashboard></TareasDashboard>
                        <CalendarioTareas></CalendarioTareas>
                    </div>
                    <div className="col-span-4 row-span-2 row-start-4 bg-rosado-400">
                        <p>Pedidos personalizados</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard
