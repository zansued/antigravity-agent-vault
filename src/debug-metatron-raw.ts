import { SUPABASE_CONFIG } from './config';

async function diagnoseMetatronFull() {
  const url = `${SUPABASE_CONFIG.url.replace(/\/$/, '')}/rest/v1/geminicli_knowledge_nodes`;
  
  console.log(`🧪 Diagnóstico Completo Metatron (TechStore Brasil)...`);
  console.log(`🔗 URL: ${url}\n`);

  const headers = {
    'apikey': SUPABASE_CONFIG.key,
    'Authorization': `Bearer ${SUPABASE_CONFIG.key}`,
    'Content-Type': 'application/json'
  };

  // 1. Testar GET
  try {
    console.log(`📡 [TESTE 1] Tentando ler a tabela (GET)...`);
    const getRes = await fetch(`${url}?select=count`, { method: 'GET', headers });
    console.log(`   Status GET: ${getRes.status} ${getRes.statusText}`);
    const getText = await getRes.text();
    console.log(`   Resposta GET: ${getText || '(vazio)'}`);
  } catch (e: any) {
    console.log(`   FALHA NO GET: ${e.message}`);
  }

  // 2. Testar POST
  try {
    console.log(`\n📡 [TESTE 2] Tentando escrever na tabela (POST)...`);
    const postRes = await fetch(url, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'return=minimal' },
      body: JSON.stringify({ name: 'DIAG_NODE', type: 'CONCEPT' })
    });
    console.log(`   Status POST: ${postRes.status} ${postRes.statusText}`);
    const postText = await postRes.text();
    console.log(`   Resposta POST: ${postText || '(vazio)'}`);
  } catch (e: any) {
    console.log(`   FALHA NO POST: ${e.message}`);
  }
}

diagnoseMetatronFull();
