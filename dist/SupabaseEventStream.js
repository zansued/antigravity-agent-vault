"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseEventStream = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
class SupabaseEventStream {
    sessionId;
    supabase;
    constructor(supabaseUrl, supabaseKey, sessionId) {
        this.sessionId = sessionId;
        this.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey, {
            db: { schema: 'public' }
        });
    }
    async publishAction(action) {
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
        return data[0].id;
    }
    async publishObservation(observation) {
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
        return data[0].id;
    }
    async getHistory() {
        const { data, error } = await this.supabase
            .from('geminicli_agent_events')
            .select('*')
            .eq('session_id', this.sessionId)
            .order('created_at', { ascending: true });
        if (error)
            throw new Error(`Erro ao buscar histórico: ${error.message}`);
        return (data || []).map((e) => e.type === 'ACTION' ? {
            id: e.id, type: e.event_type, payload: e.payload, timestamp: e.created_at
        } : {
            id: e.id, actionId: e.action_id, type: e.event_type, content: e.content, error: e.error_msg, timestamp: e.created_at
        });
    }
    subscribe(callback) {
        const channel = this.supabase
            .channel(`session:${this.sessionId}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'geminicli_agent_events' }, (payload) => {
            callback(payload.new);
        })
            .subscribe();
        return () => { this.supabase.removeChannel(channel); };
    }
}
exports.SupabaseEventStream = SupabaseEventStream;
