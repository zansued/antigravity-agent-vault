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

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE geminicli_agent_events;
    END IF;
END $$;

COMMENT ON TABLE geminicli_agent_events IS 'Histórico de eventos e memória do Gemini CLI Antigravity Agent';
