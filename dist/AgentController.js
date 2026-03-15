"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentController = void 0;
const BoltParser_1 = require("./BoltParser");
class AgentController {
    eventStream;
    llmProvider;
    runtimeEnvironment;
    state = 'IDLE';
    maxRetries = 3;
    retryCount = new Map();
    constructor(eventStream, llmProvider, runtimeEnvironment) {
        this.eventStream = eventStream;
        this.llmProvider = llmProvider;
        this.runtimeEnvironment = runtimeEnvironment;
    }
    async runTask(goal) {
        this.state = 'RUNNING';
        console.log(`[AgenticLoop] Iniciando tarefa: ${goal}`);
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
                    console.log(`[AgenticLoop] Tarefa concluída.`);
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
                console.error(`[AgenticLoop] Falha crítica:`, error);
                this.state = 'ERROR';
                break;
            }
        }
    }
    getState() {
        return this.state;
    }
    async executeArtifacts(artifacts) {
        for (const artifact of artifacts) {
            console.log(`[Artifact] Executando: ${artifact.title}`);
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
