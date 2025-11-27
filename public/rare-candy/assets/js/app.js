document.addEventListener('DOMContentLoaded', async () => {
    if (!ApiService.checkAuth()) return;

    const popListContainer = document.getElementById('pop-list');
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    const errorState = document.getElementById('error-state');
    const searchInput = document.getElementById('search-input');

    let allPops = [];

    // Inicialização
    try {
        allPops = await ApiService.getAllPops();
        renderPops(allPops);
    } catch (error) {
        showError();
    }

    // Filtro de Busca
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allPops.filter(pop =>
            pop.titulo.toLowerCase().includes(term) ||
            pop.categoria.toLowerCase().includes(term)
        );
        renderPops(filtered);
    });

    // Funções de Renderização
    function renderPops(pops) {
        loadingState.classList.add('hidden');
        errorState.classList.add('hidden');
        popListContainer.innerHTML = '';

        if (pops.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }
        emptyState.classList.add('hidden');

        pops.forEach(pop => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow';

            const statusColor = pop.publicado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
            const statusText = pop.publicado ? 'Publicado' : 'Rascunho';

            card.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}">
                        ${statusText}
                    </span>
                    <div class="flex space-x-2">
                        <a href="editor.html?id=${pop.id}" class="text-gray-400 hover:text-blue-600 transition-colors" title="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </a>
                    </div>
                </div>
                
                <h3 class="text-lg font-bold text-gray-900 mb-1 truncate">${pop.titulo}</h3>
                <p class="text-sm text-gray-500 mb-4">${pop.categoria} • ${pop.autor_nome}</p>
                
                <div class="flex flex-wrap gap-2 mt-auto">
                    ${pop.tags.slice(0, 3).map(tag => `
                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            ${tag}
                        </span>
                    `).join('')}
                    ${pop.tags.length > 3 ? `<span class="text-xs text-gray-400 self-center">+${pop.tags.length - 3}</span>` : ''}
                </div>
            `;
            popListContainer.appendChild(card);
        });
    }

    function showError() {
        loadingState.classList.add('hidden');
        popListContainer.innerHTML = '';
        errorState.classList.remove('hidden');
    }
});
