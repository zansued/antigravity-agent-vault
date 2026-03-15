"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("./config");
async function forceCreateTable() {
    const supabase = (0, supabase_js_1.createClient)(config_1.SUPABASE_CONFIG.url, config_1.SUPABASE_CONFIG.key);
    const sql = `
  CREATE TABLE IF NOT EXISTS geminicli_agent_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      session_id TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('ACTION', 'OBSERVATION')),
      event_type TEXT NOT NULL,
      payload JSONB,
      action_id UUID REFERENCES geminicli_agent_events(id),
      content TEXT,
      error_msg TEXT,
      created_at TIMESTAMPTZ DEFAULT now()
  );
  CREATE INDEX IF NOT EXISTS idx_geminicli_session ON geminicli_agent_events(session_id);
  `;
    console.log(`🔨 Tentando criar tabela remotamente (via postgrest)...`);
    // Nota: Postgrest não permite DDL direto. O usuário deve usar o SQL Editor.
    // Vou apenas verificar se o erro persiste com uma query simples.
    const { error } = await supabase.from('geminicli_agent_events').select('*').limit(1);
    if (error) {
        console.error(`❌ ERRO CONFIRMADO: [${error.code}] ${error.message}`);
        console.log(`\n🚨 O banco reporta que a tabela não existe.`);
        console.log(`Por favor, acesse https://supa.techstorebrasil.com/ e execute o SQL abaixo no editor:`);
        console.log(`--------------------------------------------------`);
        console.log(sql);
        console.log(`--------------------------------------------------`);
    }
    else {
        console.log(`✅ A tabela agora parece estar acessível.`);
    }
}
forceCreateTable();
