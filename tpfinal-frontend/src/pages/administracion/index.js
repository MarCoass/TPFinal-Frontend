import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'
import CalendarioTareas from '../../components/CalendarioTareas'
import TareasDashboard from './tareas/dashboard'
import PedidosDashboard from './pedidos/dashboard'
import { AccesoRapido } from '../../components/CardDashboard'
import { ModalProductoStore } from '../../components/Modales/modalProductos'
import { ModalInsumoCrear } from '../../components/Modales/modalInsumos'
import CrearTarea from './tareas/store'
import { ModalProveedorStore } from '../../components/Modales/modalProveedor'

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
                <div className=" lg:grid lg:grid-cols-6 lg:grid-rows-5 gap-4 flex flex-col">
                    <div
                        className="lg:col-span-4 lg:row-span-5"
                        id="accesosRapidos">
                        <div className=" grid m-5">
                            <p className="text-2xl font-bold ">
                                Accesos rapidos
                            </p>
                            <div className="flex flex-wrap gap-5">
                                <AccesoRapido
                                    titulo="Productos"
                                    url="administracion/productos/">
                                    <ModalProductoStore
                                        dashboard={true}></ModalProductoStore>
                                </AccesoRapido>
                                <AccesoRapido
                                    titulo="Insumos"
                                    url="administracion/insumos/">
                                    <ModalInsumoCrear
                                        dashboard={true}></ModalInsumoCrear>
                                </AccesoRapido>
                                <AccesoRapido
                                    titulo="Tareas"
                                    url="administracion/tareas/">
                                    <CrearTarea dashboard={true}></CrearTarea>
                                </AccesoRapido>
                                <AccesoRapido
                                    titulo="Proveedores"
                                    url="administracion/proveedores/">
                                    <ModalProveedorStore
                                        dashboard={true}></ModalProveedorStore>
                                </AccesoRapido>
                                <AccesoRapido
                                    titulo="Preferencias"
                                    url="administracion/preferencias/"></AccesoRapido>
                            </div>
                        </div>
                        <div className="m-5">
                            <div className="text-2xl font-bold ">
                                <PedidosDashboard></PedidosDashboard>
                            </div>
                        </div>
                    </div>

                    <div
                        className="lg:col-span-2 lg:row-span-5 lg:col-start-5 flex lg:flex-col sm:flex-row flex-col mx-5 gap-3"
                        id="tareas">
                        <TareasDashboard></TareasDashboard>
                        <CalendarioTareas></CalendarioTareas>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard
