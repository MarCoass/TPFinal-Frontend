import { Trash2 } from "lucide-react"
import handleDelete from "../../lib/handleDelete"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'


export function ModalPrecioDelete({ item, isOpen, onClose }) {
    return (
        <>
            {isOpen && (
                <AlertDialog>
                    <AlertDialogTrigger className="items-center p-1 pr-3 flex bg-red-500 hover:bg-red-600 rounded text-white">
                        <Trash2 className="h-4 w-4 mx-2" />
                        Editar
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-rosado-50">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Eliminar</AlertDialogTitle>
                           <p>Eliminar el precio con id {item.id}</p>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() =>
                                    handleDelete(id, '/api/tareaDelete/')
                                }>
                                Eliminar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    )
}
