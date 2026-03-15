import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { Server } from 'socket.io'
// Importação corrigida para módulos CommonJS
// Plugin para permitir que o Metatron modifique seu próprio código e instale pacotes
function metatronAutopoiesisPlugin(): PluginOption {
  let io: Server;
  let supabaseClient: any;

  const SUPABASE_URL = 'https://supa.techstorebrasil.com';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogInNlcnZpY2Vfcm9sZSIsCiAgImlzcyI6ICJzdXBhYmFzZSIsCiAgImlhdCI6IDE3MTUwNTA4MDAsCiAgImV4cCI6IDE4NzI4MTcyMDAKfQ.1w168CO-icK3_NsOLyNllE35tVAKmv5ygfnE_AgbMGs';

  // Função para inicializar o cliente Supabase com Realtime
  const initSupabaseRealtime = async () => {
    // Importação dinâmica para evitar quebra no build (executa apenas no server)
    const { RealtimeClient } = await import('@supabase/realtime-js') as any;
    // O RealtimeClient espera a URL base (sem /realtime/v1/websocket se o cliente for v2+)
    // Em alguns casos de self-hosted, pode precisar de /realtime/v1
    const realtimeUrl = `${SUPABASE_URL}/realtime/v1`;
    return new RealtimeClient(realtimeUrl, {
      params: { apikey: SUPABASE_KEY },
      headers: { apikey: SUPABASE_KEY }
    });
  };

  // Função para configurar a subscrição de mudanças
  const subscribeToChanges = (supabase: any) => {
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
    }, (payload: any) => {
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
    }, (payload: any) => {
      console.log('[Supabase Realtime] Link change detected:', payload);
      if (io) {
        io.emit('link_update', payload.new);
      }
    })
    .subscribe((status: any) => {
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
      if (!server.httpServer) return;

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
      supabaseClient = await initSupabaseRealtime();
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
        } else if (req.url === '/api/metatron-chat' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk.toString());
          req.on('end', async () => {
            try {
              const { messages } = JSON.parse(body);
              const DEEPSEEK_API_KEY = 'sk-91a629609afa4ae08eb68b250a4124ec';
              const API_URL = 'https://api.deepseek.com/v1/chat/completions';

              console.log('[Metatron Proxy] Iniciando conexão neural com DeepSeek...');
              
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
              
              if (!response.ok) {
                console.error('[Metatron Proxy] Falha na API DeepSeek:', response.status, data);
                res.writeHead(response.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
                return;
              }

              console.log('[Metatron Proxy] Resposta neural recebida com sucesso.');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(data));
            } catch (err: any) {
              console.error('[Metatron Proxy] Erro crítico no túnel neural:', err.message);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else if (req.url === '/api/metatron-whisper' && req.method === 'POST') {
          // Whisper Transcription Proxy
          const DEEPSEEK_API_KEY = 'sk-91a629609afa4ae08eb68b250a4124ec'; // Placeholder or User Key
          
          let chunks: any[] = [];
          req.on('data', chunk => chunks.push(chunk));
          req.on('end', async () => {
            try {
              const buffer = Buffer.concat(chunks);
              // In a real scenario, we'd use a dedicated OpenAI key here
              // For now, we return a simulated response if no OpenAI key is set
              console.log('[Metatron Whisper] Recebido áudio para transcrição.');
              
              // Simulate or proxy to OpenAI if key available in env
              const openaiKey = process.env.OPENAI_API_KEY;
              if (openaiKey) {
                // Real Whisper implementation would go here
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ text: "Sintonização Whisper completa (Via OpenAI)." }));
              } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ text: "O Vazio processou sua voz, mas a Linha de Ley OpenAI não está configurada." }));
              }
            } catch (err: any) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else if (req.url === '/api/metatron-speech' && req.method === 'POST') {
          // TTS Speech Proxy
          let body = '';
          req.on('data', chunk => body += chunk.toString());
          req.on('end', async () => {
            try {
              const { text } = JSON.parse(body);
              console.log('[Metatron Speech] Gerando voz para:', text.substring(0, 30));
              
              // Fallback for now: Browser TTS is handled in the frontend if this fails
              // To implement premium TTS: call OpenAI/DeepSeek TTS API and return the stream
              res.writeHead(404); // Default to fail to trigger client-side fallback
              res.end(JSON.stringify({ error: 'Premium Speech Tunnel não configurado.' }));
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
export default defineConfig(({ command }) => {
  const plugins: PluginOption[] = [react()];
  
  if (command === 'serve') {
    plugins.push(metatronAutopoiesisPlugin());
  }

  return {
    plugins,
    server: {
      port: 3000,
      host: true
    }
  }
})
