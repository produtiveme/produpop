// Configuração da API
const API_CONFIG = {
    urls: {
        // Leitura (Públicos)
        pops: 'https://work.produ-cloud.com/webhook/produpop_carrega_todos_pops',
        authors: 'https://work.produ-cloud.com/webhook/produpop_carrega_todos_autores',

        // Autenticação e Escrita
        login: 'https://work.produ-cloud.com/webhook/produpop_envia_login',
        savePop: 'https://work.produ-cloud.com/webhook/produpop_salva_pop'
    }
};

// Serviço de API
const ApiService = {
    // --- Autenticação ---
    async login(username, password) {
        try {
            const response = await fetch(API_CONFIG.urls.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) throw new Error('Falha no login');

            // O N8N retorna o token diretamente ou em um objeto? 
            // Assumindo que o webhook retorna { "id_token": "..." } ou similar, ou apenas o token.
            // Baseado no JSON do usuário, o nó JWT retorna o token. Vamos assumir que o webhook responde com o JSON do nó JWT.
            const data = await response.json();

            // Ajuste conforme o retorno real do N8N. Geralmente é data.id_token ou apenas data se for string.
            // O nó "Respond to Webhook" no JSON do usuário não tem corpo definido explicitamente para sucesso, 
            // mas o nó JWT gera o token. Vamos assumir que o token vem numa propriedade 'token' ou é o próprio corpo.
            // Por segurança, vamos salvar o objeto todo ou procurar por token.
            const token = data.token || data.id_token || data;

            if (!token) throw new Error('Token não recebido');

            localStorage.setItem('rare_candy_token', typeof token === 'string' ? token : JSON.stringify(token));
            return true;
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('rare_candy_token');
        window.location.href = 'login.html';
    },

    getToken() {
        return localStorage.getItem('rare_candy_token');
    },

    checkAuth() {
        const token = this.getToken();
        if (!token) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // --- Dados ---
    async getAllPops() {
        // ... (código de leitura permanece igual pois é público, ou precisa de auth?)
        // O usuário não disse que a leitura precisa de auth, mas o admin sim.
        // Vamos manter público por enquanto, já que o site principal usa o mesmo webhook.
        try {
            const [popsRes, authorsRes] = await Promise.all([
                fetch(API_CONFIG.urls.pops),
                fetch(API_CONFIG.urls.authors)
            ]);

            if (!popsRes.ok) throw new Error('Erro ao buscar POPs');
            if (!authorsRes.ok) throw new Error('Erro ao buscar Autores');

            const pops = await popsRes.json();
            const authors = await authorsRes.json();

            const authorMap = {};
            authors.forEach(a => authorMap[a.id] = a);

            return pops.map(pop => {
                const safeParse = (str) => {
                    try { return JSON.parse(str || '[]'); } catch { return []; }
                };

                return {
                    ...pop,
                    tags: safeParse(pop.tags),
                    materiais_ou_entradas: safeParse(pop.materiais_ou_entradas),
                    passo_a_passo: safeParse(pop.passo_a_passo),
                    saidas_ou_resultados: safeParse(pop.saidas_ou_resultados),
                    ferramentas_usadas: safeParse(pop.ferramentas_usadas),
                    autor_nome: authorMap[pop.id_autor]?.nome || 'Desconhecido',
                    autor_foto: authorMap[pop.id_autor]?.foto || null
                };
            });

        } catch (error) {
            console.error('ApiService Error:', error);
            throw error;
        }
    },

    async savePop(popData) {
        const token = this.getToken();
        if (!token) throw new Error('Não autenticado');

        // Converter arrays de volta para strings JSON
        const payload = {
            ...popData,
            token: token, // Token no corpo conforme solicitado
            tags: JSON.stringify(popData.tags),
            materiais_ou_entradas: JSON.stringify(popData.materiais_ou_entradas),
            passo_a_passo: JSON.stringify(popData.passo_a_passo),
            saidas_ou_resultados: JSON.stringify(popData.saidas_ou_resultados),
            ferramentas_usadas: JSON.stringify(popData.ferramentas_usadas),
            // Garantir que campos opcionais vão como string vazia se null/undefined
            updatedAt: new Date().toISOString() // Opcional, para log
        };

        try {
            const response = await fetch(API_CONFIG.urls.savePop, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.status === 401) {
                this.logout();
                throw new Error('Sessão expirada');
            }

            if (!response.ok) {
                throw new Error(`Erro ao salvar: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Save Error:', error);
            throw error;
        }
    }
};

window.ApiService = ApiService;
