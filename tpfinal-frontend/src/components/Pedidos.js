import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Tabla from './Tablas/data-table'
import { columnsDashboard } from '../pages/administracion/pedidos/columns'
import { Badge } from './ui/Badge'

export const ContadorPedidos = ({ titulo, cantidad, className, ...props }) => (
    <div
        className={`${className} min-w-min max-w-max py-1 ps-3 rounded-[5px] flex`}>
        {titulo} <span className="px-2 "> {cantidad}</span>
    </div>
)

export function TabsPedidos({ conteo, pedidos }) {
    return (
        <>
            <Tabs defaultValue="cotizaciones" className="w-min sm:w-max">
                <TabsList>
                    <TabsTrigger
                        value="cotizaciones"
                        className=""
                        disabled={!pedidos[0]}>
                        Cotizaciones{' '}
                        {pedidos[0] && (
                            <Badge className="ms-1 w-min rounded-full border-2 border-black bg-naranja-500 hover:bg-naranja-500 px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ">
                                {pedidos[0].length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger
                        value="pedidosPendientes"
                        disabled={!pedidos[2]}>
                        Pedidos pendientes
                        {pedidos[2] && (
                            <Badge className="ms-1 w-min rounded-full border-2 border-black bg-naranja-500 hover:bg-naranja-500 px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ">
                                {pedidos[2].length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="empezados" disabled={!pedidos[4]}>
                        Pedidos empezados
                        {pedidos[4] && (
                            <Badge className="ms-1 w-min rounded-full border-2 border-black bg-naranja-500 hover:bg-naranja-500 px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ">
                                {pedidos[4].length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="entregas" disabled={!pedidos[5]}>
                        Entregas
                        {pedidos[5] && (
                            <Badge className="ms-1 w-min rounded-full border-2 border-black bg-naranja-500 hover:bg-naranja-500 px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ">
                                {pedidos[5].length}
                            </Badge>
                        )}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="cotizaciones">
                    {pedidos[0] ?(
                        <TablaPedidos pedidos={pedidos[0]}></TablaPedidos>
                    ):(
                        <p className='text-sm'>No hay cotizaciones.</p>
                    )}
                </TabsContent>
                <TabsContent value="pedidosPendientes">
                    <TablaPedidos pedidos={pedidos[2]}></TablaPedidos>
                </TabsContent>
                <TabsContent value="empezados">
                    <TablaPedidos pedidos={pedidos[4]}></TablaPedidos>
                </TabsContent>
                <TabsContent value="entregas">
                    <TablaPedidos pedidos={pedidos[5]}></TablaPedidos>
                </TabsContent>
            </Tabs>
        </>
    )
}

export function TablaPedidos({ pedidos }) {
    return (
        <Tabla
            data={pedidos}
            columns={columnsDashboard}
            sinCabecera={true}></Tabla>
    )
}
