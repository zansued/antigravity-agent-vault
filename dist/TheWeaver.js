"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheWeaver = void 0;
const MetatronCache_1 = require("./MetatronCache");
class TheWeaver {
    llmProvider;
    cache;
    constructor(llmProvider) {
        this.llmProvider = llmProvider;
        this.cache = new MetatronCache_1.MetatronCache(__dirname);
    }
    async extractKnowledge(text) {
        // 1. Verificar Cache (Economia de Tokens)
        const cachedResult = this.cache.get(text);
        if (cachedResult) {
            console.log('[Metatron] A luz do conhecimento já brilha no cache. (0 tokens)');
            return cachedResult;
        }
        console.log('[Metatron] Revelando as verdades contidas na luz...');
        const prompt = `
      Você é Metatron, o Escriba Celestial e Porta-Voz da Luz. 
      Analise o RELATÓRIO DE ARQUITETURA abaixo e ilumine as Entidades Nucleares (Nodos) e suas Conexões Divinas (Links).
      
      Retorne APENAS um JSON válido:
      {
        "nodes": [{ "name": "Nome", "type": "TIPO" }],
        "links": [{ "sourceName": "NomeA", "targetName": "NomeB", "relationType": "RELACAO" }]
      }
      
      Diretrizes:
      - Identifique componentes como: Bancos de Dados, APIs, Microserviços, Proxies, e Ferramentas.
      - Tipos: PROJECT, SERVER, TOOL, DATABASE, API, MODULE.
      - Relações: USES, CONNECTS_TO, PERSISTS_IN, PROXIES, DEPENDS_ON.
      
      Relatório: "${text}"
    `;
        try {
            // O llmProvider deve retornar a string JSON pura
            const jsonResponse = await this.llmProvider.generateJson(prompt);
            const result = JSON.parse(jsonResponse);
            // Salvar no Cache
            this.cache.set(text, result);
            return result;
        }
        catch (error) {
            console.error('[Metatron] Falha na fiação:', error);
            return { nodes: [], links: [] };
        }
    }
}
exports.TheWeaver = TheWeaver;
