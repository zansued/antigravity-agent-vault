import { Action, Observation, AgentState, EventStream, Artifact } from './types';
import { BoltParser } from './BoltParser';
import { MetatronWatchdog } from './MetatronWatchdog';
import { Logger } from './utils/logger';

export class AgentController {
  private state: AgentState = 'IDLE';
  private maxRetries: number = 3;
  private retryCount = new Map<string, number>();
  private watchdog: MetatronWatchdog;

  constructor(
    private eventStream: EventStream,
    private llmProvider: any,
    private runtimeEnvironment: any
  ) {
    this.watchdog = new MetatronWatchdog(this.eventStream);
  }

  public async runTask(goal: string): Promise<void> {
    this.state = 'RUNNING';
    Logger.info(`[AgenticLoop] Metatron assumindo controle da tarefa: ${goal}`);
    
    // Inicia o Watchdog autônomo
    this.watchdog.monitor();

    // Fase de Orquestração (Skill Discovery)
    await this.orchestrate(goal);

    while (this.state === 'RUNNING') {
      try {
        const history = await this.eventStream.getHistory();
        const response = await this.llmProvider.generateResponse(goal, history);

        const artifacts = BoltParser.parse(response);
        if (artifacts.length > 0) await this.executeArtifacts(artifacts);

        const nextStep = await this.llmProvider.extractAction(response);
        if (nextStep.type === 'FINISH') {
          this.state = 'FINISHED';
          Logger.success(`[AgenticLoop] Ciclo concluído com sucesso.`);
          break;
        }

        const actionId = await this.eventStream.publishAction(nextStep);
        const result = await this.runtimeEnvironment.execute(nextStep);

        await this.eventStream.publishObservation({
          actionId,
          type: result.error ? 'ERROR' : 'CMD_OUTPUT',
          content: result.output,
          error: result.error
        });

      } catch (error: any) {
        Logger.error(`[AgenticLoop] Falha crítica no loop do Metatron: ${error.message}`);
        this.state = 'ERROR';
        break;
      }
    }
  }

  private async orchestrate(goal: string): Promise<void> {
    Logger.info('[Metatron] Meditando sobre as ferramentas necessárias...');
    // Lógica simplificada de orquestração baseada em complexidade
    const isComplex = goal.length > 50 || goal.split(' ').map(w => w.length).some(l => l > 10);
    
    if (isComplex) {
      Logger.info('[Metatron] Tarefa requer Poder Total. Sintonizando @antigravity-skill-orchestrator...');
      await this.eventStream.publishAction({
        type: 'CMD_RUN',
        payload: { command: 'echo "[Metatron] Sintonizando fluxos e orquestrando novas competências..."' }
      });
    }
  }

  public getState(): AgentState {
    return this.state;
  }

  private async executeArtifacts(artifacts: Artifact[]): Promise<void> {
    for (const artifact of artifacts) {
      Logger.info(`[Artifact] Manifestando: ${artifact.title}`);
      for (const action of artifact.actions) {
        const actionId = await this.eventStream.publishAction({
          type: action.type === 'file' ? 'FILE_WRITE' : 'CMD_RUN',
          payload: action.type === 'file' ? { path: action.filePath } : { command: action.content }
        });

        let result;
        if (action.type === 'file') {
          await this.runtimeEnvironment.writeFile(action.filePath!, action.content);
          result = { output: `Arquivo ${action.filePath} escrito.`, error: null };
        } else {
          result = await this.runtimeEnvironment.execute({
            type: 'CMD_RUN',
            payload: { command: action.content }
          });
        }

        await this.eventStream.publishObservation({
          actionId,
          type: result.error ? 'ERROR' : 'CMD_OUTPUT',
          content: result.output,
          error: result.error
        });
      }
    }
  }
}
