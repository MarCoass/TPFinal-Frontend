import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import CalendarioTareas from '../../components/CalendarioTareas'
import TareasDashboard from './tareas/dashboard'
import PedidosDashboard from './pedidos/dashboard'

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

            <div className="py-6">
                <div className="flex flex-col md:grid md:grid-cols-6 md:grid-rows-5 md:gap-4">
                    <div className=" col-span-4 row-span-3">
                        <div>
                            <p className="text-2xl font-bold ">
                                Accesos rapidos
                            </p>
                            <div>
                                Crear producto Crear insumo Crear tarea Crear
                                proveedor
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 row-span-5 col-start-5">
                        <TareasDashboard></TareasDashboard>
                        <CalendarioTareas></CalendarioTareas>
                    </div>
                    <div className="col-span-4 row-span-2 row-start-4">
                        <div className="text-2xl font-bold ">
                         
                            <PedidosDashboard></PedidosDashboard>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard
