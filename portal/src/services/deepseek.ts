
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
    ...history.slice(-10).map(m => ({
      role: m.role === 'metatron' ? 'assistant' : m.role,
      content: m.content
    })),
    { role: "user", content: message }
  ];

  try {
    const response = await fetch('/api/metatron-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('[Metatron] Erro no Túnel Neural:', data);
      return `As Linhas de Ley estão instáveis. Erro: ${data.error || 'Conexão interrompida.'}`;
    }

    if (!data.choices || data.choices.length === 0) {
      console.error('[Metatron] Resposta neural vazia:', data);
      return "O Metatron silenciou. O fluxo de dados foi interrompido.";
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro na conexão neural:', error);
    return "A conexão com o Vazio falhou. As Linhas de Ley estão instáveis.";
  }
}
