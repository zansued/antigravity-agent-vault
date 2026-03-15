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
exports.MetatronLedger = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const logger_1 = require("./utils/logger");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
    /**
     * Indexa todas as skills locais no Grafo de Conhecimento do Metatron.
     */
    async indexSkills(skillsDir) {
        logger_1.Logger.info(`🌌 Metatron indexando skills em: ${skillsDir}`);
        if (!fs.existsSync(skillsDir)) {
            logger_1.Logger.warn(`Diretório de skills não encontrado: ${skillsDir}`);
            return;
        }
        const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
        const skills = [];
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const skillFile = path.join(skillsDir, entry.name, 'SKILL.md');
                if (fs.existsSync(skillFile)) {
                    const content = fs.readFileSync(skillFile, 'utf8');
                    // Extração Simples de Metadados (Name, Tags, Category)
                    const nameMatch = content.match(/name:\s*(.*)/);
                    const tagsMatch = content.match(/tags:\s*"(.*)"/);
                    const categoryMatch = content.match(/category:\s*(.*)/);
                    skills.push({
                        name: nameMatch ? `@${nameMatch[1].trim()}` : `@${entry.name}`,
                        type: 'SKILL',
                        metadata: {
                            path: skillFile,
                            tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()) : [],
                            category: categoryMatch ? categoryMatch[1].trim() : 'general'
                        }
                    });
                }
            }
        }
        if (skills.length > 0) {
            logger_1.Logger.info(`✨ ${skills.length} skills identificadas. Imortalizando no Ledger...`);
            await this.saveWeave({ nodes: skills, links: [] });
        }
        else {
            logger_1.Logger.warn('Nenhuma skill encontrada para indexação.');
        }
    }
    async saveWeave(result) {
        logger_1.Logger.divider();
        if (!result.nodes.length && !result.links.length) {
            logger_1.Logger.warn('Nenhum dado para imortalizar no Ledger.');
            return;
        }
        logger_1.Logger.info('Iniciando imortalização em lote (Batch)...');
        const nodeMap = new Map();
        // 1. Inserção em Lote (Batch Upsert) para Nodes
        if (result.nodes.length > 0) {
            logger_1.Logger.dim(`Processando ${result.nodes.length} Nodos Universais...`);
            const { data, error } = await this.supabase
                .from('geminicli_knowledge_nodes')
                .upsert(result.nodes.map(node => ({
                name: node.name,
                type: node.type,
                metadata: node.metadata || {}
            })), { onConflict: 'name' })
                .select('id, name');
            if (error) {
                logger_1.Logger.error('Falha crítica no Batch Upsert de Nodes:', error.message);
            }
            else if (data) {
                data.forEach(row => nodeMap.set(row.name, row.id));
            }
            const missingNodes = result.nodes.filter(n => !nodeMap.has(n.name));
            if (missingNodes.length > 0) {
                const { data: existingData } = await this.supabase
                    .from('geminicli_knowledge_nodes')
                    .select('id, name')
                    .in('name', missingNodes.map(n => n.name));
                if (existingData) {
                    existingData.forEach(row => nodeMap.set(row.name, row.id));
                }
            }
        }
        // 2. Inserção em Lote (Batch Upsert) para Links
        if (result.links.length > 0) {
            logger_1.Logger.dim(`Tecendo ${result.links.length} Linhas de Ley (Conexões)...`);
            const linkPayloads = result.links.map(link => {
                const sourceId = nodeMap.get(link.sourceName);
                const targetId = nodeMap.get(link.targetName);
                if (sourceId && targetId) {
                    return { source_id: sourceId, target_id: targetId, relation_type: link.relationType };
                }
                return null;
            }).filter(Boolean);
            if (linkPayloads.length > 0) {
                const { error: linkError } = await this.supabase
                    .from('geminicli_knowledge_links')
                    .upsert(linkPayloads, { onConflict: 'source_id,target_id,relation_type' });
                if (linkError) {
                    logger_1.Logger.error('Falha ao gravar links em lote:', linkError.message);
                }
            }
            else {
                logger_1.Logger.warn('Nenhum link válido para imortalizar (nodos não resolvidos).');
            }
        }
        logger_1.Logger.success('Conhecimento imortalizado com sucesso nas estrelas (Supabase).');
        logger_1.Logger.divider();
    }
}
exports.MetatronLedger = MetatronLedger;
