import { Pencil, Trash2 } from 'lucide-react'
import { DeleteButton, UpdateButton } from './Button'

const CardTarea = ({ tarea }) => (
    <div className="bg-rosado-200 grid grid-flow-row w-max p-4 rounded">
        <div className="font-bold">{tarea.titulo}</div>
        <div className="pt-4">{tarea.descripcion}</div>
        <hr />
        <div className="flex gap-3 m-3">
            <UpdateButton>
                <Pencil className="h-4 w-4 mx-2"></Pencil>Editar
            </UpdateButton>
            <DeleteButton>
                <Trash2 className="h-4 w-4 mx-2"></Trash2>Borrar
            </DeleteButton>
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
