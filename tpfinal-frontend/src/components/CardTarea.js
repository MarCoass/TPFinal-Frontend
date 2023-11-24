import { CalendarDays} from 'lucide-react'
import ModalTareaUpdate, {
    ModalTareaDelete,
    ModalTareaTerminar,
} from './Modales/modalTarea'
import { convertirFechaLarga } from '../lib/formatoFechas'


const CardTarea = ({ tarea }) => (
    <div
        className={`${
            tarea.estado === 0
                ? 'bg-rosado-400 text-black'
                : 'bg-gray-400 text-gray-700'
        } w-100  md:w-min md:min-w-max  rounded-[5px] border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
        <div className="border-b-2 border-black p-4">
            <h2 className="text-lg">{tarea.titulo}</h2>
        </div>
        <div className="p-2 md:p-4 border-b-2 border-black">
            <p>{tarea.descripcion}</p>
            <div className="text-sm flex pt-2">
                <CalendarDays className="h-4"></CalendarDays> Vencimiento:{' '}
                {convertirFechaLarga(tarea.fecha_vencimiento)}{' '}
            </div>
        </div>

        <div className="flex gap-3 m-3">
            <ModalTareaUpdate id={tarea.id}></ModalTareaUpdate>
            <ModalTareaDelete id={tarea.id}></ModalTareaDelete>
            {tarea.estado === 0 ? (
                <ModalTareaTerminar id={tarea.id}></ModalTareaTerminar>
            ) : (
                <p></p>
            )}
        </div>
    </div>
)

export default CardTarea

export const CardTareaDashboard = ({ tarea }) => {
    return (
        <>
            <div className="flex items-center justify-center rounded-[5px] border-2 border-black bg-rosado-400 p-5 px-5 md:px-8 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p>{tarea.titulo}</p>
            </div>
        </>
    )
}
