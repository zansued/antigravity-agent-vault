
import os
import json
import time
from typing import List, Optional
import lancedb
import pandas as pd
from sentence_transformers import SentenceTransformer
from llmlingua import PromptCompressor

class TEPMSAgent:
    def __init__(self, workspace: str, model_name: str = "gpt2"):
        self.workspace = workspace
        self.memory_path = os.path.join(workspace, "memory", "tepms_lancedb")
        
        # 1. SimpleMem
        self.embed_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.db = lancedb.connect(self.memory_path)
        
        if "facts" not in self.db.table_names():
            dummy_data = [{
                "vector": self.embed_model.encode("dummy").tolist(),
                "text": "dummy",
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S")
            }]
            self.table = self.db.create_table("facts", data=dummy_data)
        else:
            self.table = self.db.open_table("facts")

        # 2. LLMLingua
        print(f"Carregando compressor LLMLingua ({model_name})...")
        self.compressor = PromptCompressor(model_name=model_name, device_map="cpu")

    def compact_deterministic(self, text: str) -> str:
        lines = text.split('\n')
        unique_lines = []
        for line in lines:
            line = line.strip()
            if line and line not in unique_lines:
                unique_lines.append(line)
        return '\n'.join(unique_lines)

    def retrieve_memories(self, query: str, limit: int = 5) -> List[str]:
        query_vec = self.embed_model.encode(query).tolist()
        results = self.table.search(query_vec).limit(limit).to_list()
        return [r["text"] for r in results if r["text"] != "dummy"]

    def store_fact(self, fact: str):
        vec = self.embed_model.encode(fact).tolist()
        self.table.add([{
            "vector": vec,
            "text": fact,
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S")
        }])

    def process_prompt(self, user_prompt: str, context: str = "") -> str:
        history = self.retrieve_memories(user_prompt)
        # Combina tudo em uma única string de contexto para evitar erros de unpack
        combined_context = (context + "\n" + "\n".join(history)).strip()
        
        if not combined_context:
            return user_prompt

        compacted = self.compact_deterministic(combined_context)

        # Compressão direta de string única
        try:
            result = self.compressor.compress_prompt(
                context=[compacted],
                instruction="",
                question=user_prompt,
                rate=0.4, 
                iterative_size=100
            )
            return result.get('compressed_prompt', user_prompt)
        except Exception as e:
            # Se a v1 falhar, o fallback determinístico do Antigravity é robusto
            print(f"Erro na compressão matemática: {e}")
            return f"Contexto Compactado:\n{compacted}\n\nPergunta: {user_prompt}"

if __name__ == "__main__":
    workspace_path = "C:\\Users\\zan_s\\.gemini\\tmp\\system32\\antigravity-agent-vault"
    agent = TEPMSAgent(workspace=workspace_path)
    
    agent.store_fact("O TEPMS usa compactação determinística antes da compressão vetorial.")
    
    prompt = "Como funciona o TEPMS?"
    context_longo = "Informação redundante sobre sistemas de memória. " * 20
    
    print("\n--- Iniciando Processamento TEPMS ---")
    final_prompt = agent.process_prompt(prompt, context_longo)
    print(f"\nPrompt Final:\n{final_prompt}")
