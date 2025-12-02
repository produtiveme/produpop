import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
// APAGADO: import { mockPopList } from '@/lib/data';
import { getAllPops } from '@/lib/pops'; // NOVO: Importa a função real
import mermaid from 'mermaid';

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


// --- COMPONENTES AUXILIARES ---

const ShareButtons = ({ title }) => {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-gray-100">
      <span className="text-sm font-medium text-gray-500 mr-2">Compartilhar:</span>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-[#DCF8C6] text-[#25D366] rounded-full hover:bg-[#d0f0b6] transition-colors"
        title="Compartilhar no WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-50 text-[#0A66C2] rounded-full hover:bg-blue-100 transition-colors"
        title="Compartilhar no LinkedIn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
      </a>

      {/* Twitter/X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors"
        title="Compartilhar no X (Twitter)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </a>

      {/* Threads */}
      <a
        href={`https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors"
        title="Compartilhar no Threads"
      >
        {/* Ícone do Threads (Simple Icons) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.19 19.31C10.48 19.31 8.92 18.78 7.78 17.9C6.66 17.04 6.06 15.85 6.06 14.51C6.06 11.62 8.66 9.2 12.19 9.2C13.74 9.2 15.2 9.69 16.29 10.57C17.28 11.38 17.85 12.51 17.85 13.69C17.85 15.96 16.08 17.89 13.61 17.89C12.7 17.89 11.88 17.63 11.3 17.16C10.73 16.7 10.41 16.05 10.41 15.33C10.41 13.78 11.67 12.51 13.21 12.51C13.97 12.51 14.67 12.82 15.18 13.39C15.52 13.77 15.71 14.26 15.71 14.78C15.71 14.93 15.7 15.08 15.67 15.22C15.48 16.15 14.67 16.81 13.73 16.81C13.16 16.81 12.62 16.59 12.39 16.01C12.15 15.43 12.39 14.93 12.39 14.92L12.96 14.91C12.96 14.92 12.64 15.42 12.92 16.13C13.06 16.49 13.38 16.63 13.73 16.63C14.36 16.63 14.9 16.19 15.03 15.57C15.05 15.47 15.06 15.37 15.06 15.27C15.06 14.92 14.93 14.6 14.7 14.34C14.33 13.93 13.8 13.7 13.21 13.7C12.33 13.7 11.61 14.43 11.61 15.33C11.61 15.76 11.79 16.14 12.11 16.4C12.48 16.71 13.01 16.89 13.61 16.89C15.55 16.89 16.96 15.36 16.96 13.69C16.96 12.21 16.24 10.83 15.03 9.85C13.7 8.78 11.95 8.19 10.09 8.19C6.01 8.19 2.69 11.51 2.69 15.59C2.69 19.67 6.01 22.99 10.09 22.99C12.14 22.99 14.09 22.18 15.54 20.73L16.18 21.37C14.56 22.99 12.42 23.89 10.09 23.89C5.51 23.89 1.79 20.17 1.79 15.59C1.79 11.01 5.51 7.29 10.09 7.29C12.19 7.29 14.16 7.96 15.66 9.17C17.02 10.27 17.85 11.83 17.85 13.69C17.85 16.25 15.91 18.19 13.61 18.19C12.76 18.19 12.01 17.94 11.4 17.48C10.79 17.02 10.41 16.36 10.41 15.59C10.41 15.56 10.41 15.53 10.41 15.5C10.41 15.47 10.41 15.44 10.41 15.41L12.19 19.31Z" />
        </svg>
      </a>

      {/* Pinterest */}
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-red-50 text-[#E60023] rounded-full hover:bg-red-100 transition-colors"
        title="Compartilhar no Pinterest"
      >
        {/* Ícone do Pinterest (Apenas o P - FontAwesome) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="currentColor">
          <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 104.9 36.9 104.9 102.4 0 58.9-35.2 104.8-87.7 104.8-26.7 0-47.4-16.3-40.8-44.4 8.4-37 25.1-76.7 25.1-104.5 0-24.6-13.1-45.5-41.5-45.5-33.1 0-59.4 34-59.4 79.1 0 27.3 9.7 53.3 26.3 70.1 2.5 2.5 3.5 5.4 1.7 8.5-10.2 17.9-24.3 43.8-35.2 58.8-17 23.5-51.7 51.6-51.7 51.6 27.1 50.2 79.5 84.3 140 84.3 87.1 0 157.6-70.7 157.6-157.6 0-87-70.5-157.6-157.6-157.6z" />
        </svg>
      </a>

      {/* Reddit */}
      <a
        href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-orange-50 text-[#FF4500] rounded-full hover:bg-orange-100 transition-colors"
        title="Compartilhar no Reddit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.249-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>
      </a>

      {/* Medium */}
      <a
        href={`https://medium.com/new-story?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors"
        title="Escrever no Medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" /></svg>
      </a>

      {/* Substack */}
      <a
        href={`https://substack.com/publish`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-[#FF6719] text-white rounded-full hover:bg-[#e55c17] transition-colors"
        title="Escrever no Substack"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" /></svg>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors relative group"
        title="Copiar Link"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        )}
        {copied && <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">Copiado!</span>}
      </button>
    </div>
  );
};


// --- LÓGICA DE DADOS (Next.js) ---

/*
  getStaticPaths() - ATUALIZADO
  Busca os dados reais do N8N para saber quais caminhos (slugs) gerar.
*/
export async function getStaticPaths() {
  const pops = await getAllPops(); // Busca dados reais

  const paths = pops.map(pop => ({
    // ATUALIZADO: Usamos 'slug' (o nome do arquivo) e 'pop.pop_slug' (o dado)
    params: { slug: pop.pop_slug },
  }));

  // fallback: 'blocking' vai gerar a página no primeiro acesso se ela não existir
  return { paths, fallback: 'blocking' };
}

/*
  getStaticProps({ params }) - ATUALIZADO
  Busca os dados para UMA página específica usando o 'slug'.
*/
export async function getStaticProps({ params }) {
  const allPops = await getAllPops(); // Busca todos os POPs processados

  // Encontra o POP específico pelo 'slug' da URL
  const pop = allPops.find(p => p.pop_slug === params.slug);

  if (!pop) {
    return { notFound: true };
  }

  return {
    props: { pop },
    revalidate: 60, // Também revalida esta página a cada 60s
  };
}

// --- COMPONENTE DA PÁGINA ---

import SEO from '@/components/SEO';

// ... (imports anteriores)

export default function PopDetailPage({ pop }) {

  // ... (useEffect do Mermaid permanece igual)

  // Fallback para 'fallback: blocking'
  if (!pop) {
    return <Layout><p>Carregando...</p></Layout>
  }

  // URL Canônica (Assumindo que o site está em produpop.com.br ou similar)
  // Idealmente, isso viria de uma variável de ambiente NEXT_PUBLIC_SITE_URL
  const siteUrl = 'https://produpop.com.br';
  const canonicalUrl = `${siteUrl}/pop/${pop.pop_slug}`;

  // Imagem padrão para compartilhamento (pode ser uma logo ou gerada dinamicamente no futuro)
  const ogImage = `${siteUrl}/og-image-default.png`;

  // --- DADOS ESTRUTURADOS (JSON-LD) para "HowTo" ---
  // Isso ajuda o Google a entender que é um passo a passo
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": pop.titulo,
    "description": pop.objetivo,
    "step": pop.passo_a_passo.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": `Passo ${step.ordem}`,
      "text": step.descricao,
      // Se tiver imagem no passo, adicionaríamos aqui: "image": step.imagem
    })),
    "supply": pop.materiais_ou_entradas.map(item => ({
      "@type": "HowToSupply",
      "name": item
    })),
    "tool": pop.ferramentas_usadas.map(tool => ({
      "@type": "HowToTool",
      "name": tool
    })),
    "author": {
      "@type": "Person",
      "name": pop.autor_nome,
      "jobTitle": pop.empresa_contexto // Contexto como "cargo/empresa"
    }
  };

  return (
    <Layout>
      {/* SEO e Metatags */}
      <SEO
        title={pop.titulo}
        description={pop.objetivo}
        canonical={canonicalUrl}
        ogImage={ogImage}
        ogType="article"
      />

      {/* JSON-LD injetado no Head */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="mb-4">
        <Link href="/" className="flex items-center gap-2 text-sm text-primary-500 hover:underline font-medium">
          <IconArrowLeft />
          Voltar para a lista
        </Link>
      </div>

      {/* Cabeçalho do POP */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-secondary-200 mb-6">
        <span className="text-sm font-medium text-primary-500">{pop.categoria}</span>
        <h1 className="text-4xl font-bold text-text mt-2 mb-3 font-heading">{pop.titulo}</h1>
        {/* ATUALIZADO: Usamos pop.autor_nome do nosso "join" */}
        <p className="text-lg text-gray-600">Por <span className="font-semibold text-text">{pop.autor_nome}</span> ({pop.empresa_contexto})</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {pop.tags.map(tag => (
            <span key={tag} className="text-xs text-text bg-gray-200 px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>

        <ShareButtons title={pop.titulo} />
      </div>

      {/* FLUXOGRAMA EM DESTAQUE */}
      {pop.fluxograma_mermaid && (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-secondary-200 mb-6 relative">
          <h2 className="text-2xl font-bold mb-6 font-heading">Fluxograma Visual 🧭</h2>
          <div className="p-4 border border-secondary-200 rounded-lg bg-bg overflow-x-auto">
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
              <li key={step.ordem} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary-500 text-white font-bold rounded-full mt-1">{step.ordem}</span>
                <div className="flex-1 space-y-3">

                  {/* Descrição Principal */}
                  <div>
                    <p className="font-semibold text-text text-lg">{step.descricao}</p>
                    {step.responsavel && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Responsável:</span> {step.responsavel}
                      </p>
                    )}
                  </div>

                  {/* Detalhes Extras (Canais e Ação) */}
                  {(step.canais || step.acao) && (
                    <div className="flex flex-wrap gap-4 text-sm bg-gray-50 p-3 rounded-md border border-gray-100">
                      {step.canais && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">📢</span>
                          <span className="font-medium text-gray-700">Canais:</span>
                          <span className="text-gray-600">{step.canais}</span>
                        </div>
                      )}
                      {step.acao && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">⚡</span>
                          <span className="font-medium text-gray-700">Ação:</span>
                          <span className="text-gray-600">{step.acao}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bloco de Decisão */}
                  {step.decisao && step.decisao.nome && (
                    <div className="mt-3 border-l-4 border-purple-200 pl-4 py-1">
                      <p className="font-bold text-purple-900 text-sm mb-2">🤔 {step.decisao.nome}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.decisao.sim && (
                          <div className="bg-green-50 text-green-800 text-xs p-2 rounded border border-green-100">
                            <span className="font-bold block mb-1">✅ Sim</span>
                            {step.decisao.sim}
                          </div>
                        )}
                        {step.decisao.nao && (
                          <div className="bg-red-50 text-red-800 text-xs p-2 rounded border border-red-100">
                            <span className="font-bold block mb-1">❌ Não</span>
                            {step.decisao.nao}
                          </div>
                        )}
                      </div>
                    </div>
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