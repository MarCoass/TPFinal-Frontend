import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { CrearPedido, InfoPedido } from './crearPedido'
import PedidosUsuario from './pedidosUsuario'

const Dashboard = () => {
    const { user } = useAuth()

    return (
        <AppLayout>
            <Head>
                <title>Pedidos Personalizados - Mar Nails</title>
            </Head>
            <div className="px-40 flex flex-col  py-4">
                <div className='flex flex-row gap-5'>
                    <CrearPedido></CrearPedido>
                    <InfoPedido></InfoPedido>
                </div>

                <PedidosUsuario></PedidosUsuario>
            </div>
        </AppLayout>
    )
}

export default Dashboard
