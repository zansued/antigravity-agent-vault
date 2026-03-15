"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("./config");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Re-sync Completo: Indexa TODAS as skills e absorções no Metatron.
 * Inclui skills em subdiretorios (SKILL.md) E skills planas (.md) E absorções.
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
const ROOT = path.resolve(__dirname, '..');
async function upsertNodes(nodes) {
    if (!nodes.length)
        return;
    const { error } = await supabase
        .from('geminicli_knowledge_nodes')
        .upsert(nodes, { onConflict: 'name' });
    if (error)
        console.error('  ❌ Erro no upsert:', error.message);
    else
        console.log(`  ✅ ${nodes.length} nodos sincronizados.`);
}
async function syncSkills() {
    const skillsDir = path.join(ROOT, 'skills');
    const nodes = [];
    if (!fs.existsSync(skillsDir)) {
        console.warn('Skills dir not found');
        return;
    }
    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
    for (const entry of entries) {
        // 1. Skills em subdiretorios com SKILL.md
        if (entry.isDirectory()) {
            const skillFile = path.join(skillsDir, entry.name, 'SKILL.md');
            if (fs.existsSync(skillFile)) {
                const content = fs.readFileSync(skillFile, 'utf8');
                const nameMatch = content.match(/^name:\s*(.+)/m);
                const skillName = nameMatch ? nameMatch[1].trim() : entry.name;
                nodes.push({ name: `@skill/${skillName}`, type: 'SKILL', metadata: { path: skillFile, source: 'dir-skill' } });
            }
        }
        // 2. Skills planas (.md) — não processar EXTENDED_CATALOG
        else if (entry.name.endsWith('.md') && entry.name !== 'EXTENDED_CATALOG.md') {
            const skillName = entry.name.replace('.md', '');
            nodes.push({ name: `@skill/${skillName}`, type: 'SKILL', metadata: { path: path.join(skillsDir, entry.name), source: 'flat-skill' } });
        }
    }
    console.log(`\n🌌 Skills encontradas: ${nodes.length}`);
    await upsertNodes(nodes);
}
async function syncAbsorptions() {
    const absDir = path.join(ROOT, 'reports', 'absorptions');
    const nodes = [];
    if (!fs.existsSync(absDir)) {
        console.warn('Absorptions dir not found');
        return;
    }
    const files = fs.readdirSync(absDir).filter(f => f.endsWith('_absorption.md'));
    for (const file of files) {
        const repoName = file.replace('_absorption.md', '').replace(/_/g, '-');
        const filePath = path.join(absDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        // Extrai tipo do repositório pelo conteúdo
        let type = 'PROJECT';
        if (content.toLowerCase().includes('framework'))
            type = 'FRAMEWORK';
        else if (content.toLowerCase().includes('server') || content.toLowerCase().includes('broker'))
            type = 'SERVER';
        else if (content.toLowerCase().includes('agent'))
            type = 'ORCHESTRATOR';
        else if (content.toLowerCase().includes('model') || content.toLowerCase().includes('speech'))
            type = 'MODULE';
        nodes.push({ name: repoName, type, metadata: { absorbed_from: file, source: 'absorption-report' } });
    }
    console.log(`\n📚 Absorções encontradas: ${nodes.length}`);
    await upsertNodes(nodes);
}
async function main() {
    console.log('🌌 Metatron Re-Sync Global Iniciado...\n');
    await syncSkills();
    await syncAbsorptions();
    console.log('\n✨ Re-Sync Completo! Verifique o Portal para os novos nodos.');
}
main().catch(console.error);
