import { WeaveResult } from './types/metatron';

/**
 * TheWeaver: O Tecelão de Metatron.
 * Responsável por extrair Entidades e Relações de textos brutos usando o LLM.
 */
export class TheWeaver {
  constructor(private llmProvider: any) {}

  /**
   * Transforma texto em um grafo de conhecimento inicial.
   */
  public async extractKnowledge(text: string): Promise<WeaveResult> {
    console.log('[Metatron] Iniciando fiação do conhecimento...');
    
    const prompt = `
      Você é Metatron, o Escriba Celestial. 
      Analise o texto abaixo e extraia Entidades (Nodos) e Relações (Links).
      
      Retorne APENAS um JSON válido no seguinte formato:
      {
        "nodes": [{ "name": "Nome", "type": "TIPO" }],
        "links": [{ "sourceName": "NomeA", "targetName": "NomeB", "relationType": "RELACAO" }]
      }
      
      Regras:
      - TIPO pode ser: PROJECT, PERSON, CONCEPT, SERVER, TOOL.
      - RELACAO deve ser curta (ex: USES, DEPENDS_ON, BUILT_WITH).
      
      Texto: "${text}"
    `;
    
    try {
      // O llmProvider deve retornar a string JSON pura
      const jsonResponse = await this.llmProvider.generateJson(prompt);
      return JSON.parse(jsonResponse) as WeaveResult;
    } catch (error) {
      console.error('[Metatron] Falha na fiação:', error);
      return { nodes: [], links: [] };
    }
  }
}
