import { CalendarDays, Pencil, Trash2 } from 'lucide-react'
import { DeleteButton, UpdateButton } from './Button'
import handleDelete from '../lib/handleDelete'
import ModalTareaUpdate, { ModalTareaDelete, ModalTareaTerminar } from './Modales/modalTarea'

const CardTarea = ({ tarea }) => (
    <div
        className={`${
            tarea.estado === 0
                ? 'bg-rosado-400 text-black'
                : 'bg-gray-400 text-gray-700'
        } bg-rosado-200 grid grid-flow-row w-max p-4 rounded gap-2`}>
        <div className="font-bold">{tarea.titulo}</div>
        <div className="pt-4">{tarea.descripcion}</div>
        <div className="text-sm flex ">
            <CalendarDays className="h-4"></CalendarDays> Vencimiento:{' '}
            {tarea.fecha_vencimiento}{' '}
        </div>
        <hr />
        <div className="flex gap-3 m-3">
            <ModalTareaUpdate id={tarea.id}></ModalTareaUpdate>
            <ModalTareaDelete id={tarea.id}></ModalTareaDelete>
            <ModalTareaTerminar  id={tarea.id}></ModalTareaTerminar>
        </div>
    </div>
)

export default CardTarea

export const CardTareaDashboard = ({ tarea }) => {
    return (
        <>
            <div className="bg-naranja-200 m-1 p-4 w-max border rounded">
                <p>{tarea.titulo}</p>
            </div>
        </>
    )
}
