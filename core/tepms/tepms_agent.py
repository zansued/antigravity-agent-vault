import os
import json
import time
from typing import List, Optional, Dict, Any
import lancedb
import pandas as pd
from sentence_transformers import SentenceTransformer
from llmlingua import PromptCompressor

class TEPMSHiCacheAgent:
    """
    TEPMS HiCache Agent v2.0 (Kimi-K2.5 Edition)
    Implementa: L1/L2/L3 Cache, Agent Swarm e CoT Persistence.
    """
    def __init__(self, workspace: str, model_name: str = "gpt2"):
        self.workspace = workspace
        self.memory_path = os.path.join(workspace, "memory", "tepms_lancedb")
        self.l2_cache_path = os.path.join(workspace, "memory", "l2_session_cache.json")
        self.swarm_registry_path = os.path.join(workspace, "memory", "swarm_registry.json")
        
        # --- L3 (Global Store) ---
        self.embed_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.db = lancedb.connect(self.memory_path)
        
        existing_tables = self.db.table_names()
        if "facts" not in existing_tables:
            dummy_data = [{
                "vector": self.embed_model.encode("dummy").tolist(),
                "text": "dummy",
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
                "hot_score": 0,
                "type": "fact" # fact, reasoning, swarm_state
            }]
            self.table = self.db.create_table("facts", data=dummy_data)
        else:
            self.table = self.db.open_table("facts")

        # --- L2 & Swarm Registry ---
        self.l2_cache = self._load_json(self.l2_cache_path)
        self.swarm_agents = self._load_json(self.swarm_registry_path)

        # --- L1 ---
        self.l1_buffer = []

        # --- Compressor ---
        print(f"Carregando compressor LLMLingua ({model_name})...")
        self.compressor = PromptCompressor(model_name=model_name, device_map="cpu")

    def _load_json(self, path: str) -> Any:
        if os.path.exists(path):
            try:
                with open(path, "r") as f:
                    return json.load(f)
            except: return [] if "cache" in path else {}
        return [] if "cache" in path else {}

    def _save_json(self, path: str, data: Any):
        with open(path, "w") as f:
            json.dump(data, f, indent=2)

    def compact_deterministic(self, text: str) -> str:
        """Claw-Compactor Layer 1."""
        lines = text.split('\n')
        unique_lines = []
        for line in lines:
            line = line.strip()
            if line and line not in unique_lines:
                unique_lines.append(line)
        return '\n'.join(unique_lines)

    def local_match(self, query: str) -> List[str]:
        """Busca L1/L2 com suporte a Reasoning."""
        matches = []
        query_words = set(query.lower().split())
        
        # Busca na L1/L2 priorizando fatos e raciocínios recentes
        for entry in self.l2_cache[::-1]: # Mais recentes primeiro
            if any(word in entry["text"].lower() for word in query_words):
                tag = "[CoT]" if entry.get("type") == "reasoning" else "[L2]"
                matches.append(f"{tag} {entry['text']}")
        
        return matches[:5]

    def prefetch_l3(self, query: str, limit: int = 5) -> List[str]:
        """Busca semântica global."""
        query_vec = self.embed_model.encode(query).tolist()
        results = self.table.search(query_vec).limit(limit).to_list()
        return [f"[L3] {r['text']}" for r in results if r["text"] != "dummy"]

    def decompose_for_swarm(self, user_prompt: str, context: str) -> List[Dict[str, str]]:
        """
        Agent Swarm: Decompõe tarefa massiva em sub-tarefas (Kimi-K2.5 Logic).
        """
        # Lógica heurística: divide por tipo de conteúdo
        sub_tasks = []
        if "código" in context.lower() or "implementar" in user_prompt.lower():
            sub_tasks.append({"agent": "Architect", "focus": "Estrutura e Lógica"})
        if len(context) > 5000:
            sub_tasks.append({"agent": "Summarizer", "focus": "Destilação de Contexto"})
        
        return sub_tasks

    def process_prompt(self, user_prompt: str, context: str = "") -> str:
        """Pipeline TEPMS HiCache v2.0."""
        # 1. Local Match (L1/L2 + CoT)
        local_context = self.local_match(user_prompt)
        
        # 2. Prefetch L3
        global_context = self.prefetch_l3(user_prompt)

        # 3. Context Management (Thresholding)
        # Se exceder 10k chars, mantém apenas o essencial (Kimi Strategy)
        if len(context) > 10000:
            print("Contexto massivo detectado. Aplicando Thresholding...")
            context = context[:2000] + "\n...[TRUNCATED]...\n" + context[-2000:]

        combined_raw = (context + "\n" + "\n".join(local_context) + "\n" + "\n".join(global_context)).strip()
        compacted = self.compact_deterministic(combined_raw)

        # 4. Agent Swarm Check
        swarm_tasks = self.decompose_for_swarm(user_prompt, compacted)
        swarm_prefix = ""
        if swarm_tasks:
            swarm_prefix = "[SWARM MODE] Ativando agentes: " + ", ".join([t["agent"] for t in swarm_tasks]) + "\n"

        try:
            result = self.compressor.compress_prompt(
                context=[compacted],
                instruction=swarm_prefix,
                question=user_prompt,
                rate=0.4,
                iterative_size=100
            )
            return result.get('compressed_prompt', user_prompt)
        except Exception as e:
            return f"{swarm_prefix}\nContexto HiCache (Fallback):\n{compacted}\n\nPergunta: {user_prompt}"

    def write_back(self, content: str, entry_type: str = "fact", to_global: bool = False):
        """
        Write-back com suporte a CoT (Chain-of-Thought).
        """
        entry = {
            "text": content,
            "type": entry_type, # fact, reasoning
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "hot_score": 10 if to_global else 1
        }
        
        self.l2_cache.append(entry)
        self._save_json(self.l2_cache_path, self.l2_cache)

        if to_global:
            vec = self.embed_model.encode(content).tolist()
            self.table.add([{
                "vector": vec,
                "text": content,
                "timestamp": entry["timestamp"],
                "hot_score": 10,
                "type": entry_type
            }])
            print(f"[{entry_type.upper()}] promovido para L3 (Global).")

if __name__ == "__main__":
    workspace_path = "C:\\Users\\zan_s\\.gemini\\tmp\\system32\\antigravity-agent-vault"
    agent = TEPMSHiCacheAgent(workspace=workspace_path)
    
    # Simula persistência de raciocínio (CoT)
    agent.write_back("Decidi usar GPT2 como fallback porque é mais leve para CPU.", entry_type="reasoning")
    agent.write_back("O Antigravity é o repositório central de inteligência.", to_global=True)
    
    prompt = "Por que usamos GPT2 no TEPMS?"
    print("\n--- Processando Prompt (HiCache v2.0 - Agent Swarm Ready) ---")
    final_prompt = agent.process_prompt(prompt)
    print(f"\nPrompt Final:\n{final_prompt}")
