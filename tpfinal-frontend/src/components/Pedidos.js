import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Tabla from './Tablas/data-table'
import { columnsDashboard } from '../pages/administracion/pedidos/columns'

export const ContadorPedidos = ({ titulo, cantidad, className, ...props }) => (
    <div
        className={`${className} min-w-min max-w-max py-1 ps-3 rounded-[5px] flex`}>
        {titulo} <span className="px-2 "> {cantidad}</span>
    </div>
)

export function TabsPedidos({ conteo, pedidos }) {
    console.log(pedidos[0])
    return (
        <>
            <Tabs defaultValue="cotizaciones" className="w-min md:w-max">
                <TabsList>
                    <TabsTrigger value="cotizaciones">Cotizaciones</TabsTrigger>
                    <TabsTrigger value="pedidosPendientes">
                        Pedidos pendientes
                    </TabsTrigger>
                    <TabsTrigger value="empezados">
                        Pedidos empezados
                    </TabsTrigger>
                    <TabsTrigger value="entregas">Entregas</TabsTrigger>
                </TabsList>
                <TabsContent value="cotizaciones">
                    <TablaPedidos pedidos={pedidos[0]}></TablaPedidos>
                </TabsContent>
                <TabsContent value="pedidosPendientes">
                    <TablaPedidos pedidos={pedidos[2]}></TablaPedidos>
                </TabsContent>
                <TabsContent value="empezados">
                    {' '}
                    <TablaPedidos pedidos={pedidos[4]}></TablaPedidos>
                </TabsContent>
                <TabsContent value="entregas">
                    {' '}
                    <TablaPedidos pedidos={pedidos[5]}></TablaPedidos>
                </TabsContent>
            </Tabs>
        </>
    )
}

export function TablaPedidos({ pedidos }) {
    return (
       /*  <div className="text-lg">
            {pedidos.map(pedido => (
                <p key={pedido.id}>{pedido.producto.nombre}</p>
            ))}
        </div> */
        <Tabla data={pedidos} columns={columnsDashboard} sinCabecera={true}></Tabla>
    )
}
