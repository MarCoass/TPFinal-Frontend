import AdminLayout from '@/components/Layouts/AdminLayout'
import Head from 'next/head'

const Dashboard = () => {
    return (
        <AdminLayout
            header={
                <h2 className="font-bold text-xl text-gray-800 leading-tight">
                    Preferencias - Mar Nails
                </h2>
            }>
            <Head>
                <title>Preferencias - Mar Nails</title>
            </Head>

            <div className="py-12 ">
                <div className=" grid grid-cols-6 grid-rows-5 gap-4">
                   
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard
