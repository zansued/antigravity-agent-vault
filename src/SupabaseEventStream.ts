import { Action, Observation, EventStream } from './types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class SupabaseEventStream implements EventStream {
  private supabase: SupabaseClient;

  constructor(supabaseUrl: string, supabaseKey: string, private sessionId: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey, {
      db: { schema: 'public' }
    });
  }

  public async publishAction(action: Omit<Action, 'id' | 'timestamp'>): Promise<string> {
    // Inserção simples sem .select() para evitar problemas com o Kong
    const { data, error } = await this.supabase
      .from('geminicli_agent_events')
      .insert([{
        session_id: this.sessionId,
        type: 'ACTION',
        event_type: action.type,
        payload: action.payload
      }])
      .select('id'); // Pedimos apenas o ID

    if (error) {
      console.error('❌ Erro Supabase:', error);
      throw new Error(`Falha na gravação: ${error.message}`);
    }
    return data![0].id;
  }

  public async publishObservation(observation: Omit<Observation, 'id' | 'timestamp'>): Promise<string> {
    const { data, error } = await this.supabase
      .from('geminicli_agent_events')
      .insert([{
        session_id: this.sessionId,
        type: 'OBSERVATION',
        event_type: observation.type,
        action_id: observation.actionId,
        content: observation.content,
        error_msg: observation.error
      }])
      .select('id');

    if (error) {
      console.error('❌ Erro Supabase:', error);
      throw new Error(`Falha na gravação: ${error.message}`);
    }
    return data![0].id;
  }

  public async getHistory(): Promise<(Action | Observation)[]> {
    const { data, error } = await this.supabase
      .from('geminicli_agent_events')
      .select('*')
      .eq('session_id', this.sessionId)
      .order('created_at', { ascending: true });

    if (error) throw new Error(`Erro ao buscar histórico: ${error.message}`);
    return (data || []).map((e: any) => e.type === 'ACTION' ? ({
      id: e.id, type: e.event_type, payload: e.payload, timestamp: e.created_at
    } as Action) : ({
      id: e.id, actionId: e.action_id, type: e.event_type, content: e.content, error: e.error_msg, timestamp: e.created_at
    } as Observation));
  }

  public subscribe(callback: (event: Action | Observation) => void): () => void {
    const channel = this.supabase
      .channel(`session:${this.sessionId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'geminicli_agent_events' }, (payload: any) => {
        callback(payload.new as any);
      })
      .subscribe();
    return () => { this.supabase.removeChannel(channel); };
  }
}
