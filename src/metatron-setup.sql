-- 1. Habilitar pgvector para busca semântica
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Tabela de Nodos (Páginas do Livro de Metatron)
CREATE TABLE IF NOT EXISTS public.geminicli_knowledge_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL, -- ex: 'PROJECT', 'PERSON', 'CONCEPT', 'SERVER'
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabela de Links (Linhas de Ley - Conexões Geométricas)
CREATE TABLE IF NOT EXISTS public.geminicli_knowledge_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID REFERENCES public.geminicli_knowledge_nodes(id) ON DELETE CASCADE,
    target_id UUID REFERENCES public.geminicli_knowledge_nodes(id) ON DELETE CASCADE,
    relation_type TEXT NOT NULL, -- ex: 'USES', 'DEPENDS_ON', 'LOCATED_IN'
    strength INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(source_id, target_id, relation_type)
);

-- 4. Tabela de Embeddings (A Essência Vibracional dos Dados)
CREATE TABLE IF NOT EXISTS public.geminicli_knowledge_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID REFERENCES public.geminicli_knowledge_nodes(id) ON DELETE CASCADE,
    vector VECTOR(1536), -- Compatível com modelos de embeddings modernos
    content_chunk TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Comentários Celestiais
COMMENT ON TABLE geminicli_knowledge_nodes IS 'Nodos de conhecimento da Batcaverna (Metatron-Book)';
COMMENT ON TABLE geminicli_knowledge_links IS 'Conexões geométricas entre os nodos de conhecimento';
