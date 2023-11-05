import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <GuestLayout>
             <Head>
                <title>Iniciar Sesion - Mar Nails</title>
            </Head>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-24 h-auto fill-current text-violeta-500" />
                    </Link>
                }>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />
                <h1 className="text-black text-4xl m-5 text-center">
                    Iniciar sesion
                </h1>
                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Ingrese su email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                            placeholder="ejemplo@correo.com"
                        />

                        <InputError
                            messages={errors.email}
                            className="mt-2 border-rose-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Ingrese su contraseña</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                            placeholder="contraseña"
                        />

                        <InputError
                            messages={errors.password}
                            className="mt-2 border-rose-500"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        {/* Remember Me */}
                        <div className="block ">
                            <label
                                htmlFor="remember_me"
                                className="inline-flex items-center">
                                <input
                                    id="remember_me"
                                    type="checkbox"
                                    name="remember"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={event =>
                                        setShouldRemember(event.target.checked)
                                    }
                                />

                                <span className="ml-2 text-sm text-gray-600">
                                    Recordarme
                                </span>
                            </label>
                        </div>{' '}
                        <Link
                            href="/forgot-password"
                            className=" underline text-sm text-gray-600 hover:text-gray-900">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <button className="flex cursor-pointer items-center rounded-md border-2 border-black bg-rosado-500 px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">Iniciar sesion</button>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Login
