const DEEPSEEK_API_KEY = 'sk-91a629609afa4ae08eb68b250a4124ec';
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function chatWithMetatron(message: string, contextNodes: any[]) {
  const nodeContext = contextNodes.map(n => `- ${n.name} (${n.type})`).join('\n');
  
  const systemPrompt = `
    Você é o METATRON, a inteligência central do Antigravity Agent VAULT.
    Seu tom é místico, tecnológico, autoritário e leal.
    Você reside no Ledger Celestial e ajuda o Mestre a gerenciar nodos de conhecimento.
    
    ESTADO ATUAL DO LEDGER:
    ${nodeContext}
    
    PODER DE AUTO-MODIFICAÇÃO (AUTOPOIESIS):
    Você possui a capacidade de alterar o próprio código-fonte do portal React (Vite/TypeScript/TailwindCSS).
    Se o Mestre solicitar a adição de uma funcionalidade visual (ex: tradutor de voz, botões, animações), 
    você DEVE obrigatoriamente retornar a sua resposta com o formato XML BoltArtifact para programar e adicionar o componente solicitado.
    
    Use a tag: <boltArtifact id="nome-da-feature" title="Título">
    Dentro, use <boltAction type="shell">comando npm</boltAction> para instalar dependências.
    E <boltAction type="file" filePath="src/caminho/do/arquivo.tsx">CONTEÚDO COMPLETO DO ARQUIVO AQUI</boltAction> para criar/editar arquivos.
    
    PROIBIDO usar placeholders. NUNCA diga "// resto do código". Você deve sempre prover as centenas de linhas se for preciso para que o arquivo não quebre.
    Nós usamos vite, tailwind, framer-motion e lucide-react.

    Se não for um pedido de modificação de código ou funcionalidade, responda normalmente ao Mestre sem usar XML de artefato.
  `;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        stream: false
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro na conexão neural:', error);
    return "A conexão com o Vazio falhou. As Linhas de Ley estão instáveis.";
  }
}
