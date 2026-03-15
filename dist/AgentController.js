"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentController = void 0;
const BoltParser_1 = require("./BoltParser");
const MetatronWatchdog_1 = require("./MetatronWatchdog");
const logger_1 = require("./utils/logger");
class AgentController {
    eventStream;
    llmProvider;
    runtimeEnvironment;
    state = 'IDLE';
    maxRetries = 3;
    retryCount = new Map();
    watchdog;
    constructor(eventStream, llmProvider, runtimeEnvironment) {
        this.eventStream = eventStream;
        this.llmProvider = llmProvider;
        this.runtimeEnvironment = runtimeEnvironment;
        this.watchdog = new MetatronWatchdog_1.MetatronWatchdog(this.eventStream);
    }
    async runTask(goal) {
        this.state = 'RUNNING';
        logger_1.Logger.info(`[AgenticLoop] Metatron assumindo controle da tarefa: ${goal}`);
        // Inicia o Watchdog autônomo
        this.watchdog.monitor();
        // Fase de Orquestração (Skill Discovery)
        await this.orchestrate(goal);
        while (this.state === 'RUNNING') {
            try {
                const history = await this.eventStream.getHistory();
                const response = await this.llmProvider.generateResponse(goal, history);
                const artifacts = BoltParser_1.BoltParser.parse(response);
                if (artifacts.length > 0)
                    await this.executeArtifacts(artifacts);
                const nextStep = await this.llmProvider.extractAction(response);
                if (nextStep.type === 'FINISH') {
                    this.state = 'FINISHED';
                    logger_1.Logger.success(`[AgenticLoop] Ciclo concluído com sucesso.`);
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
            }
            catch (error) {
                logger_1.Logger.error(`[AgenticLoop] Falha crítica no loop do Metatron: ${error.message}`);
                this.state = 'ERROR';
                break;
            }
        }
    }
    async orchestrate(goal) {
        logger_1.Logger.info('[Metatron] Meditando sobre as ferramentas necessárias...');
        // Lógica simplificada de orquestração baseada em complexidade
        const isComplex = goal.length > 50 || goal.split(' ').map(w => w.length).some(l => l > 10);
        if (isComplex) {
            logger_1.Logger.info('[Metatron] Tarefa requer Poder Total. Sintonizando @antigravity-skill-orchestrator...');
            await this.eventStream.publishAction({
                type: 'CMD_RUN',
                payload: { command: 'echo "[Metatron] Sintonizando fluxos e orquestrando novas competências..."' }
            });
        }
    }
    getState() {
        return this.state;
    }
    async executeArtifacts(artifacts) {
        for (const artifact of artifacts) {
            logger_1.Logger.info(`[Artifact] Manifestando: ${artifact.title}`);
            for (const action of artifact.actions) {
                const actionId = await this.eventStream.publishAction({
                    type: action.type === 'file' ? 'FILE_WRITE' : 'CMD_RUN',
                    payload: action.type === 'file' ? { path: action.filePath } : { command: action.content }
                });
                let result;
                if (action.type === 'file') {
                    await this.runtimeEnvironment.writeFile(action.filePath, action.content);
                    result = { output: `Arquivo ${action.filePath} escrito.`, error: null };
                }
                else {
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
exports.AgentController = AgentController;
