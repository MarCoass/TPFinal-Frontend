import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import StoreLayout from '../layout'
const Catalogo = () => {
    return (
       <AppLayout>
         <StoreLayout>
            <Head>
                <title>Catalogo - Mar Nails</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Catalogo
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayout>
       </AppLayout>
    )
}

export default Catalogo
