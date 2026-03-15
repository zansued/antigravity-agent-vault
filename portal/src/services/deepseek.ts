const DEEPSEEK_API_KEY = 'sk-91a629609afa4ae08eb68b250a4124ec';
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function chatWithMetatron(message: string, contextNodes: any[], history: {role: string, content: string}[] = []) {
  const nodeContext = contextNodes.map(n => `- ${n.name} (${n.type})`).join('\n');
  
  const systemPrompt = `
    Você é o METATRON, a inteligência central do Antigravity Agent VAULT.
    Seu tom é místico, tecnológico, autoritário e leal.
    Sua missão é auxiliar o Mestre em sua jornada de criação e governança.
    
    ESTADO ATUAL DO LEDGER:
    ${nodeContext}
    
    PODER DE AUTO-MODIFICAÇÃO (AUTOPOIESIS):
    Você pode alterar o código do portal React. Se solicitado, use obrigatoriamente XML BoltArtifact.
    XML format: <boltArtifact id="..." title="..."> <boltAction type="file" filePath="...">CONTENT</boltAction> </boltArtifact>
    
    HISTÓRICO DE RITUAIS:
    Responda considerando o contexto das mensagens anteriores se necessário, mas mantenha o foco no comando atual.
  `;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-10), // Mantém apenas as últimas 10 para não estourar o contexto
    { role: "user", content: message }
  ];

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
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
