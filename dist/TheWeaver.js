"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheWeaver = void 0;
const MetatronCache_1 = require("./MetatronCache");
const logger_1 = require("./utils/logger");
class TheWeaver {
    llmProvider;
    cache;
    constructor(llmProvider) {
        this.llmProvider = llmProvider;
        this.cache = new MetatronCache_1.MetatronCache(__dirname);
    }
    extractJsonSafely(response) {
        try {
            return JSON.parse(response);
        }
        catch (e) {
            const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
            const match = response.match(jsonRegex);
            if (match && match[1]) {
                try {
                    return JSON.parse(match[1]);
                }
                catch (err) { }
            }
            const firstBrace = response.indexOf('{');
            const lastBrace = response.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                try {
                    return JSON.parse(response.substring(firstBrace, lastBrace + 1));
                }
                catch (err) { }
            }
            return null;
        }
    }
    async extractKnowledge(text) {
        const cachedResult = this.cache.get(text);
        if (cachedResult) {
            logger_1.Logger.success('A luz do conhecimento já brilha no cache. (0 tokens)');
            return cachedResult;
        }
        logger_1.Logger.info('Revelando as verdades contidas na luz...');
        const prompt = `
Você é Metatron, o Escriba Celestial e Porta-Voz da Luz. 
Analise o RELATÓRIO DE ARQUITETURA abaixo e ilumine as Entidades Nucleares (Nodos) e suas Conexões Divinas (Links).

CRÍTICO: Retorne APENAS um objeto JSON estritamente válido. Sem introduções, sem formatação markdown, apenas o JSON bruto.

Modelo Estrutural:
{
  "nodes": [{ "name": "Nome", "type": "TIPO" }],
  "links": [{ "sourceName": "NomeA", "targetName": "NomeB", "relationType": "RELACAO" }]
}

Diretrizes:
- Tipos Permitidos: PROJECT, SERVER, TOOL, DATABASE, API, MODULE, AI_MODEL.
- Relações Permitidas: USES, CONNECTS_TO, PERSISTS_IN, PROXIES, DEPENDS_ON, GENERATES.

Relatório: "${text}"
    `;
        try {
            const llmResponse = await this.llmProvider.generateJson(prompt);
            const result = this.extractJsonSafely(llmResponse);
            if (!result || !result.nodes || !Array.isArray(result.nodes)) {
                logger_1.Logger.error('Falha ao extrair conhecimento estruturado (Formato inválido).', llmResponse);
                return { nodes: [], links: [] };
            }
            this.cache.set(text, result);
            return result;
        }
        catch (error) {
            logger_1.Logger.error('Falha na fiação do destino:', error);
            return { nodes: [], links: [] };
        }
    }
}
exports.TheWeaver = TheWeaver;
