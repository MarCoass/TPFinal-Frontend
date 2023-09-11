import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { router } from 'next/router'
import { useEffect } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import axios from 'axios'


export default function adminIndex() {
    const { user } = useAuth()

    const rolesAutorizados = [1]
    useEffect(() => {
        if (user) {
            if (!rolesAutorizados.includes(user.id_rol)) {
                router.push('/dashboard')
            }
        }
    }, [user])


    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/administracion/productos/nuevo-producto')
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    return (
        <>
            {user ? (
                <AppLayout
                    header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Nuevo Producto
                        </h2>
                    }>
                    <Head>
                        <title>Nuevo Producto - Mar Nails</title>
                    </Head>

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mx-2 my-4">
                                            <Label htmlFor="nombre">
                                                Nombre del producto
                                            </Label>
                                            <Input
                                                id="nombre"
                                                type="text"
                                                className="block mt-1 w-full"
                                                required
                                                autoFocus
                                                placeholder="nombre"
                                            />
                                        </div>

                                        <div className="m-2">
                                            <Label htmlFor="descripcion">
                                                Descripcion
                                            </Label>
                                            <Input
                                                id="descripcion"
                                                type="text"
                                                className="block mt-1 w-full"
                                                autoFocus
                                                placeholder="descripcion"
                                            />
                                        </div>

                                        <div className="m-2">
                                            <Label htmlFor="precio">
                                                Precio
                                            </Label>
                                            <Input
                                                id="precio"
                                                type="number"
                                                className="block mt-1 w-full"
                                                required
                                                autoFocus
                                                placeholder="precio"
                                            />
                                        </div>

                                        <div className="m-2">
                                            <Label htmlFor="stock">Stock</Label>
                                            <Input
                                                id="stock"
                                                type="number"
                                                className="block mt-1 w-full"
                                                required
                                                autoFocus
                                                placeholder="stock"
                                            />
                                        </div>

                                        <Button className="mt-5 w-full">
                                            Iniciar sesion
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </AppLayout>
            ) : (
                // Puedes mostrar un mensaje o redirigir al usuario si no está autenticado
                <div>No estás autenticado.</div>
            )}
        </>
    )
}
