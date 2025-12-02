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
        {/* Ícone do Threads (Wikimedia) */}
        <svg aria-label="Threads" width="20" height="20" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path className="x19hqcy" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.684 108.662 128.946 98.4405 129.507Z"></path>
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
        {/* Ícone do Pinterest (SVG Repo) */}
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="currentColor" />
          <path d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 21.6801 5.38269 26.5702 10.2435 28.7655C10.25 28.6141 10.2573 28.4752 10.2636 28.3561C10.2722 28.1938 10.2788 28.0682 10.2788 27.9976C10.2788 27.5769 10.5649 25.4904 10.5649 25.4904L12.3149 18.3053C12.0457 17.8678 11.8438 16.9423 11.8438 16.2356C11.8438 12.9711 13.6611 12.2644 14.7716 12.2644C16.1851 12.2644 16.5048 13.7957 16.5048 14.9231C16.5048 15.5194 16.1955 16.4528 15.8772 17.4134C15.5398 18.4314 15.1923 19.4799 15.1923 20.1899C15.1923 21.5697 16.5553 22.2596 17.4976 22.2596C19.988 22.2596 22.2764 19.1298 22.2764 16C22.2764 12.8702 20.8125 9.08412 16.0168 9.08412C11.2212 9.08412 9.06731 12.7356 9.06731 15.5288C9.06731 17.4134 9.77404 18.7933 10.1274 19.0288C10.2284 19.1186 10.4 19.3957 10.2788 19.786C10.1577 20.1764 9.9367 21.0481 9.84135 21.4351C9.83013 21.5248 9.72356 21.6774 9.38702 21.5697C8.96635 21.4351 6.29087 19.7524 6.29087 15.5288C6.29087 11.3053 9.60577 6.39182 16.0168 6.39182C22.4279 6.39182 25.7091 10.6995 25.7091 16C25.7091 21.3005 21.4183 24.6827 18.1538 24.6827C15.5423 24.6827 14.5192 23.516 14.3341 22.9327L13.3413 26.7187C13.1069 27.3468 12.6696 28.4757 12.1304 29.4583C13.3594 29.8111 14.6576 30 16 30Z" fill="white" />
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

  // Inicializa o Mermaid.js
  useEffect(() => {
    if (pop && pop.fluxograma_mermaid) {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          flowchart: {
            useMaxWidth: false
          }
        });

        // Pequeno delay para garantir que o DOM foi atualizado com o conteúdo do diagrama
        setTimeout(() => {
          mermaid.run({
            querySelector: '.mermaid'
          });
        }, 100);
      } catch (e) {
        console.error('Erro ao inicializar Mermaid:', e);
      }
    }
  }, [pop]);

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