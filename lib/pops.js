// URLs dos seus webhooks
const N8N_POPS_URL = 'https://work.produ-cloud.com/webhook/produpop_carrega_todos_pops';
const N8N_AUTHORS_URL = 'https://work.produ-cloud.com/webhook/produpop_carrega_todos_autores';

/**
 * Processa um único POP vindo do N8N.
 * Ele faz o JSON.parse() dos campos que são strings
 * e adiciona o nome do autor usando o authorMap.
 */
function processPop(pop, authorMap) {
  try {
    return {
      ...pop,
      // Traduz os campos que são strings JSON
      tags: JSON.parse(pop.tags || '[]'),
      materiais_ou_entradas: JSON.parse(pop.materiais_ou_entradas || '[]'),
      passo_a_passo: JSON.parse(pop.passo_a_passo || '[]'),
      saidas_ou_resultados: JSON.parse(pop.saidas_ou_resultados || '[]'),
      ferramentas_usadas: JSON.parse(pop.ferramentas_usadas || '[]'),
      
      // Faz o "join" com os autores a partir do Map
      // O seu JSON de autores tem a coluna "nome"
      autor_nome: authorMap[pop.id_autor] ? authorMap[pop.id_autor].nome : "Autor Desconhecido",
    };
  } catch (error) {
    console.error(`Erro ao processar POP ${pop.id}:`, error);
    return null; // Retorna nulo se o POP estiver mal formatado
  }
}

/**
 * Busca todos os POPs e Autores do N8N e faz o "join".
 */
export async function getAllPops() {
  try {
    // 1. Buscar os dois webhooks em paralelo (muito mais rápido)
    const [popsResponse, authorsResponse] = await Promise.all([
      fetch(N8N_POPS_URL),
      fetch(N8N_AUTHORS_URL)
    ]);

    if (!popsResponse.ok) {
      throw new Error(`Falha ao buscar POPs do N8N: ${popsResponse.statusText}`);
    }
    if (!authorsResponse.ok) {
      throw new Error(`Falha ao buscar Autores do N8N: ${authorsResponse.statusText}`);
    }
    
    const allPops = await popsResponse.json();
    const allAuthors = await authorsResponse.json();

    // 2. Criar um "Mapa" de autores para o join (ex: { 1: {id: 1, nome: "Daniel", ...} })
    const authorMap = {};
    for (const author of allAuthors) {
      authorMap[author.id] = author;
    }

    // 3. Processar os POPs
    const processedPops = allPops
      .filter(pop => pop.publicado === true) // Filtra apenas os publicados
      .map(pop => processPop(pop, authorMap)) // Passa o authorMap para processar
      .filter(pop => pop !== null); // Remove POPs que falharam no processamento
      
    return processedPops;

  } catch (error) {
    console.error("Erro em getAllPops:", error);
    // Em caso de erro, retorna um array vazio para não quebrar o site
    return []; 
  }
}