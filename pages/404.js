import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/Layout';

export default function Custom404() {
    return (
        <Layout>
            <Head>
                <title>Página não encontrada - ProduPop</title>
            </Head>

            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-9xl mb-4">🧭</div>
                <h1 className="text-6xl font-bold font-heading text-primary-500 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-text mb-6">Ops! Parece que nos perdemos.</h2>
                <p className="text-gray-600 max-w-md mb-8">
                    A página que você está procurando não existe ou foi movida.
                    Mas não se preocupe, temos muitas outras receitas de processos para você explorar.
                </p>

                <Link
                    href="/"
                    className="bg-primary-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-600 shadow-md transition-transform hover:scale-105"
                >
                    Voltar para o Início
                </Link>
            </div>
        </Layout>
    );
}
