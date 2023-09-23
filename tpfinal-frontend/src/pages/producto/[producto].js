import React from 'react'
import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'

const infoProducto = () => {
    return(
        <AppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1>Producto </h1>
                </div>
            </div>
        </AppLayout>

    )
}

export async function getServerSideProps({query}){
    console.log(query)
    return {
        props:{

        }
    }
}

export default infoProducto