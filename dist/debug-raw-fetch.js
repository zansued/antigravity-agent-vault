"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
async function testRawFetch() {
    const url = `${config_1.SUPABASE_CONFIG.url.replace(/\/$/, '')}/rest/v1/geminicli_agent_events?select=count`;
    console.log(`🧪 Testando Resposta Bruta (TechStore Brasil)...`);
    console.log(`🔗 URL de Destino: ${url}`);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'apikey': config_1.SUPABASE_CONFIG.key,
                'Authorization': `Bearer ${config_1.SUPABASE_CONFIG.key}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(`📡 Status HTTP: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log(`📄 Corpo da Resposta: ${text || '(vazio)'}`);
        if (response.status === 401) {
            console.error(`\n❌ ERRO 401 (Não Autorizado): A API Key pode estar incorreta ou o servidor não a reconheceu.`);
        }
        else if (response.status === 404) {
            console.error(`\n❌ ERRO 404 (Não Encontrado): A rota da API rest/v1 não foi encontrada. Verifique se o Supabase está rodando corretamente.`);
        }
        else if (response.ok) {
            console.log(`\n✅ SUCESSO! O servidor respondeu corretamente aos cabeçalhos.`);
        }
    }
    catch (error) {
        console.error(`\n💥 FALHA DE REDE/DNS:`, error.message);
        console.log(`Dica: Verifique se a URL ${config_1.SUPABASE_CONFIG.url} é acessível de onde você está rodando o script.`);
    }
}
testRawFetch();
