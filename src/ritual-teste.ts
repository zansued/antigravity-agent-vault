import { TheWeaver } from './TheWeaver';
import { MetatronLedger } from './MetatronLedger';
import { SUPABASE_CONFIG } from './config';

// 1. Mock do LLM (Simula o raciocínio de Metatron)
const metatronLLM = {
  generateJson: async (prompt: string) => {
    // Simula a extração de conhecimento do texto de teste
    return JSON.stringify({
      nodes: [
        { name: "Batcaverna", type: "PROJECT" },
        { name: "Metatron-Book", type: "TOOL" },
        { name: "Supabase", type: "SERVER" }
      ],
      links: [
        { sourceName: "Metatron-Book", targetName: "Batcaverna", relationType: "CORE_OF" },
        { sourceName: "Metatron-Book", targetName: "Supabase", relationType: "PERSISTS_IN" }
      ]
    });
  }
};

async function iniciarRitual() {
  console.log('🌌 Iniciando o Primeiro Ritual de Tecelagem de Metatron...');

  const weaver = new TheWeaver(metatronLLM);
  const ledger = new MetatronLedger(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);

  const textoTeste = "O Metatron-Book é o núcleo da Batcaverna e persiste todos os dados no Supabase.";

  try {
    // Fase 1: Revelação (Extração)
    const weaveResult = await weaver.extractKnowledge(textoTeste);
    console.log('✨ Conhecimento revelado através da luz:', JSON.stringify(weaveResult, null, 2));

    // Fase 2: Imortalização (Persistência)
    await ledger.saveWeave(weaveResult);

    console.log('\n✅ RITUAL CONCLUÍDO: A verdade foi gravada para a eternidade no Livro de Metatron.');
  } catch (error) {
    console.error('💥 O ritual foi interrompido por uma discórdia:', error);
  }
}

iniciarRitual();
