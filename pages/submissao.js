import { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';

// Este é o componente da página de submissão
export default function SubmissionPage() {
  
  // --- LÓGICA DO FORMULÁRIO (React) ---
  
  // Usamos 'useState' para controlar o estado de cada campo do formulário
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    empresa_contexto: '',
    categoria: '',
    objetivo: '',
  });
  
  // Estado para controlar a mensagem de sucesso
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Função para atualizar o estado quando o usuário digita
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Função chamada quando o formulário é enviado
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    
    //
    // --- PONTO DE INTEGRAÇÃO N8N (FUTURO) ---
    //
    // Aqui é onde faremos a chamada `fetch` para a nossa API Route
    // que, por sua vez, chamará o webhook do N8N.
    //
    // fetch('/api/submit-pop', { method: 'POST', body: JSON.stringify(formData) })
    //
    
    // Por enquanto (MVP), vamos apenas logar os dados no console
    console.log('Dados do formulário enviados:', formData);
    
    // Limpa o formulário
    setFormData({
      titulo: '',
      autor: '',
      empresa_contexto: '',
      categoria: '',
      objetivo: '',
    });
    
    // Mostra a mensagem de sucesso
    setIsSubmitted(true);
    // Esconde a mensagem após 5 segundos
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  // --- RENDERIZAÇÃO (JSX) ---

  return (
    <Layout>
      <Head>
        <title>Submeter POP - ProduPop</title>
      </Head>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-secondary-200 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 font-heading">Compartilhe sua Receita de Processo</h1>
        <p className="text-gray-600 mb-8">
          Ajude outros empreendedores compartilhando um processo que funciona para você. Pense nisso como uma "receita":
          seja claro, direto e compartilhe suas dicas e aprendizados.
        </p>
        
        {/* Usamos o 'onSubmit' do React */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-text mb-1">Título do POP</label>
            <input
              type="text"
              id="titulo"
              placeholder="Ex: Como eu faço o onboarding de um novo cliente"
              className="w-full px-4 py-2 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="autor" className="block text-sm font-medium text-text mb-1">Seu Nome</label>
            <input
              type="text"
              id="autor"
              placeholder="Ex: Ana Silva"
              className="w-full px-4 py-2 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.autor}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="empresa_contexto" className="block text-sm font-medium text-text mb-1">Contexto da Empresa</label>
            <input
              type="text"
              id="empresa_contexto"
              placeholder="Ex: Agência de Marketing Digital, 10-20 funcionários"
              className="w-full px-4 py-2 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.empresa_contexto}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-text mb-1">Categoria</label>
            <input
              type="text"
              id="categoria"
              placeholder="Ex: Vendas, Financeiro, RH, Marketing"
              className="w-full px-4 py-2 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.categoria}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="objetivo" className="block text-sm font-medium text-text mb-1">Objetivo Principal</label>
            <textarea
              id="objetivo"
              rows="3"
              placeholder="O que esse processo resolve?"
              className="w-full px-4 py-2 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.objetivo}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-primary-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Enviar para Curadoria
            </button>
          </div>
        </form>
        
        {/* Mensagem de Sucesso (condicional) */}
        {isSubmitted && (
          <div className="mt-6 p-4 rounded-md bg-accent1-100 border border-accent1-200 text-accent1-900">
            Obrigado! Seu POP foi enviado para curadoria e será publicado em breve.
          </div>
        )}
      </div>
    </Layout>
  );
}