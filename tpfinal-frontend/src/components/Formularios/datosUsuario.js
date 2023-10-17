import React from "react";
import AppLayout from '@/components/Layouts/AppLayout'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

//formulario para registro y para edicion de datos de perfil

const formSchema = z.object({
    usuario: z.string().min(2, {
        message: "El usuario debe tener al menos 3 caracteres.",
    }),
    nombre: z.string().min(2, {
        message: "El nombre debe tener al menos 3 caracteres.",
    }),
    apellido: z.string().min(2, {
        message: "El apellido debe tener al menos 3 caracteres.",
    }),
    email: z.string().min(2, {
        message: "El email debe respetar el formato mail 'xxxxxx@xxxx.xxx'.",
    }),
    telefono: z.string().min(2, {
        message: "El teléfono no es válido.",
    }),
})

export default function DatosUsuario(usuario) {
    //debería comprobar desde acá si hay un usuario logueado o si es un invitado, si está logueado completo los datos del form con los del user
    //si no está logueado, dejo los datos vacíos para completar en el registro
    //ver cómo hacer validaciones
    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usuario: "",
            nombre: "",
            apellido: "",
            email: "",
            telefono: ""
        },
    })



    return (
        <AppLayout>
            holis
        </AppLayout>
    )

}