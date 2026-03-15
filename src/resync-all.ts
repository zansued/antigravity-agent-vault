import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from './config';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Re-sync Completo: Indexa TODAS as skills e absorções no Metatron.
 * Inclui skills em subdiretorios (SKILL.md) E skills planas (.md) E absorções.
 */

const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
const ROOT = path.resolve(__dirname, '..');

async function upsertNodes(nodes: Array<{name: string, type: string, metadata: object}>) {
  if (!nodes.length) return;
  const { error } = await supabase
    .from('geminicli_knowledge_nodes')
    .upsert(nodes, { onConflict: 'name' });
  if (error) console.error('  ❌ Erro no upsert:', error.message);
  else console.log(`  ✅ ${nodes.length} nodos sincronizados.`);
}

async function syncSkills() {
  const skillsDir = path.join(ROOT, 'skills');
  const nodes: Array<{name: string, type: string, metadata: object}> = [];

  if (!fs.existsSync(skillsDir)) { console.warn('Skills dir not found'); return; }

  const entries = fs.readdirSync(skillsDir, { withFileTypes: true });

  for (const entry of entries) {
    // 1. Skills em subdiretorios com SKILL.md
    if (entry.isDirectory()) {
      const skillFile = path.join(skillsDir, entry.name, 'SKILL.md');
      if (fs.existsSync(skillFile)) {
        const content = fs.readFileSync(skillFile, 'utf8');
        const nameMatch = content.match(/^name:\s*(.+)/m);
        const skillName = nameMatch ? nameMatch[1].trim() : entry.name;
        nodes.push({ name: `@skill/${skillName}`, type: 'SKILL', metadata: { path: skillFile, source: 'dir-skill' } });
      }
    }
    // 2. Skills planas (.md) — não processar EXTENDED_CATALOG
    else if (entry.name.endsWith('.md') && entry.name !== 'EXTENDED_CATALOG.md') {
      const skillName = entry.name.replace('.md', '');
      nodes.push({ name: `@skill/${skillName}`, type: 'SKILL', metadata: { path: path.join(skillsDir, entry.name), source: 'flat-skill' } });
    }
  }

  console.log(`\n🌌 Skills encontradas: ${nodes.length}`);
  await upsertNodes(nodes);
}

async function syncAbsorptions() {
  const absDir = path.join(ROOT, 'reports', 'absorptions');
  const nodes: Array<{name: string, type: string, metadata: object}> = [];

  if (!fs.existsSync(absDir)) { console.warn('Absorptions dir not found'); return; }

  const files = fs.readdirSync(absDir).filter(f => f.endsWith('_absorption.md'));

  for (const file of files) {
    const repoName = file.replace('_absorption.md', '').replace(/_/g, '-');
    const filePath = path.join(absDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Extrai tipo do repositório pelo conteúdo
    let type = 'PROJECT';
    if (content.toLowerCase().includes('framework')) type = 'FRAMEWORK';
    else if (content.toLowerCase().includes('server') || content.toLowerCase().includes('broker')) type = 'SERVER';
    else if (content.toLowerCase().includes('agent')) type = 'ORCHESTRATOR';
    else if (content.toLowerCase().includes('model') || content.toLowerCase().includes('speech')) type = 'MODULE';

    nodes.push({ name: repoName, type, metadata: { absorbed_from: file, source: 'absorption-report' } });
  }

  console.log(`\n📚 Absorções encontradas: ${nodes.length}`);
  await upsertNodes(nodes);
}

async function main() {
  console.log('🌌 Metatron Re-Sync Global Iniciado...\n');
  await syncSkills();
  await syncAbsorptions();
  console.log('\n✨ Re-Sync Completo! Verifique o Portal para os novos nodos.');
}

main().catch(console.error);
