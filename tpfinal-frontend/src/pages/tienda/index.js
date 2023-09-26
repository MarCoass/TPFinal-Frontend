"use client"
import AppLayout from '@/components/Layouts/AppLayout'
import { useRouter } from 'next/router'
import StoreLayout from './layout'
import { useEffect } from 'react';

const Tienda = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/tienda/catalogo');
    }, []);
    return (

        <StoreLayout></StoreLayout>

    )
}

export default Tienda
