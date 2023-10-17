import React, { useEffect, useState } from "react";
import AppLayout from '@/components/Layouts/AppLayout'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from '@/hooks/auth'

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
    const { user } = useAuth()
    const [userData, setUserData] = useState()

    useEffect(() => {
        if (user) {
            console.log(user)
            setUserData(user)
        } else {
            setUserData({
                nombre: '',
                apellido: '',
                username: '',
                email: '',
                num_telefono: '',
            })
        }
    })

    //debería comprobar desde acá si hay un usuario logueado o si es un invitado, si está logueado completo los datos del form con los del user
    //si no está logueado, dejo los datos vacíos para completar en el registro
    //ver cómo hacer validaciones
    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usuario: userData.username,
            nombre: userData.nombre,
            apellido: userData.apellido,
            email: userData.email,
            telefono: userData.num_telefono
        },
    })



    return (
        <AppLayout>
            holis
        </AppLayout>
    )

}