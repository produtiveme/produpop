document.addEventListener('DOMContentLoaded', async () => {
    if (!ApiService.checkAuth()) return;

    const form = document.getElementById('pop-form');
    const urlParams = new URLSearchParams(window.location.search);
    const popId = urlParams.get('id');
    const isEditing = !!popId;

    // Elementos de UI
    const pageTitle = document.getElementById('page-title');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const loadingOverlay = document.getElementById('loading-overlay');

    // Inicialização
    try {
        await loadAuthors();
        initMermaidEditor(); // Inicializa o editor Mermaid

        if (isEditing) {
            pageTitle.textContent = 'Editar POP';
            await loadPopData(popId);
        } else {
            pageTitle.textContent = 'Novo POP';
        }
    } catch (error) {
        alert('Erro ao carregar dados: ' + error.message);
    }

    // Carregar Autores
    async function loadAuthors() {
        const authorsRes = await fetch(API_CONFIG.urls.authors);
        const authors = await authorsRes.json();
        const select = document.getElementById('id_autor');

        authors.forEach(author => {
            const option = document.createElement('option');
            option.value = author.id;
            option.textContent = author.nome;
            select.appendChild(option);
        });
    }

    // Carregar Dados do POP
    async function loadPopData(id) {
        loadingOverlay.classList.remove('hidden');
        try {
            const pops = await ApiService.getAllPops();
            const pop = pops.find(p => p.id == id);

            if (!pop) throw new Error('POP não encontrado');

            // Preencher campos simples
            document.getElementById('titulo').value = pop.titulo || '';
            document.getElementById('pop_slug').value = pop.pop_slug || '';
            document.getElementById('categoria').value = pop.categoria || '';
            document.getElementById('id_autor').value = pop.id_autor || '';
            document.getElementById('publicado').value = pop.publicado ? 'true' : 'false';

            document.getElementById('objetivo').value = pop.objetivo || '';
            document.getElementById('quando_usar').value = pop.quando_usar || '';
            document.getElementById('nivel_complexidade').value = pop.nivel_complexidade || '';
            document.getElementById('camada').value = pop.camada || '';
            document.getElementById('empresa_contexto').value = pop.empresa_contexto || '';

            document.getElementById('historia_curta').value = pop.historia_curta || '';
            document.getElementById('dicas_e_boas_praticas').value = pop.dicas_e_boas_praticas || '';
            document.getElementById('problemas_comuns').value = pop.problemas_comuns || '';
            document.getElementById('impacto_no_negocio').value = pop.impacto_no_negocio || '';
            document.getElementById('inspirado_em').value = pop.inspirado_em || '';
            document.getElementById('decisoes_excecoes').value = pop.decisoes_excecoes || '';

            document.getElementById('fluxograma_mermaid').value = pop.fluxograma_mermaid || '';

            // Preencher Listas
            fillList('tags-container', pop.tags);
            fillList('materiais-container', pop.materiais_ou_entradas);
            fillList('saidas-container', pop.saidas_ou_resultados);
            fillList('ferramentas-container', pop.ferramentas_usadas);

            // Preencher Passos
            fillSteps(pop.passo_a_passo);

        } catch (error) {
            console.error(error);
            alert('Erro ao carregar POP');
        } finally {
            loadingOverlay.classList.add('hidden');
        }
    }

    // --- Gerenciamento de Listas Simples ---
    window.addListItem = (containerId) => {
        const container = document.getElementById(containerId);
        const div = document.createElement('div');
        div.className = 'flex gap-2 mb-2';
        div.innerHTML = `
            <input type="text" class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" placeholder="Item...">
            <button type="button" onclick="this.parentElement.remove()" class="text-red-600 hover:text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
        container.appendChild(div);
    };

    function fillList(containerId, items) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        if (!items) return;
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'flex gap-2 mb-2';
            div.innerHTML = `
                <input type="text" value="${item}" class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                <button type="button" onclick="this.parentElement.remove()" class="text-red-600 hover:text-red-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            `;
            container.appendChild(div);
        });
    }

    // --- Gerenciamento de Passos ---
    window.addStep = () => {
        const container = document.getElementById('steps-container');
        const index = container.children.length + 1;
        const div = document.createElement('div');
        div.className = 'step-item border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50';
        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-gray-500">Passo #${index}</span>
                <button type="button" onclick="this.closest('.step-item').remove()" class="text-red-600 hover:text-red-800 text-sm">Remover</button>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div class="sm:col-span-2">
                    <label class="block text-xs font-medium text-gray-700">Descrição</label>
                    <textarea class="step-desc mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" rows="2"></textarea>
                </div>
                <div>
                    <label class="block text-xs font-medium text-gray-700">Responsável</label>
                    <input type="text" class="step-resp mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2">
                </div>
            </div>
        `;
        container.appendChild(div);
    };

    function fillSteps(steps) {
        const container = document.getElementById('steps-container');
        container.innerHTML = '';
        if (!steps) return;
        steps.sort((a, b) => a.ordem - b.ordem).forEach((step, i) => {
            const div = document.createElement('div');
            div.className = 'step-item border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50';
            div.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-gray-500">Passo #${i + 1}</span>
                    <button type="button" onclick="this.closest('.step-item').remove()" class="text-red-600 hover:text-red-800 text-sm">Remover</button>
                </div>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div class="sm:col-span-2">
                        <label class="block text-xs font-medium text-gray-700">Descrição</label>
                        <textarea class="step-desc mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2" rows="2">${step.descricao}</textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-700">Responsável</label>
                        <input type="text" value="${step.responsavel || ''}" class="step-resp mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2">
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    // --- Salvar ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Coletar dados
        const getListValues = (id) => Array.from(document.querySelectorAll(`#${id} input`)).map(i => i.value).filter(v => v.trim());

        const steps = Array.from(document.querySelectorAll('.step-item')).map((item, index) => ({
            ordem: index + 1,
            descricao: item.querySelector('.step-desc').value,
            responsavel: item.querySelector('.step-resp').value
        }));

        const data = {
            id: isEditing ? popId : "000", // "000" indica novo para o N8N
            titulo: document.getElementById('titulo').value,
            pop_slug: document.getElementById('pop_slug').value,
            categoria: document.getElementById('categoria').value,
            id_autor: parseInt(document.getElementById('id_autor').value),
            publicado: document.getElementById('publicado').value === 'true',

            objetivo: document.getElementById('objetivo').value,
            quando_usar: document.getElementById('quando_usar').value,
            nivel_complexidade: document.getElementById('nivel_complexidade').value,
            camada: document.getElementById('camada').value,
            empresa_contexto: document.getElementById('empresa_contexto').value,

            historia_curta: document.getElementById('historia_curta').value,
            dicas_e_boas_praticas: document.getElementById('dicas_e_boas_praticas').value,
            problemas_comuns: document.getElementById('problemas_comuns').value,
            impacto_no_negocio: document.getElementById('impacto_no_negocio').value,
            inspirado_em: document.getElementById('inspirado_em').value,
            decisoes_excecoes: document.getElementById('decisoes_excecoes').value,

            fluxograma_mermaid: document.getElementById('fluxograma_mermaid').value,

            tags: getListValues('tags-container'),
            materiais_ou_entradas: getListValues('materiais-container'),
            saidas_ou_resultados: getListValues('saidas-container'),
            ferramentas_usadas: getListValues('ferramentas-container'),

            passo_a_passo: steps
        };

        try {
            saveBtn.disabled = true;
            saveBtn.textContent = 'Salvando...';

            await ApiService.savePop(data);

            alert('POP salvo com sucesso!');
            window.location.href = 'index.html';
        } catch (error) {
            alert('Erro ao salvar: ' + error.message);
            saveBtn.disabled = false;
            saveBtn.textContent = 'Salvar POP';
        }
    });

    cancelBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja cancelar? Alterações não salvas serão perdidas.')) {
            window.location.href = 'index.html';
        }
    });

    // --- Editor Mermaid com Preview ---
    function initMermaidEditor() {
        const textarea = document.getElementById('fluxograma_mermaid');
        const preview = document.getElementById('mermaid-preview');
        const status = document.getElementById('mermaid-status');
        let debounceTimer;

        // Observer para remover mensagens de erro do Mermaid do DOM
        const errorObserver = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                // Remove elementos de erro que o Mermaid adiciona ao body
                const errorElements = document.querySelectorAll(
                    '#d3-error-container, .error-icon, [id^="mermaid-error-"], body > div[style*="position: fixed"]'
                );
                errorElements.forEach(el => {
                    if (el && !preview.contains(el)) {
                        el.remove();
                    }
                });
            });
        });

        // Observa mudanças no body
        errorObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        textarea.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => renderMermaid(), 500);
        });

        // Renderiza inicial se houver conteúdo
        if (textarea.value.trim()) {
            renderMermaid();
        }

        async function renderMermaid() {
            const code = textarea.value.trim();

            if (!code) {
                preview.innerHTML = '<span class="text-gray-400 text-sm">O diagrama aparecerá aqui</span>';
                status.textContent = 'Aguardando código...';
                status.className = 'text-xs text-gray-400';
                return;
            }

            try {
                status.textContent = 'Validando...';
                status.className = 'text-xs text-blue-500';

                // PRIMEIRO: Valida a sintaxe sem renderizar
                await window.mermaid.parse(code);

                // Se passou na validação, renderiza
                status.textContent = 'Renderizando...';

                // Limpa preview anterior
                preview.innerHTML = '';

                // Cria ID único para o Mermaid
                const id = 'mermaid-' + Date.now();

                // Renderiza com Mermaid diretamente
                const { svg } = await window.mermaid.render(id, code);
                preview.innerHTML = svg;

                status.textContent = '✓ Renderizado';
                status.className = 'text-xs text-green-600';
            } catch (error) {
                // Se falhou na validação ou renderização, mostra erro limpo
                preview.innerHTML = `
                    <div class="text-red-600 text-xs p-3 bg-red-50 rounded border border-red-200">
                        <strong>Erro de sintaxe</strong><br>
                        <span class="text-xs mt-1 block text-gray-600">Verifique o código Mermaid</span>
                    </div>
                `;
                status.textContent = '✗ Erro';
                status.className = 'text-xs text-red-600';
            }
        }

        // Expõe função para uso global
        window.renderMermaidPreview = renderMermaid;
    }

    // Função para limpar o editor
    window.clearMermaid = () => {
        document.getElementById('fluxograma_mermaid').value = '';
        document.getElementById('mermaid-preview').innerHTML = '<span class="text-gray-400 text-sm">O diagrama aparecerá aqui</span>';
        document.getElementById('mermaid-status').textContent = 'Aguardando código...';
        document.getElementById('mermaid-status').className = 'text-xs text-gray-400';
    };
});
