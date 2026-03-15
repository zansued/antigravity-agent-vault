import { AgentController } from './AgentController';
import { SupabaseEventStream } from './SupabaseEventStream';
import { SUPABASE_CONFIG } from './config';
import { Action } from './types';

const mockRuntime = {
  execute: async (action: Action) => {
    console.log(`[Runtime] Executando comando: ${action.payload.command}`);
    return { output: 'Comando executado com sucesso no Antigravity Runtime.', error: null };
  },
  writeFile: async (path: string, content: string) => {
    console.log(`[Runtime] Escrevendo arquivo em: ${path}`);
    return { success: true };
  }
};

const mockLLM = {
  generateResponse: async (goal: string, history: any[]) => {
    return `
      Entendido! Vou configurar o ambiente inicial para você.
      
      <boltArtifact id="setup-test" title="Configuração de Teste Antigravity">
        <boltAction type="file" filePath="hello-antigravity.txt">
          Bem-vindo ao futuro da automação agente!
          Este arquivo foi criado via Bolt Artifact System.
        </boltAction>
        <boltAction type="shell">
          echo "Antigravity Core is Online"
        </boltAction>
      </boltArtifact>
      
      Tarefa de configuração concluída.
    `;
  },
  extractAction: async (response: string) => {
    return { type: 'FINISH', payload: {} };
  }
};

async function startDemo() {
  const sessionId = `demo-session-${Date.now()}`;
  console.log(`🚀 Iniciando Demonstração (Sessão: ${sessionId})`);

  const eventStream = new SupabaseEventStream(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.key,
    sessionId
  );

  const controller = new AgentController(eventStream, mockLLM, mockRuntime);

  try {
    await controller.runTask("Configure o ambiente de teste e crie um arquivo de boas-vindas.");
    
    console.log("\n--- Verificação de Memória ---");
    const history = await eventStream.getHistory();
    console.log(`Total de eventos: ${history.length}`);
    console.log("Status Final:", controller.getState());
  } catch (error) {
    console.error("Erro:", error);
  }
}

startDemo();
