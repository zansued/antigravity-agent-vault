import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { Server } from 'socket.io'
// Importação corrigida para módulos CommonJS
import supabaseRealtime from '@supabase/realtime-js'
const { createClient } = supabaseRealtime

// Plugin para permitir que o Metatron modifique seu próprio código e instale pacotes
function metatronAutopoiesisPlugin(): PluginOption {
  let io: Server;
  let supabaseClient: any;

  const SUPABASE_URL = 'https://supa.techstorebrasil.com';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogInNlcnZpY2Vfcm9sZSIsCiAgImlzcyI6ICJzdXBhYmFzZSIsCiAgImlhdCI6IDE3MTUwNTA4MDAsCiAgImV4cCI6IDE3MTgwOTUyMDAKfQ.1w168CO-icK3_NsOLyNllE35tVAKmv5ygfnE_AgbMGs';

  // Função para inicializar o cliente Supabase com Realtime
  const initSupabaseRealtime = () => {
    return createClient(SUPABASE_URL, SUPABASE_KEY, {
      realtime: { params: { directly: true } },
      auth: { autoEncryptSession: true },
    });
  };

  // Função para configurar a subscrição de mudanças
  const subscribeToChanges = (supabase) => {
    const channel = supabase.channel('metatron-realtime-changes', { 
      config: { 
        broadcast: { self: true }, 
        presence: { key: 'default-key' } // Chave de presença, pode ser adaptada se necessário
      }
    });

    // Subscribe a eventos de inserção, atualização e deleção na tabela de nodos
    channel.on('postgres_changes', {
      event: '*', // Escuta todos os eventos
      schema: 'public',
      table: 'geminicli_knowledge_nodes'
    }, (payload) => {
      console.log('[Supabase Realtime] Node change detected:', payload);
      // Emite o evento para o Socket.io
      if (io) {
        io.emit('knowledge_update', payload.new);
      }
    })
    // Adicionar aqui mais subscrições para outras tabelas (links, etc.) se necessário
    .on('postgres_changes', {
      event: '*', 
      schema: 'public',
      table: 'geminicli_knowledge_links'
    }, (payload) => {
      console.log('[Supabase Realtime] Link change detected:', payload);
      if (io) {
        io.emit('link_update', payload.new);
      }
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('[Supabase Realtime] Inscrito com sucesso nos canais.');
      } else {
        console.error('[Supabase Realtime] Erro na inscrição:', status);
      }
    });

    return channel;
  };

  return {
    name: 'metatron-autopoiesis',
    async configureServer(server) {
      // Inicializa o Socket.io no servidor do Vite
      io = new Server(server.httpServer, {
        cors: { origin: "*" }
      });

      io.on('connection', (socket) => {
        console.log('[Metatron] Portal conectado via Ley Line (WebSocket)');
        socket.emit('log', { type: 'info', message: 'Conexão Astral Estabelecida.' });
      });

      // Inicializa o cliente Supabase Realtime e se inscreve nas mudanças
      // É importante garantir que a chave de presença seja dinâmica ou configurável
      supabaseClient = initSupabaseRealtime();
      subscribeToChanges(supabaseClient);

      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/metatron-action' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk.toString());
          req.on('end', async () => {
            try {
              const { type, content, filePath } = JSON.parse(body);
              
              if (type === 'file') {
                const fullPath = path.resolve(__dirname, filePath);
                fs.mkdirSync(path.dirname(fullPath), { recursive: true });
                fs.writeFileSync(fullPath, content);
                console.log(`[Metatron] Arquivo atualizado: ${filePath}`);
                
                io.emit('log', { type: 'success', message: `Arquivo imortalizado: ${filePath}` });

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: `Arquivo ${filePath} gravado.` }));
              } 
              else if (type === 'shell') {
                console.log(`[Metatron] Executando comando: ${content}`);
                
                io.emit('log', { type: 'info', message: `Iniciando ritual: ${content}` });

                const child = exec(content, { cwd: __dirname });

                child.stdout?.on('data', (data) => {
                  io.emit('log', { type: 'stdout', message: data.toString() });
                });

                child.stderr?.on('data', (data) => {
                  io.emit('log', { type: 'stderr', message: data.toString() });
                });

                child.on('close', (code) => {
                  io.emit('log', { type: 'info', message: `Ritual concluído (Código: ${code})` });
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: code === 0, code }));
                });
              } else {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Tipo de ação desconhecido' }));
              }
            } catch (err: any) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), metatronAutopoiesisPlugin()],
  server: {
    port: 3000,
    host: true
  }
})
