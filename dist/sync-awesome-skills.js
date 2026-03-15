"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("./config");
/**
 * Sync especializado para o repositório antigravity-awesome-skills.
 * Cria a estrutura de meta-nodos (categorias) ligadas ao repositório principal.
 */
const supabase = (0, supabase_js_1.createClient)(config_1.SUPABASE_CONFIG.url, config_1.SUPABASE_CONFIG.key, {
    db: { schema: 'public' },
    global: {
        headers: {
            'Content-Profile': 'public',
            'Accept-Profile': 'public'
        }
    }
});
async function syncAwesomeSkills() {
    const repoName = "antigravity-awesome-skills";
    console.log(`🌌 Metatron: Sincronizando Arsenal do Repositório: ${repoName}...`);
    // 1. Nodo Principal do Repositório
    const mainNode = {
        name: repoName,
        type: 'PROJECT',
        metadata: {
            url: "https://github.com/sickn33/antigravity-awesome-skills",
            stats: { skills_count: 1259 }
        }
    };
    // 2. Meta-Nodos de Categorias (Silos de Conhecimento)
    const categories = [
        { name: "@awesome/architecture", type: "DOMAIN", metadata: { count: 82 } },
        { name: "@awesome/business", type: "DOMAIN", metadata: { count: 56 } },
        { name: "@awesome/data-ai", type: "DOMAIN", metadata: { count: 231 } },
        { name: "@awesome/development", type: "DOMAIN", metadata: { count: 179 } },
        { name: "@awesome/general", type: "DOMAIN", metadata: { count: 300 } },
        { name: "@awesome/infrastructure", type: "DOMAIN", metadata: { count: 135 } },
        { name: "@awesome/security", type: "DOMAIN", metadata: { count: 146 } },
        { name: "@awesome/testing", type: "DOMAIN", metadata: { count: 35 } },
        { name: "@awesome/workflow", type: "DOMAIN", metadata: { count: 95 } }
    ];
    const alphaSkills = [
        { name: "@architect-review", type: "SKILL", metadata: { highlight: true } },
        { name: "@rag-engineer", type: "SKILL", metadata: { highlight: true } },
        { name: "@007", type: "SKILL", metadata: { highlight: true } },
        { name: "@brainstorming", type: "SKILL", metadata: { highlight: true } }
    ];
    const nodes = [mainNode, ...categories, ...alphaSkills].map(n => ({
        name: n.name,
        type: n.type,
        metadata: n.metadata || {}
    }));
    console.log(`✨ Gravando ${nodes.length} Nodos Alpha e Meta...`);
    const { data: nodeData, error: nodeError } = await supabase
        .from('geminicli_knowledge_nodes')
        .upsert(nodes, { onConflict: 'name' })
        .select('id, name');
    if (nodeError) {
        console.error('  ❌ Erro ao gravar nodos:', nodeError.message);
        return;
    }
    const nodeMap = new Map();
    nodeData?.forEach(n => nodeMap.set(n.name, n.id));
    // 3. Linhas de Ley (Conexões)
    const mainRepoId = nodeMap.get(repoName);
    if (!mainRepoId)
        return;
    const links = [
        ...categories.map(cat => ({
            source_id: mainRepoId,
            target_id: nodeMap.get(cat.name),
            relation_type: 'CONTAINS'
        })),
        ...alphaSkills.map(skill => ({
            source_id: nodeMap.get("@awesome/general"), // Simplificação: alpha skills ligadas ao general ou específico
            target_id: nodeMap.get(skill.name),
            relation_type: 'IMPLEMENTS'
        }))
    ].filter(l => l.source_id && l.target_id);
    console.log(`✨ Tecendo ${links.length} Linhas de Ley...`);
    const { error: linkError } = await supabase
        .from('geminicli_knowledge_links')
        .upsert(links, { onConflict: 'source_id,target_id,relation_type' });
    if (linkError) {
        console.error('  ❌ Erro ao tecer links:', linkError.message);
    }
    else {
        console.log(`\n✅ O Arsenal de ${repoName} foi imortalizado nas estrelas.`);
    }
}
syncAwesomeSkills().catch(console.error);
