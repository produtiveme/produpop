import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { mockPopList } from '@/lib/data';
import mermaid from 'mermaid'; // Importa o mermaid

// --- Ícones SVG ---
// (Em um projeto maior, eles iriam para seus próprios arquivos em /components/Icons)

const IconArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const IconLightbulb = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-accent1-600 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3 7.5a6.01 6.01 0 00-3-7.5m3 7.5a6.01 6.01 0 01-3-7.5m-9 7.5a9 9 0 019-9 9 9 0 019 9m-9 7.5v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m9 7.5a9 9 0 01-9-9 9 9 0 019 9m-9 7.5v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3 7.5a6.01 6.01 0 00-3-7.5m3 7.5a6.01 6.01 0 01-3-7.5" />
  </svg>
);

const IconWarning = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-secondary-600 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const IconRocket = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-accent2-600 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.25c-5.52 0-10.29 2.81-12.08 7.03L3.11 8.86a11.25 11.25 0 012.86-1.3A11.25 11.25 0 0113.34 3c3.14 0 6.01 1.01 8.3 2.7l.04.03.01.01.01.01a11.25 11.25 0 012.86 1.3l-1.01.73a11.25 11.25 0 01-2.22 14.37zM6.16 12.12a14.98 14.98 0 01-6.16 12.12A14.98 14.98 0 019.63 21.75c5.52 0 10.29-2.81 12.08-7.03L18.89 15.14a11.25 11.25 0 00-2.86 1.3 11.25 11.25 0 00-8.21-11.06 14.98 14.98 0 01-1.66 8.73z" />
  </svg>
);

// --- LÓGICA DE DADOS (Next.js) ---

/*
  getStaticPaths()
  Esta função diz ao Next.js quais páginas dinâmicas ele deve construir.
  Nós lemos a lista de POPs e criamos um "path" para cada ID.
*/
export async function getStaticPaths() {
  const paths = mockPopList.map(pop => ({
    params: { id: pop.id },
  }));

  return { paths, fallback: false }; // fallback: false = 404 se o ID não existir
}

/*
  getStaticProps({ params })
  Esta função busca os dados para UMA página específica.
  O 'params.id' vem da URL.
*/
export async function getStaticProps({ params }) {
  const pop = mockPopList.find(p => p.id === params.id);
  
  // Se não encontrar o pop (caso raro), retorna notFound
  if (!pop) {
    return { notFound: true };
  }

  return { props: { pop } };
}

// --- COMPONENTE DA PÁGINA ---

export default function PopDetailPage({ pop }) {

  // Este 'useEffect' roda no navegador DEPOIS que a página carrega.
  // É o lugar perfeito para inicializar o Mermaid.
  useEffect(() => {
    mermaid.initialize({ 
        startOnLoad: false, 
        theme: 'neutral',
        flowchart: {
            useMaxWidth: false // Esta é a configuração que descobrimos
        }
    });
    // Força o Mermaid a encontrar e renderizar todos os gráficos
    // que estão na página agora.
    mermaid.run();
  }, [pop]); // Re-roda se o POP mudar (para navegação client-side)

  return (
    <Layout>
      <Head>
        <title>{pop.titulo} - ProduPop</title>
        <meta name="description" content={pop.objetivo} />
      </Head>

      {/* Botão de Voltar */}
      <div className="mb-4">
        <Link href="/" className="flex items-center gap-2 text-sm text-primary-500 hover:underline font-medium">
          <IconArrowLeft />
          Voltar para a lista
        </Link>
      </div>

      {/* Cabeçalho do POP (Convertido do protótipo) */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-secondary-200 mb-6">
        <span className="text-sm font-medium text-primary-500">{pop.categoria}</span>
        <h1 className="text-4xl font-bold text-text mt-2 mb-3 font-heading">{pop.titulo}</h1>
        <p className="text-lg text-gray-600">Por <span className="font-semibold text-text">{pop.autor}</span> ({pop.empresa_contexto})</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {pop.tags.map(tag => (
            <span key={tag} className="text-xs text-text bg-gray-200 px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* FLUXOGRAMA EM DESTAQUE */}
      {pop.fluxograma_mermaid && (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-secondary-200 mb-6 relative">
          <h2 className="text-2xl font-bold mb-6 font-heading">Fluxograma Visual 🧭</h2>
          <div className="p-4 border border-secondary-200 rounded-lg bg-bg overflow-x-auto">
            {/* O Mermaid vai encontrar esta tag 'pre' e renderizar o gráfico */}
            <pre className="mermaid">
              {pop.fluxograma_mermaid}
            </pre>
          </div>
        </div>
      )}

      {/* Grid Principal (Receita e Aprendizados) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
        {/* Coluna Principal: A Receita */}
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm border border-secondary-200">
            
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 border-b border-secondary-200 pb-8">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider font-heading">Quando Usar</h3>
              <p className="text-base font-semibold text-text mt-1">{pop.quando_usar}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider font-heading">Complexidade</h3>
              <p className="text-base font-semibold text-text mt-1">{pop.nivel_complexidade}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider font-heading">Camada</h3>
              <p className="text-base font-semibold text-text mt-1">{pop.camada}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 font-heading">Objetivo</h2>
          <p className="text-lg text-gray-700 mb-8">{pop.objetivo}</p>
          
          <h2 className="text-2xl font-bold mb-4 font-heading">Ingredientes (Materiais ou Entradas)</h2>
          <ul className="list-disc list-inside space-y-2 mb-8 pl-2">
            {pop.materiais_ou_entradas.map(item => (
              <li key={item} className="text-text">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-6 font-heading">Modo de Preparo (Passo a Passo)</h2>
          <ol className="space-y-6 mb-8">
            {pop.passo_a_passo.map(step => (
              <li key={step.ordem} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary-500 text-white font-bold rounded-full">{step.ordem}</span>
                <div>
                  <p className="font-semibold text-text">{step.descricao}</p>
                  {step.responsavel && (
                    <span className="text-sm text-gray-500">(Responsável: {step.responsavel})</span>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <h2 className="text-2xl font-bold mb-4 mt-8 font-heading">Decisões e Exceções</h2>
          <p className="text-gray-700 mb-8">{pop.decisoes_excecoes}</p>

          <h2 className="text-2xl font-bold mb-4 font-heading">Resultado Esperado (Saídas)</h2>
          <ul className="list-disc list-inside space-y-2 mb-8 pl-2">
            {pop.saidas_ou_resultados.map(item => (
              <li key={item} className="text-text">{item}</li>
            ))}
          </ul>
        </div>

        {/* Coluna Lateral: Aprendizados */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <h3 className="text-lg font-bold mb-3 font-heading">A História por trás do POP</h3>
            <p className="text-gray-700 italic">"{pop.historia_curta}"</p>
          </div>

          <div className="bg-accent1-50 border border-accent1-200 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <IconLightbulb />
              <h3 className="text-lg font-bold text-accent1-900 font-heading">Dicas e Boas Práticas</h3>
            </div>
            <p className="text-accent1-800">{pop.dicas_e_boas_praticas}</p>
          </div>

          <div className="bg-secondary-50 border border-secondary-200 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <IconWarning />
              <h3 className="text-lg font-bold text-secondary-900 font-heading">Problemas Comuns</h3>
            </div>
            <p className="text-secondary-800">{pop.problemas_comuns}</p>
          </div>

          <div className="bg-accent2-100 border border-accent2-200 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <IconRocket />
              <h3 className="text-lg font-bold text-accent2-900 font-heading">Impacto no Negócio</h3>
            </div>
            <p className="text-accent2-800">{pop.impacto_no_negocio}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <h3 className="text-lg font-bold mb-4 font-heading">Ferramentas Usadas</h3>
            <div className="flex flex-wrap gap-2">
              {pop.ferramentas_usadas.map(tool => (
                <span key={tool} className="text-sm font-medium text-primary-700 bg-primary-100 px-3 py-1 rounded-full">{tool}</span>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <h3 className="text-lg font-bold mb-3 font-heading">Inspirado em:</h3>
            <p className="text-gray-700">{pop.inspirado_em}</p>
          </div>

        </div>

      </div>
    </Layout>
  );
}