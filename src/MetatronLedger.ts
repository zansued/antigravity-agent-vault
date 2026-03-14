import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { WeaveResult } from './types/metatron';

/**
 * MetatronLedger: O Livro de Metatron.
 * Persiste o conhecimento extraído no Supabase TechStore Brasil.
 */
export class MetatronLedger {
  private supabase: SupabaseClient;

  constructor(url: string, key: string) {
    this.supabase = createClient(url, key, {
      db: { schema: 'public' }
    });
  }

  /**
   * Grava nodos e links no banco de dados celestial.
   */
  public async saveWeave(result: WeaveResult): Promise<void> {
    console.log('[Metatron] Gravando nodos no Livro Celestial...');
    const nodeMap = new Map<string, string>(); // name -> uuid

    // 1. Upsert de Nodos (Garante que o nome é único e retorna o ID)
    for (const node of result.nodes) {
      const { data, error } = await this.supabase
        .from('geminicli_knowledge_nodes')
        .upsert({ name: node.name, type: node.type, metadata: node.metadata }, { onConflict: 'name' })
        .select('id')
        .single();
      
      if (!error && data) {
        nodeMap.set(node.name, data.id);
      } else if (error) {
        console.error(`[Metatron] Erro ao gravar nodo ${node.name}:`, error.message);
      }
    }

    console.log('[Metatron] Tecendo as Linhas de Ley (Conexões)...');
    // 2. Insert de Links (Linhas de Ley)
    for (const link of result.links) {
      const sourceId = nodeMap.get(link.sourceName);
      const targetId = nodeMap.get(link.targetName);
      
      if (sourceId && targetId) {
        const { error } = await this.supabase
          .from('geminicli_agent_events') // Opcional: Registrar no histórico também
          .insert([{ 
            session_id: 'metatron-sync', 
            type: 'ACTION', 
            event_type: 'KNOWLEDGE_LINK', 
            payload: link 
          }]);

        await this.supabase
          .from('geminicli_knowledge_links')
          .upsert({ 
            source_id: sourceId, 
            target_id: targetId, 
            relation_type: link.relationType 
          }, { onConflict: 'source_id,target_id,relation_type' });
      }
    }
    console.log('[Metatron] Conhecimento imortalizado com sucesso.');
  }
}
