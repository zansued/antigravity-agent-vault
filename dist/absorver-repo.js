"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TheWeaver_1 = require("./TheWeaver");
const MetatronLedger_1 = require("./MetatronLedger");
const config_1 = require("./config");
/**
 * Script de Absorção Automática de Repositórios.
 * Uso: npx ts-node src/absorver-repo.ts "URL_DO_REPO" "RELATORIO_DE_ARQUITETURA"
 */
const mockLLM = {
    generateJson: async (prompt) => {
        console.log('[Metatron] Meditando sobre a arquitetura revelada...');
        // Simulação de inteligência: identifica palavras-chave para criar nodos
        const nodes = [];
        const links = [];
        const text = prompt.toLowerCase();
        const keywords = [
            { name: 'AgentController', type: 'MODULE' },
            { name: 'BoltParser', type: 'TOOL' },
            { name: 'Metatron-Book', type: 'TOOL' },
            { name: 'Supabase', type: 'SERVER' },
            { name: 'PostgreSQL', type: 'DATABASE' },
            { name: 'Antigravity Core', type: 'PROJECT' },
            { name: 'LangGraph', type: 'ORCHESTRATOR' },
            { name: 'AutoGen', type: 'ORCHESTRATOR' },
            { name: 'StateGraph', type: 'CONCEPT' },
            { name: 'Handoff', type: 'CONCEPT' },
            { name: 'Checkpointer', type: 'MODULE' },
            { name: 'TTS', type: 'DOMAIN' },
            { name: 'Vocoder', type: 'MODULE' },
            { name: 'Synthesizer', type: 'ORCHESTRATOR' },
            { name: 'PyTorch', type: 'FRAMEWORK' },
            { name: 'API', type: 'INTERFACE' },
            { name: 'CLI', type: 'INTERFACE' },
            { name: 'Model Manager', type: 'MODULE' }
        ];
        keywords.forEach(k => {
            if (text.includes(k.name.toLowerCase())) {
                nodes.push(k);
            }
        });
        // Cria links básicos se houver nodos
        if (nodes.length > 1) {
            links.push({ sourceName: nodes[0].name, targetName: nodes[1].name, relationType: 'INTEGRATES' });
        }
        return JSON.stringify({ nodes, links });
    }
};
async function absorverRepositorio() {
    const repoName = process.argv[2] || "Desconhecido";
    const relatorio = process.argv[3] || "Sem relatório disponível.";
    console.log(`🌌 Iniciando Revelação de Arquitetura para: ${repoName}...`);
    const weaver = new TheWeaver_1.TheWeaver(mockLLM);
    const ledger = new MetatronLedger_1.MetatronLedger(config_1.SUPABASE_CONFIG.url, config_1.SUPABASE_CONFIG.key);
    try {
        const weaveResult = await weaver.extractKnowledge(`Repositório: ${repoName}. ${relatorio}`);
        console.log(`✨ Arquitetura Tecida: ${weaveResult.nodes.length} nodos identificados.`);
        await ledger.saveWeave(weaveResult);
        console.log(`\n✅ O destino de ${repoName} foi gravado no Metatron-Book.`);
    }
    catch (error) {
        console.error('💥 Erro na absorção:', error);
    }
}
absorverRepositorio();
