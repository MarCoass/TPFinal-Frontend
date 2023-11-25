import React, { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
const { default: getCookie } = require('@/lib/cookies')

//formulario para registro y para edicion de datos de perfil

export default function DatosUsuario() {
    // const { register } = useAuth({
    //     middleware: 'guest',
    //     redirectIfAuthenticated: '/dashboard',
    // })
    const { user } = useAuth()
    const [titulo, setTitulo] = useState('Información de perfil')
    const [mensajeBoton, setMensajeBoton] = useState('Guardar cambios')
    const [username, setUsername] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [numTelefono, setNumTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const [formErrors, setFormErrors] = useState({
        username: '',
        nombre: '',
        apellido: '',
        numTelefono: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    })

    const validateForm = () => {
        const validationErrors = {
            username: '',
            nombre: '',
            apellido: '',
            numTelefono: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        }

        // Validar nombre de usuario
        if (username.length < 3) {
            validationErrors.username =
                'El usuario debe tener al menos 3 caracteres.'
        }

        // Validar nombre
        if (nombre.length < 3) {
            validationErrors.nombre =
                'El usuario debe tener al menos 3 caracteres.'
        }

        // Validar apellido
        if (apellido.length < 3) {
            validationErrors.apellido =
                'El usuario debe tener al menos 3 caracteres.'
        }

        // Validar el formato de email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (!email.match(emailPattern)) {
            validationErrors.email = 'El email no tiene un formato válido.'
        }

        // Validar número de teléfono
        const phoneNumberPattern = new RegExp(/^[0-9]{3}\s[0-9]{3}\s[0-9]{4}$/)
        if (!phoneNumberPattern.test(numTelefono)) {
            validationErrors.numTelefono = 'El número de teléfono no es válido.'
        }

        // Validar contraseñas
        if (password !== passwordConfirmation) {
            validationErrors.password = 'Las contraseñas no coinciden.'
            validationErrors.passwordConfirmation =
                'Las contraseñas no coinciden.'
        }

        return validationErrors
    }

    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setNombre(user.nombre)
            setApellido(user.apellido)
            setNumTelefono(user.num_telefono)
            setEmail(user.email)
            setPassword(user.password)
        }
    }, [user])

    const submitForm = async event => {
        

        event.preventDefault()

        const validationErrors = validateForm()

        if (validationErrors.length > 0) {
            setFormErrors(validationErrors)
            console.log('error')
        } else {
            setFormErrors([]) // Limpiar errores

            const userDataToSubmit = {
                username: username,
                nombre: nombre,
                apellido: apellido,
                num_telefono: numTelefono,
                email: email,
            }

            if (user) {
                //     Edición del perfil
                // Aquí llamar al servicio de edición de perfil en tu backend
                const headers = {
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                    Accept: 'application/json',
                }
                let url = '/api/editarPerfil/'+user.id
                const response = await axios.post(url, userDataToSubmit, {
                    headers,
                })
                console.log(response)
            } else {
                //     // Registro de nuevo usuario
                userDataToSubmit.password = password
                //     // Aquí llamar al servicio de registro de nuevo usuario en tu backend
                await register({
                    username,
                    nombre,
                    apellido,
                    numTelefono,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                    setErrors,
                })
            }

            // Redirigir o realizar otra acción después de guardar los datos.
        }
    }

    //     const submitForm = event => {
    //         event.preventDefault()
    //         if(titulo === 'Información de perfil'){
    // //aca se guardan los datos
    //         } else {
    //             register({
    //                 username,
    //                 nombre,
    //                 apellido,
    //                 numTelefono,
    //                 email,
    //                 password,
    //                 password_confirmation: passwordConfirmation,
    //                 setErrors,
    //             })
    //         }
    //     }

    function validarUsername(username) {
        if (username.length >= 3) {
            console.log('ta correcto')
        } else {
            console.log('F')
            // return error
        }
        setUsername(username)
    }

    //debería comprobar desde acá si hay un usuario logueado o si es un invitado, si está logueado completo los datos del form con los del user
    //si no está logueado, dejo los datos vacíos para completar en el registro
    //ver cómo hacer validaciones -> a mano con js sheinaa

    return (
        <>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-24 h-auto fill-current text-violeta-500" />
                    </Link>
                }>
                <h1 className="text-violeta-500 text-4xl m-5 text-center">
                    {titulo}
                </h1>
                <form onSubmit={submitForm}>
                    {/* Name */}
                    <div>
                        <Label htmlFor="username">Nombre de usuario</Label>

                        <Input
                            id="username"
                            type="text"
                            value={username}
                            className="block mt-1 w-full"
                            onChange={event => setUsername(event.target.value)}
                            required
                            autoFocus
                            placeholder="Usuario"
                        />

                        <InputError
                            messages={errors.username}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="nombre">Nombre</Label>

                        <Input
                            id="nombre"
                            type="text"
                            value={nombre}
                            className="block mt-1 w-full"
                            onChange={event => setNombre(event.target.value)}
                            required
                            autoFocus
                            placeholder="Nombre"
                        />

                        <InputError messages={errors.nombre} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="apellido">Apellido</Label>

                        <Input
                            id="apellido"
                            type="text"
                            value={apellido}
                            className="block mt-1 w-full"
                            onChange={event => setApellido(event.target.value)}
                            required
                            autoFocus
                            placeholder="Apellido"
                        />

                        <InputError messages={errors.nombre} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="num_telefono">Número de telefono</Label>

                        <Input
                            id="numTelefono"
                            type="tel"
                            value={numTelefono}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setNumTelefono(event.target.value)
                            }
                            required
                            autoFocus
                            placeholder="Numero de telefono"
                        />

                        <InputError messages={errors.nombre} className="mt-2" />
                    </div>

                    {/* Email Address */}
                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                            placeholder="ejemplo@correo.com"
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>
                    {/* Password */}
                    {user ? null : (
                        <>
                            <div className="mt-4">
                                <Label htmlFor="password">Contraseña</Label>

                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    className="block mt-1 w-full"
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                    required
                                    autoComplete="new-password"
                                />

                                <InputError
                                    messages={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mt-4">
                                <Label htmlFor="passwordConfirmation">
                                    Repita la contraseña
                                </Label>

                                <Input
                                    id="passwordConfirmation"
                                    type="password"
                                    value={passwordConfirmation}
                                    className="block mt-1 w-full"
                                    onChange={event =>
                                        setPasswordConfirmation(
                                            event.target.value,
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    messages={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href="/login"
                                    className="underline text-sm text-gray-600 hover:text-gray-900">
                                    ¿Ya tenes cuenta?
                                </Link>
                            </div>
                        </>
                    )}

                    <Button className="mt-5 w-full">{mensajeBoton}</Button>
                </form>
            </AuthCard>
        </>
    )
}
