import { SUPABASE_CONFIG } from './config';

async function testRawInsert() {
  const url = `${SUPABASE_CONFIG.url.replace(/\/$/, '')}/rest/v1/geminicli_agent_events`;
  const sessionId = `test-raw-${Date.now()}`;
  
  console.log(`🧪 Testando INSERÇÃO BRUTA (TechStore Brasil)...`);
  console.log(`🔗 URL: ${url}`);

  const payload = {
    session_id: sessionId,
    type: 'ACTION',
    event_type: 'CMD_RUN',
    payload: { command: 'echo "Raw test"' }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_CONFIG.key,
        'Authorization': `Bearer ${SUPABASE_CONFIG.key}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation' // Pede para retornar o objeto criado
      },
      body: JSON.stringify(payload)
    });

    console.log(`📡 Status HTTP: ${response.status} ${response.statusText}`);
    
    const text = await response.text();
    console.log(`📄 Resposta: ${text || '(vazio)'}`);

    if (response.ok) {
      console.log(`\n✅ SUCESSO! A inserção funcionou via POST.`);
    } else {
      console.error(`\n❌ FALHA: O servidor rejeitou o POST.`);
      try {
        const errorData = JSON.parse(text);
        console.log('Detalhes do erro do Postgres:', errorData);
      } catch (e) {
        console.log('Não foi possível parsear o corpo do erro como JSON.');
      }
    }

  } catch (error: any) {
    console.error(`\n💥 ERRO DE REDE:`, error.message);
  }
}

testRawInsert();
