import { MetatronLedger } from './MetatronLedger';
import { AgentController } from './AgentController';
import { SupabaseEventStream } from './SupabaseEventStream';
import { SUPABASE_CONFIG } from './config';
import * as path from 'path';

async function verifyUpgrade() {
  console.log('🧪 Iniciando Verificação de Upgrade do Metatron...');

  const ledger = new MetatronLedger(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
  const eventStream = new SupabaseEventStream(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key, 'verify-session');

  // 1. Verificação de Indexação
  const skillsDir = path.resolve(__dirname, '../skills');
  await ledger.indexSkills(skillsDir);

  // 2. Verificação de orquestração básica
  const mockLLM = {
    generateResponse: async () => "<boltArtifact id='test' title='Test'><boltAction type='shell'>echo 'Verified'</boltAction></boltArtifact>",
    extractAction: async () => ({ type: 'FINISH', payload: {} })
  };
  const mockRuntime = {
    execute: async () => ({ output: 'Success', error: null }),
    writeFile: async () => ({ success: true })
  };

  const controller = new AgentController(eventStream, mockLLM, mockRuntime);
  await controller.runTask("Upgrade the system to support autonomous vision and watchdog capabilities.");
}

verifyUpgrade().catch(console.error);
