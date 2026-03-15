"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetatronLedger = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
class MetatronLedger {
    supabase;
    constructor(url, key) {
        this.supabase = (0, supabase_js_1.createClient)(url, key, {
            db: { schema: 'public' },
            global: {
                headers: {
                    'Content-Profile': 'public',
                    'Accept-Profile': 'public'
                }
            }
        });
    }
    async saveWeave(result) {
        console.log('[Metatron] Gravando nodos no Livro Celestial...');
        const nodeMap = new Map();
        for (const node of result.nodes) {
            // 1. Tenta o Upsert
            const { data, error } = await this.supabase
                .from('geminicli_knowledge_nodes')
                .upsert({ name: node.name, type: node.type, metadata: node.metadata }, { onConflict: 'name' })
                .select('id');
            if (!error && data && data.length > 0) {
                nodeMap.set(node.name, data[0].id);
            }
            else {
                // 2. Fallback: Se o Kong bloqueou o retorno, busca o ID manualmente
                const { data: existing } = await this.supabase
                    .from('geminicli_knowledge_nodes')
                    .select('id')
                    .eq('name', node.name)
                    .maybeSingle();
                if (existing) {
                    nodeMap.set(node.name, existing.id);
                }
                else {
                    console.error(`[Metatron] Falha crítica ao assegurar nodo: ${node.name}`, error?.message);
                }
            }
        }
        console.log('[Metatron] Tecendo as Linhas de Ley (Conexões)...');
        for (const link of result.links) {
            const sourceId = nodeMap.get(link.sourceName);
            const targetId = nodeMap.get(link.targetName);
            if (sourceId && targetId) {
                await this.supabase
                    .from('geminicli_knowledge_links')
                    .upsert({
                    source_id: sourceId,
                    target_id: targetId,
                    relation_type: link.relationType
                }, { onConflict: 'source_id,target_id,relation_type' });
            }
            else {
                console.warn(`[Metatron] Pulando link: Nodos não encontrados (${link.sourceName} -> ${link.targetName})`);
            }
        }
        console.log('[Metatron] Conhecimento imortalizado com sucesso.');
    }
}
exports.MetatronLedger = MetatronLedger;
