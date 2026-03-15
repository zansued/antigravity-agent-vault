import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { WeaveResult, MetatronNode } from './types/metatron';
import { Logger } from './utils/logger';
import * as fs from 'fs';
import * as path from 'path';

export class MetatronLedger {
  private supabase: SupabaseClient;

  constructor(url: string, key: string) {
    this.supabase = createClient(url, key, {
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
  public async indexSkills(skillsDir: string): Promise<void> {
    Logger.info(`🌌 Metatron indexando skills em: ${skillsDir}`);
    
    if (!fs.existsSync(skillsDir)) {
      Logger.warn(`Diretório de skills não encontrado: ${skillsDir}`);
      return;
    }

    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
    const skills: MetatronNode[] = [];

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
      Logger.info(`✨ ${skills.length} skills identificadas. Imortalizando no Ledger...`);
      await this.saveWeave({ nodes: skills, links: [] });
    } else {
      Logger.warn('Nenhuma skill encontrada para indexação.');
    }
  }

  public async saveWeave(result: WeaveResult): Promise<void> {
    Logger.divider();
    if (!result.nodes.length && !result.links.length) {
      Logger.warn('Nenhum dado para imortalizar no Ledger.');
      return;
    }

    Logger.info('Iniciando imortalização em lote (Batch)...');
    const nodeMap = new Map<string, string>();

    // 1. Inserção em Lote (Batch Upsert) para Nodes
    if (result.nodes.length > 0) {
       Logger.dim(`Processando ${result.nodes.length} Nodos Universais...`);
       const { data, error } = await this.supabase
        .from('geminicli_knowledge_nodes')
        .upsert(
          result.nodes.map(node => ({
            name: node.name,
            type: node.type,
            metadata: node.metadata || {}
          })), 
          { onConflict: 'name' }
        )
        .select('id, name');

       if (error) {
         Logger.error('Falha crítica no Batch Upsert de Nodes:', error.message);
       } else if (data) {
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
      Logger.dim(`Tecendo ${result.links.length} Linhas de Ley (Conexões)...`);
      
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
           Logger.error('Falha ao gravar links em lote:', linkError.message);
        }
      } else {
        Logger.warn('Nenhum link válido para imortalizar (nodos não resolvidos).');
      }
    }

    Logger.success('Conhecimento imortalizado com sucesso nas estrelas (Supabase).');
    Logger.divider();
  }
}
