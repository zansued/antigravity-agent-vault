import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from './config';

async function diagnoseMetatron() {
  const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
  const nodesTable = 'geminicli_knowledge_nodes';
  
  console.log(`🔍 Diagnosticando Tabelas de Metatron...`);

  // 1. Teste de Leitura
  const { data, error } = await supabase.from(nodesTable).select('count', { count: 'exact', head: true });

  if (error) {
    console.error(`❌ Erro ao acessar ${nodesTable}:`, error.message);
    if (error.code === '42P01') {
      console.log('💡 A tabela não existe no esquema public. Verifique se o SQL foi executado com sucesso.');
    }
  } else {
    console.log(`✅ Tabela ${nodesTable} encontrada!`);
  }

  // 2. Teste de Escrita Simples
  console.log(`🧪 Testando inserção de teste...`);
  const { error: insertError } = await supabase.from(nodesTable).insert([{ name: 'TEST_NODE', type: 'CONCEPT' }]);
  
  if (insertError) {
    console.error(`❌ Erro de Escrita:`, insertError.message || insertError);
    console.log('💡 Dica: Rode "NOTIFY pgrst, \'reload schema\';" no SQL Editor e verifique os GRANTS.');
  } else {
    console.log(`✅ Inserção de teste funcionou!`);
    // Limpeza
    await supabase.from(nodesTable).delete().eq('name', 'TEST_NODE');
  }
}

diagnoseMetatron();
