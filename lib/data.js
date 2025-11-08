// Estes são os dados mockados que estávamos usando no protótipo.
// Agora eles vivem em seu próprio arquivo e podem ser importados
// por qualquer página que precisar deles.

export const mockPopList = [
  {
    "id": "POP-001",
    "titulo": "Como eu preparo um vídeo para o YouTube",
    "autor": "Daniel",
    "empresa_contexto": "ProdutiveMe - canal digital",
    "categoria": "Marketing / YouTube",
    "camada": "Operacional",
    "tags": ["roteiro", "edição", "thumbnail"],
    "nivel_complexidade": "Intermediário",
    "quando_usar": "Ao planejar e gravar vídeos para o canal",
    "objetivo": "Padronizar a criação de vídeos e reduzir tempo de produção",
    "materiais_ou_entradas": ["Roteiro aprovado", "Gravações brutas (vídeo e áudio)", "Banco de trilhas e B-rolls"],
    "passo_a_passo": [
        { "ordem": 1, "descricao": "Revisar o roteiro e marcar pontos de corte/B-roll", "responsavel": "Editor" },
        { "ordem": 2, "descricao": "Sincronizar áudio e vídeo", "responsavel": "Editor" },
        { "ordem": 3, "descricao": "Fazer o primeiro corte (remover erros e pausas)", "responsavel": "Editor" },
        { "ordem": 4, "descricao": "Adicionar trilha sonora, B-rolls e legendas dinâmicas", "responsavel": "Editor" },
        { "ordem": 5, "descricao": "Enviar para revisão do Autor (Daniel)", "responsavel": "Editor" },
        { "ordem": 6, "descricao": "Aplicar correções e exportar versão final", "responsavel": "Editor" },
        { "ordem": 7, "descricao": "Criar Thumbnail e agendar postagem no YouTube Studio", "responsavel": "Autor" }
    ],
    "decisoes_excecoes": "Se o vídeo for patrocinado, incluir o disclaimer de publicidade nos primeiros 30 segundos.",
    "saidas_ou_resultados": ["Vídeo publicado no YouTube", "Thumbnail finalizada", "Arquivo .mp4 final no Google Drive"],
    "dicas_e_boas_praticas": "Use templates (presets) no CapCut/Premiere para agilizar a edição. Sempre grave o áudio em um dispositivo separado para garantir qualidade.",
    "problemas_comuns": "Gravar sem revisar o áudio e perder todo o material. Esquecer de adicionar os 'cards' e 'telas finais' no YouTube Studio.",
    "ferramentas_usadas": ["Notion", "CapCut (Desktop)", "YouTube Studio", "Google Drive"],
    "historia_curta": "Criei esse fluxo após perceber que estávamos perdendo muito tempo com retrabalho na edição. Padronizar as etapas reduziu o tempo de produção pela metade e melhorou a consistência do canal.",
    "impacto_no_negocio": "Redução de 50% no tempo de produção de cada vídeo.",
    "inspirado_em": "Workflow do canal Ali Abdaal",
    "fluxograma_mermaid": `
        graph LR;
            A[Início: Roteiro Aprovado] --> B(1. Revisar roteiro);
            B --> C(2. Sincronizar áudio/vídeo);
            C --> D(3. Primeiro corte);
            D --> E(4. Add B-rolls/trilha);
            E --> F{5. Revisão Autor};
            F -- Aprova? --> G(7. Thumbnail/Agendar);
            F -- Correções? --> H(6. Aplicar correções);
            H --> E;
            G --> I[Fim: Publicado];
    `,
    "avaliacao_media": 4.8
  },
  {
    "id": "POP-002",
    "titulo": "Processo Semanal de Fechamento Financeiro (PMEs)",
    "autor": "Simone",
    "empresa_contexto": "Consultoria BPO Financeiro",
    "categoria": "Financeiro",
    "camada": "Tático",
    "tags": ["financeiro", "contas a pagar", "fluxo de caixa"],
    "nivel_complexidade": "Iniciante",
    "quando_usar": "Toda sexta-feira, para garantir que a semana está fechada.",
    "objetivo": "Garantir a conciliação bancária e visibilidade do fluxo de caixa de curto prazo.",
    "materiais_ou_entradas": ["Extratos bancários (OFX ou PDF)", "Relatório de vendas da plataforma (Ex: Hotmart, Stripe)", "Pasta de boletos/contas a pagar da semana"],
    "passo_a_passo": [
        { "ordem": 1, "descricao": "Importar extratos bancários no sistema de gestão (Ex: Conta Azul, Nibo)", "responsavel": "Assistente" },
        { "ordem": 2, "descricao": "Conciliar todas as entradas e saídas", "responsavel": "Assistente" },
        { "ordem": 3, "descricao": "Verificar se todas as contas da semana foram pagas", "responsavel": "Assistente" },
        { "ordem": 4, "descricao": "Gerar relatório de Fluxo de Caixa para a próxima semana", "responsavel": "Gestor" }
    ],
    "decisoes_excecoes": "Se uma conta tiver um valor divergente, marcar como 'não conciliado' e notificar o Gestor.",
    "saidas_ou_resultados": ["Conciliação bancária concluída", "Relatório de fluxo de caixa atualizado"],
    "dicas_e_boas_praticas": "Não deixe acumular! Fazer isso semanalmente leva 30 minutos. Fazer mensalmente pode levar um dia inteiro.",
    "problemas_comuns": "Esquecer de lançar taxas de cartão de crédito ou tarifas bancárias.",
    "ferramentas_usadas": ["Conta Azul", "Google Sheets (para relatórios)", "Banco Online"],
    "historia_curta": "Muitos clientes PMEs se perdiam no financeiro. Criei este POP simples de 4 etapas para eles executarem toda sexta-feira e nunca mais perderem o controle.",
    "impacto_no_negocio": "Clientes ganharam visibilidade total do caixa e evitaram multas por atraso.",
    "inspirado_em": "Metodologia BPO padrão",
    "fluxograma_mermaid": `
        graph LR;
            A[Início: Sexta-feira] --> B(1. Importar extratos);
            B --> C(2. Conciliar E/S);
            C --> D(3. Verificar contas pagas);
            D --> E(4. Gerar Relatório FC);
            E --> F[Fim: Semana Fechada];
    `,
    "avaliacao_media": 4.9
  },
  {
    "id": "POP-003",
    "titulo": "Processo Mestre de Onboarding de Novo Colaborador (25 Etapas)",
    "autor": "RH Estratégico",
    "empresa_contexto": "Empresa de Tech (SaaS), 50-100 Colabs",
    "categoria": "Recursos Humanos / People",
    "camada": "Estratégico",
    "tags": ["onboarding", "rh", "contratação", "cultura", "gestão"],
    "nivel_complexidade": "Avançado",
    "quando_usar": "A partir do 'sim' do candidato, até 30 dias após o início.",
    "objetivo": "Garantir uma integração completa, técnica e cultural do novo colaborador, reduzindo o 'time to value' e aumentando a retenção.",
    "materiais_ou_entradas": ["Carta Oferta assinada", "Dados do candidato", "Kit de Boas-Vindas", "Notebook configurado"],
    "passo_a_passo": [
        { "ordem": 1, "descricao": "Enviar contrato e carta oferta para assinatura digital", "responsavel": "RH" },
        { "ordem": 2, "descricao": "Coletar documentos de admissão via formulário seguro", "responsavel": "RH" },
        { "ordem": 3, "descricao": "Disparar envio do Kit de Boas-Vindas (Swag)", "responsavel": "RH" },
        { "ordem": 4, "descricao": "Criar acessos básicos (Email, Slack, HRIS)", "responsavel": "TI" },
        { "ordem": 5, "descricao": "Configurar e enviar notebook para o colaborador", "responsavel": "TI" },
        { "ordem": 6, "descricao": "Agendar reunião de Boas-Vindas (Dia 1)", "responsavel": "RH" },
        { "ordem": 7, "descricao": "Agendar reunião de alinhamento (Dia 1)", "responsavel": "Gestor" },
        { "ordem": 8, "descricao": "Apresentação de Boas-Vindas (Cultura e Benefícios)", "responsavel": "RH" },
        { "ordem": 9, "descricao": "Sessão de configuração de máquina e acessos", "responsavel": "TI" },
        { "ordem": 10, "descricao": "Apresentação formal ao time (Daily ou similar)", "responsavel": "Gestor" },
        { "ordem": 11, "descricao": "Nomear 'Buddy' (colega de apoio) e apresentar", "responsavel": "Gestor" },
        { "ordem": 12, "descricao": "Treinamento de Ferramentas (Slack, Notion, Drive)", "responsavel": "Buddy" },
        { "ordem": 13, "descricao": "Definir e passar a primeira tarefa (simples)", "responsavel": "Gestor" },
        { "ordem": 14, "descricao": "Check-in de 1ª Semana", "responsavel": "Gestor" },
        { "ordem": 15, "descricao": "Treinamento de Produto (Visão Geral)", "responsavel": "PO/Especialista" },
        { "ordem": 16, "descricao": "Treinamento de Segurança da Informação", "responsavel": "TI" },
        { "ordem": 17, "descricao": "Workshop de Processos Internos (Ex: Reembolso)", "responsavel": "Financeiro" },
        { "ordem": 18, "descricao": "Check-in de 2ª Semana (RH)", "responsavel": "RH" },
        { "ordem": 19, "descricao": "Definição de OKRs/Metas para os próximos 60 dias", "responsavel": "Gestor" },
        { "ordem": 20, "descricao": "Sessão de 'Sombra' com o Buddy", "responsavel": "Buddy" },
        { "ordem": 21, "descricao": "Treinamento Específico da Área", "responsavel": "Gestor" },
        { "ordem": 22, "descricao": "Coletar feedback do colaborador sobre o onboarding", "responsavel": "RH" },
        { "ordem": 23, "descricao": "Reunião de Avaliação dos 30 Dias", "responsavel": "Gestor" },
        { "ordem": 24, "descricao": "Criar Plano de Desenvolvimento (PDI) inicial", "responsavel": "Gestor" },
        { "ordem": 25, "descricao": "Transição formal do 'Onboarding' para 'Operação'", "responsavel": "RH" }
    ],
    "decisoes_excecoes": "Se o colaborador for de outro país, iniciar o processo de visto na Etapa 1. Se for 100% presencial, pular Etapa 5 e fazer na Etapa 9.",
    "saidas_ou_resultados": ["Colaborador integrado", "Avaliação de 30 dias preenchida", "OKRs definidos"],
    "dicas_e_boas_praticas": "Não sobrecarregue o Dia 1. Espalhe os treinamentos. O 'Buddy' é crucial para dúvidas 'bobas' que o colaborador tem vergonha de perguntar ao gestor.",
    "problemas_comuns": "TI demorar para liberar acessos e o colaborador ficar ocioso. Gestor 'sumir' na primeira semana.",
    "ferramentas_usadas": ["Gupy", "Slack", "Notion", "Google Workspace", "Zoom", "Loom"],
    "historia_curta": "Nosso turnover nos primeiros 3 meses era de 35%. Mapeamos tudo e criamos este processo 'exagerado' que hoje é 90% automatizado. A retenção no primeiro ano aumentou 40%.",
    "impacto_no_negocio": "Aumento de 40% na retenção de talentos no primeiro ano.",
    "inspirado_em": "Processo de Onboarding da GitLab",
    "fluxograma_mermaid": `
        graph LR;
            subgraph "Pré-Início (Etapas 1-5)"
                direction LR
                A(1. Enviar Contrato) --> B(2. Coletar Docs);
                B --> C(3. Enviar Kit);
                C --> D(4. Criar Acesso);
                D --> E(5. Configurar Notebook);
            end
            
            subgraph "Dia 1 (Etapas 6-10)"
                direction LR
                F(6. Agendar Boas-Vindas) --> G(7. Agendar Alinhamento);
                G --> H(8. Apres. Cultura);
                H --> I(9. Config. Máquina);
                I --> J(10. Apres. Time);
            end

            subgraph "Semana 1 (Etapas 11-14)"
                direction LR
                K(11. Nomear Buddy) --> L(12. Treinar Ferramentas);
                L --> M(13. 1ª Task);
                M --> N(14. Check-in Gestor);
            end

            subgraph "Semana 2-3 (Etapas 15-21)"
                direction LR
                O(15. Treinar Produto) --> P(16. Treinar Segurança);
                P --> Q(17. Treinar Processos);
                Q --> R(18. Check-in RH);
                R --> S(19. Definir OKRs);
                S --> T(20. Sombra Buddy);
                T --> U(21. Treinar Área);
            end

            subgraph "Dia 30 (Etapas 22-25)"
                direction LR
                V(22. Coletar Feedback) --> W(23. Avaliação 30d);
                W --> X(24. Criar PDI);
                X --> Y(25. Transição);
            end

            E --> F;
            J --> K;
            N --> O;
            U --> V;
            Y --> Z[Fim];
    `,
    "avaliacao_media": 5.0
  }
];