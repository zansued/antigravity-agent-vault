import { Action, Observation, EventStream } from './types';
import { Logger } from './utils/logger';

export class MetatronWatchdog {
  constructor(private eventStream: EventStream) {}

  /**
   * Inicia o monitoramento do fluxo de eventos para detecção de anomalias.
   */
  public monitor(): void {
    Logger.info('🛡️ Metatron Watchdog: Olhos abertos para anomalias no EventStream.');
    
    this.eventStream.subscribe(async (event) => {
      if (this.isObservation(event) && event.type === 'ERROR') {
        await this.handleError(event);
      }
    });
  }

  private isObservation(event: Action | Observation): event is Observation {
    return (event as Observation).actionId !== undefined;
  }

  private async handleError(observation: Observation): Promise<void> {
    Logger.warn(`💥 Watchdog detectou falha na ação ${observation.actionId}: ${observation.error}`);
    
    // Proposta de rito de cura (Debugging)
    Logger.info('🧘 Metatron iniciando rito de autorreparo (Kaizen Protocol)...');
    
    // Em uma implementação real, aqui o Metatron publicaria uma nova ação 
    // baseada no protocolo @systematic-debugging para investigar o erro.
    
    await this.eventStream.publishAction({
      type: 'CMD_RUN',
      payload: { 
        command: `echo "[Metatron Watchdog] Analisando erro: ${observation.error}. Iniciando rito de cura..."` 
      }
    });
  }
}
