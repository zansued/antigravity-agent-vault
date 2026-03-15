"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AgentController_1 = require("./AgentController");
const SupabaseEventStream_1 = require("./SupabaseEventStream");
const config_1 = require("./config");
const mockRuntime = {
    execute: async (action) => {
        console.log(`[Runtime] Executando comando: ${action.payload.command}`);
        return { output: 'Comando executado com sucesso no Antigravity Runtime.', error: null };
    },
    writeFile: async (path, content) => {
        console.log(`[Runtime] Escrevendo arquivo em: ${path}`);
        return { success: true };
    }
};
const mockLLM = {
    generateResponse: async (goal, history) => {
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
    extractAction: async (response) => {
        return { type: 'FINISH', payload: {} };
    }
};
async function startDemo() {
    const sessionId = `demo-session-${Date.now()}`;
    console.log(`🚀 Iniciando Demonstração (Sessão: ${sessionId})`);
    const eventStream = new SupabaseEventStream_1.SupabaseEventStream(config_1.SUPABASE_CONFIG.url, config_1.SUPABASE_CONFIG.key, sessionId);
    const controller = new AgentController_1.AgentController(eventStream, mockLLM, mockRuntime);
    try {
        await controller.runTask("Configure o ambiente de teste e crie um arquivo de boas-vindas.");
        console.log("\n--- Verificação de Memória ---");
        const history = await eventStream.getHistory();
        console.log(`Total de eventos: ${history.length}`);
        console.log("Status Final:", controller.getState());
    }
    catch (error) {
        console.error("Erro:", error);
    }
}
startDemo();
