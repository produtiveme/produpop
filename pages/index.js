import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
// APAGADO: import { mockPopList } from '@/lib/data'; 
import { getAllPops } from '@/lib/pops'; // NOVO: Importa a função real

// ÍCONES SVG (colocamos aqui para simplicidade, poderiam ser componentes)
const IconSearch = () => (
  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

/*
  getStaticProps() ATUALIZADA
  Agora ela é assíncrona e busca os dados reais do N8N.
*/
export async function getStaticProps() {
  // const pops = mockPopList; // APAGADO
  const pops = await getAllPops(); // NOVO: Busca dados reais
  
  // Extrai categorias únicas para o filtro
  const categories = [...new Set(pops.map(p => p.categoria))].sort();

  return {
    props: {
      pops,
      categories,
    },
    // NOVO: Incremental Static Regeneration (ISR)
    // O Next.js vai re-buscar os dados do N8N a cada 60 segundos
    // sem precisar de um novo deploy!
    revalidate: 60, // Em segundos
  };
}

// Esta é a nossa Página Home
export default function HomePage({ pops, categories }) {
  
  // --- LÓGICA DE FILTRO COM REACT ---
  // (Esta lógica permanece a mesma)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPops = useMemo(() => {
    return pops.filter(pop => {
      // 1. Filtro de Categoria
      const categoryMatch = (selectedCategory === 'all') || (pop.categoria === selectedCategory);
      if (!categoryMatch) return false;

      // 2. Filtro de Texto
      if (searchTerm.length > 1) {
        const textToSearch = [
            pop.titulo,
            pop.categoria,
            ...pop.tags
        ].join(' ').toLowerCase();

        if (!textToSearch.includes(searchTerm.toLowerCase())) {
            return false;
        }
      }
      return true; // Passou nos dois
    });
  }, [pops, searchTerm, selectedCategory]);
  // --- FIM DA LÓGICA DE FILTRO ---


  // --- RENDERIZAÇÃO (JSX) ---
  return (
    <Layout>
      <Head>
        <title>ProduPop - Explore Receitas de Processos</title>
      </Head>

      {/* Seção de Busca (convertida do protótipo) */}
      <div className="p-6 rounded-lg shadow-sm border border-secondary-200 mb-8 bg-gradient-to-r from-bg via-secondary-100 to-secondary-200">
        <h1 className="text-2xl font-bold mb-4 font-heading">Explore Receitas de Processos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search-input" className="block text-sm font-medium text-text mb-1">Buscar por termo</label>
            <div className="relative">
              <input
                type="text"
                id="search-input"
                value={searchTerm} // O valor é controlado pelo "state"
                onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o "state"
                placeholder="Buscar por 'financeiro', 'contratação', 'marketing'..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-text mb-1">Filtrar por Categoria</label>
            <select
              id="category-filter"
              value={selectedCategory} // O valor é controlado pelo "state"
              onChange={(e) => setSelectedCategory(e.target.value)} // Atualiza o "state"
              className="w-full p-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todas as Categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid de POPs */}
      {filteredPops.length === 0 ? (
        // Mensagem de "Nenhum Resultado"
        <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700">Nenhum POP encontrado</h3>
            <p className="text-gray-500 mt-2">Tente ajustar seus filtros de busca.</p>
        </div>
      ) : (
        // A lista de cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPops.map(pop => (
            // Cada card agora é um <Link> para a página de detalhe
            <Link 
              href={`/pop/${pop.pop_slug}`} // ATUALIZADO: Usamos pop.pop_slug para a URL
              key={pop.id} // ATUALIZADO: Usamos pop.id (o número do N8N) como key
              className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200 hover:shadow-md transition-shadow cursor-pointer block"
            >
              <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-primary-600 bg-primary-100 px-3 py-1 rounded-full">{pop.categoria}</span>
                  <span className="text-sm text-gray-500">⭐ {pop.avaliacao_media}</span>
              </div>
              <h2 className="text-xl font-bold font-heading mb-2 text-text">{pop.titulo}</h2>
              {/* ATUALIZADO: Usamos pop.autor_nome do nosso "join" */}
              <p className="text-gray-600 text-sm mb-4">Por: <span className="font-medium">{pop.autor_nome}</span> em <span className="font-medium">{pop.empresa_contexto}</span></p>
              <div className="flex flex-wrap gap-2">
                  {pop.tags.map(tag => (
                    <span key={tag} className="text-xs text-text bg-gray-200 px-2 py-1 rounded-full">{tag}</span>
                  ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}