# Token-Efficient Persistent Memory System (TEPMS)

O **TEPMS** é o orquestrador de elite do Antigravity para economia radical de tokens e memória persistente de longo prazo. Ele integra três tecnologias de ponta em um pipeline único.

## 🏗️ Camadas de Operação

### 1. Claw-Compactor (Filtro Determinístico)
- **O que faz:** Limpeza local imediata sem custo de API.
- **Técnicas:** Remoção de redundância, codificação de dicionário ($XX) e RLE (Run-Length Encoding).
- **Impacto:** Redução imediata de 10-20% no contexto de arquivos e logs.

### 2. SimpleMem (Destilador de Memória)
- **O que faz:** Transforma diálogos brutos em fatos atômicos e consolidados.
- **Técnicas:** Síntese semântica "on-the-fly" e busca híbrida (LanceDB + SQLite).
- **Impacto:** Permite que o agente "lembre" de decisões de semanas atrás sem re-injetar todo o histórico.

### 3. LLMLingua-2 (Compressor de Tokens)
- **O que faz:** Compressão matemática baseada em perplexidade (PPL).
- **Técnicas:** Utiliza modelos pequenos (como BERT/Phi-2) para identificar e remover tokens previsíveis.
- **Impacto:** Até 20x de compressão em prompts longos antes do envio final para o LLM.

## 🔄 Fluxo de Trabalho (Pipeline Antigravity)

1. **Input:** Prompt + Contexto Bruto.
2. **Retrieve:** SimpleMem busca fatos relevantes na memória de longo prazo.
3. **Compact:** Claw-Compactor limpa o contexto bruto e os fatos recuperados.
4. **Compress:** LLMLingua aplica a compressão final para atingir o `target_token_budget`.
5. **Output:** Prompt ultra-denso pronto para a API.

## 🛠️ Implementação Core

O sistema reside em `core/tepms/tepms_agent.py` e pode ser ativado via skill.
