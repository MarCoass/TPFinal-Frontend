import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import Head from 'next/head'

const provincias = [
    { value: '1', label: 'Neuquen' },
    { value: '2', label: 'Rio Negro' },
]

const Register = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [username, setUsername] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [numTelefono, setNumTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        register({
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

    return (
        <GuestLayout>
            <Head>
                <title>Registrarse - Mar Nails</title>
            </Head>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-24 h-auto fill-current text-violeta-500" />
                    </Link>
                }>
                <h1 className="text-black font-bold text-4xl m-4 text-center">
                    Registrarse
                </h1>
                <form
                    onSubmit={submitForm}
                    className="font-bold flex flex-col lg:grid lg:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <Label htmlFor="username">Ingrese su usuario</Label>

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

                    <div className="">
                        <Label htmlFor="nombre">Ingrese su nombre</Label>

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

                    <div className="">
                        <Label htmlFor="apellido">Ingrese su apellido</Label>

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

                    {/* Email Address */}
                    <div className="">
                        <Label htmlFor="email">Ingrese su email</Label>

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
                    <div className="">
                        <Label htmlFor="password">Ingrese una contraseña</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="new-password"
                        />

                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="">
                        <Label htmlFor="passwordConfirmation">
                            Repita la contraseña
                        </Label>

                        <Input
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                        />

                        <InputError
                            messages={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="num_telefono">
                            Ingrese su numero de telefono
                        </Label>

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
                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href="/login"
                            className="underline text-sm text-gray-600 hover:text-gray-900">
                            ¿Ya tenes cuenta?
                        </Link>
                    </div>
                    <Button className="mt-5 w-full">Registrarse</Button>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Register
