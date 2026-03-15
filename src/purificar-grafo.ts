import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from './config';

async function purificarGrafo() {
  const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
  
  console.log('🧹 Iniciando Purificação das Runas...');

  // 1. Remover Nodos de Teste e Diagnóstico
  const testNodes = ['TEST_NODE', 'RAW_TEST_NODE', 'DIAG_NODE'];
  
  const { error: deleteError } = await supabase
    .from('geminicli_knowledge_nodes')
    .delete()
    .in('name', testNodes);

  if (deleteError) {
    console.error('💥 Erro ao purificar nodos de teste:', deleteError.message);
  } else {
    console.log(`✅ Nodos de teste removidos: ${testNodes.join(', ')}`);
  }

  // 2. Auditoria de Nodos Órfãos (Sem links)
  const { data: nodes } = await supabase.from('geminicli_knowledge_nodes').select('id, name');
  const { data: links } = await supabase.from('geminicli_knowledge_links').select('source_id, target_id');

  if (nodes && links) {
    const linkedNodeIds = new Set([
      ...links.map(l => l.source_id),
      ...links.map(l => l.target_id)
    ]);

    const orphans = nodes.filter(n => !linkedNodeIds.has(n.id));
    console.log(`📊 Total de Nodos: ${nodes.length}`);
    console.log(`🔗 Nodos Conectados: ${linkedNodeIds.size}`);
    console.log(`🕳️ Nodos Órfãos Detectados: ${orphans.length}`);

    if (orphans.length > 0) {
      console.log('💡 Dica: Considere conectar ou remover os nodos órfãos para manter a geometria sagrada.');
    }
  }

  console.log('\n✨ Purificação concluída. A Batcaverna está organizada.');
}

purificarGrafo();
