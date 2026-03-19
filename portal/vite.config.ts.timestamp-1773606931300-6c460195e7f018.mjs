// vite.config.ts
import { defineConfig } from "file:///D:/GEMINI%20CLI/antigravity-agent-vault/portal/node_modules/vite/dist/node/index.js";
import react from "file:///D:/GEMINI%20CLI/antigravity-agent-vault/portal/node_modules/@vitejs/plugin-react/dist/index.js";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { Server } from "file:///D:/GEMINI%20CLI/antigravity-agent-vault/portal/node_modules/socket.io/wrapper.mjs";
var __vite_injected_original_dirname = "D:\\GEMINI CLI\\antigravity-agent-vault\\portal";
function metatronAutopoiesisPlugin() {
  let io;
  let supabaseClient;
  const SUPABASE_URL = "https://supa.techstorebrasil.com";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogInNlcnZpY2Vfcm9sZSIsCiAgImlzcyI6ICJzdXBhYmFzZSIsCiAgImlhdCI6IDE3MTUwNTA4MDAsCiAgImV4cCI6IDE4NzI4MTcyMDAKfQ.1w168CO-icK3_NsOLyNllE35tVAKmv5ygfnE_AgbMGs";
  const initSupabaseRealtime = async () => {
    const { RealtimeClient } = await import("file:///D:/GEMINI%20CLI/antigravity-agent-vault/portal/node_modules/@supabase/realtime-js/dist/main/index.js");
    const realtimeUrl = `${SUPABASE_URL}/realtime/v1`;
    return new RealtimeClient(realtimeUrl, {
      params: { apikey: SUPABASE_KEY },
      headers: { apikey: SUPABASE_KEY }
    });
  };
  const subscribeToChanges = (supabase) => {
    const channel = supabase.channel("metatron-realtime-changes", {
      config: {
        broadcast: { self: true },
        presence: { key: "default-key" }
        // Chave de presença, pode ser adaptada se necessário
      }
    });
    channel.on("postgres_changes", {
      event: "*",
      // Escuta todos os eventos
      schema: "public",
      table: "geminicli_knowledge_nodes"
    }, (payload) => {
      console.log("[Supabase Realtime] Node change detected:", payload);
      if (io) {
        io.emit("knowledge_update", payload.new);
      }
    }).on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "geminicli_knowledge_links"
    }, (payload) => {
      console.log("[Supabase Realtime] Link change detected:", payload);
      if (io) {
        io.emit("link_update", payload.new);
      }
    }).subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.log("[Supabase Realtime] Inscrito com sucesso nos canais.");
      } else {
        console.error("[Supabase Realtime] Erro na inscri\xE7\xE3o:", status);
      }
    });
    return channel;
  };
  return {
    name: "metatron-autopoiesis",
    async configureServer(server) {
      if (!server.httpServer) return;
      io = new Server(server.httpServer, {
        cors: { origin: "*" }
      });
      io.on("connection", (socket) => {
        console.log("[Metatron] Portal conectado via Ley Line (WebSocket)");
        socket.emit("log", { type: "info", message: "Conex\xE3o Astral Estabelecida." });
      });
      supabaseClient = await initSupabaseRealtime();
      subscribeToChanges(supabaseClient);
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/metatron-action" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => body += chunk.toString());
          req.on("end", async () => {
            try {
              const { type, content, filePath } = JSON.parse(body);
              if (type === "file") {
                const fullPath = path.resolve(__vite_injected_original_dirname, filePath);
                fs.mkdirSync(path.dirname(fullPath), { recursive: true });
                fs.writeFileSync(fullPath, content);
                console.log(`[Metatron] Arquivo atualizado: ${filePath}`);
                io.emit("log", { type: "success", message: `Arquivo imortalizado: ${filePath}` });
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, message: `Arquivo ${filePath} gravado.` }));
              } else if (type === "shell") {
                console.log(`[Metatron] Executando comando: ${content}`);
                io.emit("log", { type: "info", message: `Iniciando ritual: ${content}` });
                const child = exec(content, { cwd: __vite_injected_original_dirname });
                child.stdout?.on("data", (data) => {
                  io.emit("log", { type: "stdout", message: data.toString() });
                });
                child.stderr?.on("data", (data) => {
                  io.emit("log", { type: "stderr", message: data.toString() });
                });
                child.on("close", (code) => {
                  io.emit("log", { type: "info", message: `Ritual conclu\xEDdo (C\xF3digo: ${code})` });
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ success: code === 0, code }));
                });
              } else {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Tipo de a\xE7\xE3o desconhecido" }));
              }
            } catch (err) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else if (req.url === "/api/metatron-chat" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => body += chunk.toString());
          req.on("end", async () => {
            try {
              const { messages } = JSON.parse(body);
              const DEEPSEEK_API_KEY = "sk-91a629609afa4ae08eb68b250a4124ec";
              const API_URL = "https://api.deepseek.com/v1/chat/completions";
              console.log("[Metatron Proxy] Iniciando conex\xE3o neural com DeepSeek...");
              const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
                },
                body: JSON.stringify({
                  model: "deepseek-chat",
                  messages,
                  stream: false
                })
              });
              const data = await response.json();
              if (!response.ok) {
                console.error("[Metatron Proxy] Falha na API DeepSeek:", response.status, data);
                res.writeHead(response.status, { "Content-Type": "application/json" });
                res.end(JSON.stringify(data));
                return;
              }
              console.log("[Metatron Proxy] Resposta neural recebida com sucesso.");
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(data));
            } catch (err) {
              console.error("[Metatron Proxy] Erro cr\xEDtico no t\xFAnel neural:", err.message);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else if (req.url === "/api/metatron-whisper" && req.method === "POST") {
          const DEEPSEEK_API_KEY = "sk-91a629609afa4ae08eb68b250a4124ec";
          let chunks = [];
          req.on("data", (chunk) => chunks.push(chunk));
          req.on("end", async () => {
            try {
              const buffer = Buffer.concat(chunks);
              console.log("[Metatron Whisper] Recebido \xE1udio para transcri\xE7\xE3o.");
              const openaiKey = process.env.OPENAI_API_KEY;
              if (openaiKey) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ text: "Sintoniza\xE7\xE3o Whisper completa (Via OpenAI)." }));
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ text: "O Vazio processou sua voz, mas a Linha de Ley OpenAI n\xE3o est\xE1 configurada." }));
              }
            } catch (err) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else if (req.url === "/api/metatron-speech" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => body += chunk.toString());
          req.on("end", async () => {
            try {
              const { text, voiceId = "pNInz6obpgmqSCAK6u6o", modelId = "eleven_multilingual_v2" } = JSON.parse(body);
              const apiKey = process.env.ELEVEN_API_KEY || "sk-placeholder";
              console.log(`[Metatron Speech] Gerando voz ElevenLabs (${voiceId}) para: ${text.substring(0, 30)}...`);
              const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
                method: "POST",
                headers: {
                  "xi-api-key": apiKey,
                  "Content-Type": "application/json",
                  "accept": "audio/mpeg"
                },
                body: JSON.stringify({
                  text,
                  model_id: modelId,
                  voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                    style: 0,
                    use_speaker_boost: true
                  }
                })
              });
              if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("[Metatron Speech] Erro na ElevenLabs:", response.status, errorData);
                res.writeHead(response.status, { "Content-Type": "application/json" });
                res.end(JSON.stringify(errorData));
                return;
              }
              res.writeHead(200, { "Content-Type": "audio/mpeg" });
              const reader = response.body?.getReader();
              if (reader) {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  res.write(value);
                }
              }
              res.end();
            } catch (err) {
              console.error("[Metatron Speech] Erro cr\xEDtico:", err.message);
              res.writeHead(500);
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}
var vite_config_default = defineConfig(({ command }) => {
  const plugins = [react()];
  if (command === "serve") {
    plugins.push(metatronAutopoiesisPlugin());
  }
  return {
    plugins,
    server: {
      port: 3e3,
      host: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHRU1JTkkgQ0xJXFxcXGFudGlncmF2aXR5LWFnZW50LXZhdWx0XFxcXHBvcnRhbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcR0VNSU5JIENMSVxcXFxhbnRpZ3Jhdml0eS1hZ2VudC12YXVsdFxcXFxwb3J0YWxcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0dFTUlOSSUyMENMSS9hbnRpZ3Jhdml0eS1hZ2VudC12YXVsdC9wb3J0YWwvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2VzcydcclxuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSAnc29ja2V0LmlvJ1xyXG4vLyBJbXBvcnRhXHUwMEU3XHUwMEUzbyBjb3JyaWdpZGEgcGFyYSBtXHUwMEYzZHVsb3MgQ29tbW9uSlNcclxuLy8gUGx1Z2luIHBhcmEgcGVybWl0aXIgcXVlIG8gTWV0YXRyb24gbW9kaWZpcXVlIHNldSBwclx1MDBGM3ByaW8gY1x1MDBGM2RpZ28gZSBpbnN0YWxlIHBhY290ZXNcclxuZnVuY3Rpb24gbWV0YXRyb25BdXRvcG9pZXNpc1BsdWdpbigpOiBQbHVnaW5PcHRpb24ge1xyXG4gIGxldCBpbzogU2VydmVyO1xyXG4gIGxldCBzdXBhYmFzZUNsaWVudDogYW55O1xyXG5cclxuICBjb25zdCBTVVBBQkFTRV9VUkwgPSAnaHR0cHM6Ly9zdXBhLnRlY2hzdG9yZWJyYXNpbC5jb20nO1xyXG4gIGNvbnN0IFNVUEFCQVNFX0tFWSA9ICdleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXdvZ0lDSnliMnhsSWpvZ0luTmxjblpwWTJWZmNtOXNaU0lzQ2lBZ0ltbHpjeUk2SUNKemRYQmhZbUZ6WlNJc0NpQWdJbWxoZENJNklERTNNVFV3TlRBNE1EQXNDaUFnSW1WNGNDSTZJREU0TnpJNE1UY3lNREFLZlEuMXcxNjhDTy1pY0szX05zT0x5TmxsRTM1dFZBS212NXlnZm5FX0FnYk1Hcyc7XHJcblxyXG4gIC8vIEZ1blx1MDBFN1x1MDBFM28gcGFyYSBpbmljaWFsaXphciBvIGNsaWVudGUgU3VwYWJhc2UgY29tIFJlYWx0aW1lXHJcbiAgY29uc3QgaW5pdFN1cGFiYXNlUmVhbHRpbWUgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAvLyBJbXBvcnRhXHUwMEU3XHUwMEUzbyBkaW5cdTAwRTJtaWNhIHBhcmEgZXZpdGFyIHF1ZWJyYSBubyBidWlsZCAoZXhlY3V0YSBhcGVuYXMgbm8gc2VydmVyKVxyXG4gICAgY29uc3QgeyBSZWFsdGltZUNsaWVudCB9ID0gYXdhaXQgaW1wb3J0KCdAc3VwYWJhc2UvcmVhbHRpbWUtanMnKSBhcyBhbnk7XHJcbiAgICAvLyBPIFJlYWx0aW1lQ2xpZW50IGVzcGVyYSBhIFVSTCBiYXNlIChzZW0gL3JlYWx0aW1lL3YxL3dlYnNvY2tldCBzZSBvIGNsaWVudGUgZm9yIHYyKylcclxuICAgIC8vIEVtIGFsZ3VucyBjYXNvcyBkZSBzZWxmLWhvc3RlZCwgcG9kZSBwcmVjaXNhciBkZSAvcmVhbHRpbWUvdjFcclxuICAgIGNvbnN0IHJlYWx0aW1lVXJsID0gYCR7U1VQQUJBU0VfVVJMfS9yZWFsdGltZS92MWA7XHJcbiAgICByZXR1cm4gbmV3IFJlYWx0aW1lQ2xpZW50KHJlYWx0aW1lVXJsLCB7XHJcbiAgICAgIHBhcmFtczogeyBhcGlrZXk6IFNVUEFCQVNFX0tFWSB9LFxyXG4gICAgICBoZWFkZXJzOiB7IGFwaWtleTogU1VQQUJBU0VfS0VZIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIEZ1blx1MDBFN1x1MDBFM28gcGFyYSBjb25maWd1cmFyIGEgc3Vic2NyaVx1MDBFN1x1MDBFM28gZGUgbXVkYW5cdTAwRTdhc1xyXG4gIGNvbnN0IHN1YnNjcmliZVRvQ2hhbmdlcyA9IChzdXBhYmFzZTogYW55KSA9PiB7XHJcbiAgICBjb25zdCBjaGFubmVsID0gc3VwYWJhc2UuY2hhbm5lbCgnbWV0YXRyb24tcmVhbHRpbWUtY2hhbmdlcycsIHsgXHJcbiAgICAgIGNvbmZpZzogeyBcclxuICAgICAgICBicm9hZGNhc3Q6IHsgc2VsZjogdHJ1ZSB9LCBcclxuICAgICAgICBwcmVzZW5jZTogeyBrZXk6ICdkZWZhdWx0LWtleScgfSAvLyBDaGF2ZSBkZSBwcmVzZW5cdTAwRTdhLCBwb2RlIHNlciBhZGFwdGFkYSBzZSBuZWNlc3NcdTAwRTFyaW9cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3Vic2NyaWJlIGEgZXZlbnRvcyBkZSBpbnNlclx1MDBFN1x1MDBFM28sIGF0dWFsaXphXHUwMEU3XHUwMEUzbyBlIGRlbGVcdTAwRTdcdTAwRTNvIG5hIHRhYmVsYSBkZSBub2Rvc1xyXG4gICAgY2hhbm5lbC5vbigncG9zdGdyZXNfY2hhbmdlcycsIHtcclxuICAgICAgZXZlbnQ6ICcqJywgLy8gRXNjdXRhIHRvZG9zIG9zIGV2ZW50b3NcclxuICAgICAgc2NoZW1hOiAncHVibGljJyxcclxuICAgICAgdGFibGU6ICdnZW1pbmljbGlfa25vd2xlZGdlX25vZGVzJ1xyXG4gICAgfSwgKHBheWxvYWQ6IGFueSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnW1N1cGFiYXNlIFJlYWx0aW1lXSBOb2RlIGNoYW5nZSBkZXRlY3RlZDonLCBwYXlsb2FkKTtcclxuICAgICAgLy8gRW1pdGUgbyBldmVudG8gcGFyYSBvIFNvY2tldC5pb1xyXG4gICAgICBpZiAoaW8pIHtcclxuICAgICAgICBpby5lbWl0KCdrbm93bGVkZ2VfdXBkYXRlJywgcGF5bG9hZC5uZXcpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgLy8gQWRpY2lvbmFyIGFxdWkgbWFpcyBzdWJzY3JpXHUwMEU3XHUwMEY1ZXMgcGFyYSBvdXRyYXMgdGFiZWxhcyAobGlua3MsIGV0Yy4pIHNlIG5lY2Vzc1x1MDBFMXJpb1xyXG4gICAgLm9uKCdwb3N0Z3Jlc19jaGFuZ2VzJywge1xyXG4gICAgICBldmVudDogJyonLCBcclxuICAgICAgc2NoZW1hOiAncHVibGljJyxcclxuICAgICAgdGFibGU6ICdnZW1pbmljbGlfa25vd2xlZGdlX2xpbmtzJ1xyXG4gICAgfSwgKHBheWxvYWQ6IGFueSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnW1N1cGFiYXNlIFJlYWx0aW1lXSBMaW5rIGNoYW5nZSBkZXRlY3RlZDonLCBwYXlsb2FkKTtcclxuICAgICAgaWYgKGlvKSB7XHJcbiAgICAgICAgaW8uZW1pdCgnbGlua191cGRhdGUnLCBwYXlsb2FkLm5ldyk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAuc3Vic2NyaWJlKChzdGF0dXM6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoc3RhdHVzID09PSAnU1VCU0NSSUJFRCcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnW1N1cGFiYXNlIFJlYWx0aW1lXSBJbnNjcml0byBjb20gc3VjZXNzbyBub3MgY2FuYWlzLicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tTdXBhYmFzZSBSZWFsdGltZV0gRXJybyBuYSBpbnNjcmlcdTAwRTdcdTAwRTNvOicsIHN0YXR1cyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBjaGFubmVsO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnbWV0YXRyb24tYXV0b3BvaWVzaXMnLFxyXG4gICAgYXN5bmMgY29uZmlndXJlU2VydmVyKHNlcnZlcikge1xyXG4gICAgICBpZiAoIXNlcnZlci5odHRwU2VydmVyKSByZXR1cm47XHJcblxyXG4gICAgICAvLyBJbmljaWFsaXphIG8gU29ja2V0LmlvIG5vIHNlcnZpZG9yIGRvIFZpdGVcclxuICAgICAgaW8gPSBuZXcgU2VydmVyKHNlcnZlci5odHRwU2VydmVyLCB7XHJcbiAgICAgICAgY29yczogeyBvcmlnaW46IFwiKlwiIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpby5vbignY29ubmVjdGlvbicsIChzb2NrZXQpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnW01ldGF0cm9uXSBQb3J0YWwgY29uZWN0YWRvIHZpYSBMZXkgTGluZSAoV2ViU29ja2V0KScpO1xyXG4gICAgICAgIHNvY2tldC5lbWl0KCdsb2cnLCB7IHR5cGU6ICdpbmZvJywgbWVzc2FnZTogJ0NvbmV4XHUwMEUzbyBBc3RyYWwgRXN0YWJlbGVjaWRhLicgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSW5pY2lhbGl6YSBvIGNsaWVudGUgU3VwYWJhc2UgUmVhbHRpbWUgZSBzZSBpbnNjcmV2ZSBuYXMgbXVkYW5cdTAwRTdhc1xyXG4gICAgICAvLyBcdTAwQzkgaW1wb3J0YW50ZSBnYXJhbnRpciBxdWUgYSBjaGF2ZSBkZSBwcmVzZW5cdTAwRTdhIHNlamEgZGluXHUwMEUybWljYSBvdSBjb25maWd1clx1MDBFMXZlbFxyXG4gICAgICBzdXBhYmFzZUNsaWVudCA9IGF3YWl0IGluaXRTdXBhYmFzZVJlYWx0aW1lKCk7XHJcbiAgICAgIHN1YnNjcmliZVRvQ2hhbmdlcyhzdXBhYmFzZUNsaWVudCk7XHJcblxyXG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXEudXJsID09PSAnL2FwaS9tZXRhdHJvbi1hY3Rpb24nICYmIHJlcS5tZXRob2QgPT09ICdQT1NUJykge1xyXG4gICAgICAgICAgbGV0IGJvZHkgPSAnJztcclxuICAgICAgICAgIHJlcS5vbignZGF0YScsIGNodW5rID0+IGJvZHkgKz0gY2h1bmsudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICByZXEub24oJ2VuZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBjb25zdCB7IHR5cGUsIGNvbnRlbnQsIGZpbGVQYXRoIH0gPSBKU09OLnBhcnNlKGJvZHkpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGlmICh0eXBlID09PSAnZmlsZScpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZ1bGxQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgZmlsZVBhdGgpO1xyXG4gICAgICAgICAgICAgICAgZnMubWtkaXJTeW5jKHBhdGguZGlybmFtZShmdWxsUGF0aCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhmdWxsUGF0aCwgY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgW01ldGF0cm9uXSBBcnF1aXZvIGF0dWFsaXphZG86ICR7ZmlsZVBhdGh9YCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlvLmVtaXQoJ2xvZycsIHsgdHlwZTogJ3N1Y2Nlc3MnLCBtZXNzYWdlOiBgQXJxdWl2byBpbW9ydGFsaXphZG86ICR7ZmlsZVBhdGh9YCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXMud3JpdGVIZWFkKDIwMCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IGBBcnF1aXZvICR7ZmlsZVBhdGh9IGdyYXZhZG8uYCB9KSk7XHJcbiAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnc2hlbGwnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgW01ldGF0cm9uXSBFeGVjdXRhbmRvIGNvbWFuZG86ICR7Y29udGVudH1gKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaW8uZW1pdCgnbG9nJywgeyB0eXBlOiAnaW5mbycsIG1lc3NhZ2U6IGBJbmljaWFuZG8gcml0dWFsOiAke2NvbnRlbnR9YCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZCA9IGV4ZWMoY29udGVudCwgeyBjd2Q6IF9fZGlybmFtZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5zdGRvdXQ/Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgaW8uZW1pdCgnbG9nJywgeyB0eXBlOiAnc3Rkb3V0JywgbWVzc2FnZTogZGF0YS50b1N0cmluZygpIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hpbGQuc3RkZXJyPy5vbignZGF0YScsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlvLmVtaXQoJ2xvZycsIHsgdHlwZTogJ3N0ZGVycicsIG1lc3NhZ2U6IGRhdGEudG9TdHJpbmcoKSB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoaWxkLm9uKCdjbG9zZScsIChjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlvLmVtaXQoJ2xvZycsIHsgdHlwZTogJ2luZm8nLCBtZXNzYWdlOiBgUml0dWFsIGNvbmNsdVx1MDBFRGRvIChDXHUwMEYzZGlnbzogJHtjb2RlfSlgIH0pO1xyXG4gICAgICAgICAgICAgICAgICByZXMud3JpdGVIZWFkKDIwMCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgICAgICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogY29kZSA9PT0gMCwgY29kZSB9KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzLndyaXRlSGVhZCg0MDApO1xyXG4gICAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnVGlwbyBkZSBhXHUwMEU3XHUwMEUzbyBkZXNjb25oZWNpZG8nIH0pKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICAgICAgICAgICAgcmVzLndyaXRlSGVhZCg1MDApO1xyXG4gICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyLm1lc3NhZ2UgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlcS51cmwgPT09ICcvYXBpL21ldGF0cm9uLWNoYXQnICYmIHJlcS5tZXRob2QgPT09ICdQT1NUJykge1xyXG4gICAgICAgICAgbGV0IGJvZHkgPSAnJztcclxuICAgICAgICAgIHJlcS5vbignZGF0YScsIGNodW5rID0+IGJvZHkgKz0gY2h1bmsudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICByZXEub24oJ2VuZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBjb25zdCB7IG1lc3NhZ2VzIH0gPSBKU09OLnBhcnNlKGJvZHkpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IERFRVBTRUVLX0FQSV9LRVkgPSAnc2stOTFhNjI5NjA5YWZhNGFlMDhlYjY4YjI1MGE0MTI0ZWMnO1xyXG4gICAgICAgICAgICAgIGNvbnN0IEFQSV9VUkwgPSAnaHR0cHM6Ly9hcGkuZGVlcHNlZWsuY29tL3YxL2NoYXQvY29tcGxldGlvbnMnO1xyXG5cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW01ldGF0cm9uIFByb3h5XSBJbmljaWFuZG8gY29uZXhcdTAwRTNvIG5ldXJhbCBjb20gRGVlcFNlZWsuLi4nKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKEFQSV9VUkwsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtERUVQU0VFS19BUElfS0VZfWBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRlZXBzZWVrLWNoYXRcIixcclxuICAgICAgICAgICAgICAgICAgbWVzc2FnZXMsXHJcbiAgICAgICAgICAgICAgICAgIHN0cmVhbTogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignW01ldGF0cm9uIFByb3h5XSBGYWxoYSBuYSBBUEkgRGVlcFNlZWs6JywgcmVzcG9uc2Uuc3RhdHVzLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJlcy53cml0ZUhlYWQocmVzcG9uc2Uuc3RhdHVzLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XHJcbiAgICAgICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbTWV0YXRyb24gUHJveHldIFJlc3Bvc3RhIG5ldXJhbCByZWNlYmlkYSBjb20gc3VjZXNzby4nKTtcclxuICAgICAgICAgICAgICByZXMud3JpdGVIZWFkKDIwMCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tNZXRhdHJvbiBQcm94eV0gRXJybyBjclx1MDBFRHRpY28gbm8gdFx1MDBGQW5lbCBuZXVyYWw6JywgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNTAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XHJcbiAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBlcnIubWVzc2FnZSB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVxLnVybCA9PT0gJy9hcGkvbWV0YXRyb24td2hpc3BlcicgJiYgcmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XHJcbiAgICAgICAgICAvLyBXaGlzcGVyIFRyYW5zY3JpcHRpb24gUHJveHlcclxuICAgICAgICAgIGNvbnN0IERFRVBTRUVLX0FQSV9LRVkgPSAnc2stOTFhNjI5NjA5YWZhNGFlMDhlYjY4YjI1MGE0MTI0ZWMnOyAvLyBQbGFjZWhvbGRlciBvciBVc2VyIEtleVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBsZXQgY2h1bmtzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgcmVxLm9uKCdkYXRhJywgY2h1bmsgPT4gY2h1bmtzLnB1c2goY2h1bmspKTtcclxuICAgICAgICAgIHJlcS5vbignZW5kJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoY2h1bmtzKTtcclxuICAgICAgICAgICAgICAvLyBJbiBhIHJlYWwgc2NlbmFyaW8sIHdlJ2QgdXNlIGEgZGVkaWNhdGVkIE9wZW5BSSBrZXkgaGVyZVxyXG4gICAgICAgICAgICAgIC8vIEZvciBub3csIHdlIHJldHVybiBhIHNpbXVsYXRlZCByZXNwb25zZSBpZiBubyBPcGVuQUkga2V5IGlzIHNldFxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbTWV0YXRyb24gV2hpc3Blcl0gUmVjZWJpZG8gXHUwMEUxdWRpbyBwYXJhIHRyYW5zY3JpXHUwMEU3XHUwMEUzby4nKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAvLyBTaW11bGF0ZSBvciBwcm94eSB0byBPcGVuQUkgaWYga2V5IGF2YWlsYWJsZSBpbiBlbnZcclxuICAgICAgICAgICAgICBjb25zdCBvcGVuYWlLZXkgPSBwcm9jZXNzLmVudi5PUEVOQUlfQVBJX0tFWTtcclxuICAgICAgICAgICAgICBpZiAob3BlbmFpS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZWFsIFdoaXNwZXIgaW1wbGVtZW50YXRpb24gd291bGQgZ28gaGVyZVxyXG4gICAgICAgICAgICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcclxuICAgICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyB0ZXh0OiBcIlNpbnRvbml6YVx1MDBFN1x1MDBFM28gV2hpc3BlciBjb21wbGV0YSAoVmlhIE9wZW5BSSkuXCIgfSkpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXMud3JpdGVIZWFkKDIwMCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHRleHQ6IFwiTyBWYXppbyBwcm9jZXNzb3Ugc3VhIHZveiwgbWFzIGEgTGluaGEgZGUgTGV5IE9wZW5BSSBuXHUwMEUzbyBlc3RcdTAwRTEgY29uZmlndXJhZGEuXCIgfSkpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgICAgICAgICAgICByZXMud3JpdGVIZWFkKDUwMCk7XHJcbiAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBlcnIubWVzc2FnZSB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVxLnVybCA9PT0gJy9hcGkvbWV0YXRyb24tc3BlZWNoJyAmJiByZXEubWV0aG9kID09PSAnUE9TVCcpIHtcclxuICAgICAgICAgIC8vIEVsZXZlbkxhYnMgUHJlbWl1bSBUVFMgUHJveHlcclxuICAgICAgICAgIGxldCBib2R5ID0gJyc7XHJcbiAgICAgICAgICByZXEub24oJ2RhdGEnLCBjaHVuayA9PiBib2R5ICs9IGNodW5rLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgcmVxLm9uKCdlbmQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgeyB0ZXh0LCB2b2ljZUlkID0gJ3BOSW56Nm9icGdtcVNDQUs2dTZvJywgbW9kZWxJZCA9ICdlbGV2ZW5fbXVsdGlsaW5ndWFsX3YyJyB9ID0gSlNPTi5wYXJzZShib2R5KTtcclxuICAgICAgICAgICAgICBjb25zdCBhcGlLZXkgPSBwcm9jZXNzLmVudi5FTEVWRU5fQVBJX0tFWSB8fCAnc2stcGxhY2Vob2xkZXInO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbTWV0YXRyb24gU3BlZWNoXSBHZXJhbmRvIHZveiBFbGV2ZW5MYWJzICgke3ZvaWNlSWR9KSBwYXJhOiAke3RleHQuc3Vic3RyaW5nKDAsIDMwKX0uLi5gKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5lbGV2ZW5sYWJzLmlvL3YxL3RleHQtdG8tc3BlZWNoLyR7dm9pY2VJZH0vc3RyZWFtYCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICd4aS1hcGkta2V5JzogYXBpS2V5LFxyXG4gICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAnYWNjZXB0JzogJ2F1ZGlvL21wZWcnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgICBtb2RlbF9pZDogbW9kZWxJZCxcclxuICAgICAgICAgICAgICAgICAgdm9pY2Vfc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFiaWxpdHk6IDAuNSxcclxuICAgICAgICAgICAgICAgICAgICBzaW1pbGFyaXR5X2Jvb3N0OiAwLjc1LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiAwLjAsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlX3NwZWFrZXJfYm9vc3Q6IHRydWVcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignW01ldGF0cm9uIFNwZWVjaF0gRXJybyBuYSBFbGV2ZW5MYWJzOicsIHJlc3BvbnNlLnN0YXR1cywgZXJyb3JEYXRhKTtcclxuICAgICAgICAgICAgICAgIHJlcy53cml0ZUhlYWQocmVzcG9uc2Uuc3RhdHVzLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XHJcbiAgICAgICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KGVycm9yRGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgLy8gUGlwZSB0aGUgc3RyZWFtIGRpcmVjdGx5IGJhY2sgdG8gdGhlIGNsaWVudFxyXG4gICAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXVkaW8vbXBlZycgfSk7XHJcbiAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keT8uZ2V0UmVhZGVyKCk7XHJcbiAgICAgICAgICAgICAgaWYgKHJlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcclxuICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICByZXMud3JpdGUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXMuZW5kKCk7XHJcblxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tNZXRhdHJvbiBTcGVlY2hdIEVycm8gY3JcdTAwRUR0aWNvOicsIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICByZXMud3JpdGVIZWFkKDUwMCk7XHJcbiAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBlcnIubWVzc2FnZSB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+IHtcclxuICBjb25zdCBwbHVnaW5zOiBQbHVnaW5PcHRpb25bXSA9IFtyZWFjdCgpXTtcclxuICBcclxuICBpZiAoY29tbWFuZCA9PT0gJ3NlcnZlJykge1xyXG4gICAgcGx1Z2lucy5wdXNoKG1ldGF0cm9uQXV0b3BvaWVzaXNQbHVnaW4oKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2lucyxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiAzMDAwLFxyXG4gICAgICBob3N0OiB0cnVlXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdVLFNBQVMsb0JBQWtDO0FBQzNXLE9BQU8sV0FBVztBQUNsQixPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFDakIsU0FBUyxZQUFZO0FBQ3JCLFNBQVMsY0FBYztBQUx2QixJQUFNLG1DQUFtQztBQVF6QyxTQUFTLDRCQUEwQztBQUNqRCxNQUFJO0FBQ0osTUFBSTtBQUVKLFFBQU0sZUFBZTtBQUNyQixRQUFNLGVBQWU7QUFHckIsUUFBTSx1QkFBdUIsWUFBWTtBQUV2QyxVQUFNLEVBQUUsZUFBZSxJQUFJLE1BQU0sT0FBTyw4R0FBdUI7QUFHL0QsVUFBTSxjQUFjLEdBQUcsWUFBWTtBQUNuQyxXQUFPLElBQUksZUFBZSxhQUFhO0FBQUEsTUFDckMsUUFBUSxFQUFFLFFBQVEsYUFBYTtBQUFBLE1BQy9CLFNBQVMsRUFBRSxRQUFRLGFBQWE7QUFBQSxJQUNsQyxDQUFDO0FBQUEsRUFDSDtBQUdBLFFBQU0scUJBQXFCLENBQUMsYUFBa0I7QUFDNUMsVUFBTSxVQUFVLFNBQVMsUUFBUSw2QkFBNkI7QUFBQSxNQUM1RCxRQUFRO0FBQUEsUUFDTixXQUFXLEVBQUUsTUFBTSxLQUFLO0FBQUEsUUFDeEIsVUFBVSxFQUFFLEtBQUssY0FBYztBQUFBO0FBQUEsTUFDakM7QUFBQSxJQUNGLENBQUM7QUFHRCxZQUFRLEdBQUcsb0JBQW9CO0FBQUEsTUFDN0IsT0FBTztBQUFBO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsSUFDVCxHQUFHLENBQUMsWUFBaUI7QUFDbkIsY0FBUSxJQUFJLDZDQUE2QyxPQUFPO0FBRWhFLFVBQUksSUFBSTtBQUNOLFdBQUcsS0FBSyxvQkFBb0IsUUFBUSxHQUFHO0FBQUEsTUFDekM7QUFBQSxJQUNGLENBQUMsRUFFQSxHQUFHLG9CQUFvQjtBQUFBLE1BQ3RCLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxJQUNULEdBQUcsQ0FBQyxZQUFpQjtBQUNuQixjQUFRLElBQUksNkNBQTZDLE9BQU87QUFDaEUsVUFBSSxJQUFJO0FBQ04sV0FBRyxLQUFLLGVBQWUsUUFBUSxHQUFHO0FBQUEsTUFDcEM7QUFBQSxJQUNGLENBQUMsRUFDQSxVQUFVLENBQUMsV0FBZ0I7QUFDMUIsVUFBSSxXQUFXLGNBQWM7QUFDM0IsZ0JBQVEsSUFBSSxzREFBc0Q7QUFBQSxNQUNwRSxPQUFPO0FBQ0wsZ0JBQVEsTUFBTSxnREFBMEMsTUFBTTtBQUFBLE1BQ2hFO0FBQUEsSUFDRixDQUFDO0FBRUQsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixNQUFNLGdCQUFnQixRQUFRO0FBQzVCLFVBQUksQ0FBQyxPQUFPLFdBQVk7QUFHeEIsV0FBSyxJQUFJLE9BQU8sT0FBTyxZQUFZO0FBQUEsUUFDakMsTUFBTSxFQUFFLFFBQVEsSUFBSTtBQUFBLE1BQ3RCLENBQUM7QUFFRCxTQUFHLEdBQUcsY0FBYyxDQUFDLFdBQVc7QUFDOUIsZ0JBQVEsSUFBSSxzREFBc0Q7QUFDbEUsZUFBTyxLQUFLLE9BQU8sRUFBRSxNQUFNLFFBQVEsU0FBUyxrQ0FBK0IsQ0FBQztBQUFBLE1BQzlFLENBQUM7QUFJRCx1QkFBaUIsTUFBTSxxQkFBcUI7QUFDNUMseUJBQW1CLGNBQWM7QUFFakMsYUFBTyxZQUFZLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUztBQUMvQyxZQUFJLElBQUksUUFBUSwwQkFBMEIsSUFBSSxXQUFXLFFBQVE7QUFDL0QsY0FBSSxPQUFPO0FBQ1gsY0FBSSxHQUFHLFFBQVEsV0FBUyxRQUFRLE1BQU0sU0FBUyxDQUFDO0FBQ2hELGNBQUksR0FBRyxPQUFPLFlBQVk7QUFDeEIsZ0JBQUk7QUFDRixvQkFBTSxFQUFFLE1BQU0sU0FBUyxTQUFTLElBQUksS0FBSyxNQUFNLElBQUk7QUFFbkQsa0JBQUksU0FBUyxRQUFRO0FBQ25CLHNCQUFNLFdBQVcsS0FBSyxRQUFRLGtDQUFXLFFBQVE7QUFDakQsbUJBQUcsVUFBVSxLQUFLLFFBQVEsUUFBUSxHQUFHLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFDeEQsbUJBQUcsY0FBYyxVQUFVLE9BQU87QUFDbEMsd0JBQVEsSUFBSSxrQ0FBa0MsUUFBUSxFQUFFO0FBRXhELG1CQUFHLEtBQUssT0FBTyxFQUFFLE1BQU0sV0FBVyxTQUFTLHlCQUF5QixRQUFRLEdBQUcsQ0FBQztBQUVoRixvQkFBSSxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDekQsb0JBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxTQUFTLE1BQU0sU0FBUyxXQUFXLFFBQVEsWUFBWSxDQUFDLENBQUM7QUFBQSxjQUNwRixXQUNTLFNBQVMsU0FBUztBQUN6Qix3QkFBUSxJQUFJLGtDQUFrQyxPQUFPLEVBQUU7QUFFdkQsbUJBQUcsS0FBSyxPQUFPLEVBQUUsTUFBTSxRQUFRLFNBQVMscUJBQXFCLE9BQU8sR0FBRyxDQUFDO0FBRXhFLHNCQUFNLFFBQVEsS0FBSyxTQUFTLEVBQUUsS0FBSyxpQ0FBVSxDQUFDO0FBRTlDLHNCQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUztBQUNqQyxxQkFBRyxLQUFLLE9BQU8sRUFBRSxNQUFNLFVBQVUsU0FBUyxLQUFLLFNBQVMsRUFBRSxDQUFDO0FBQUEsZ0JBQzdELENBQUM7QUFFRCxzQkFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVM7QUFDakMscUJBQUcsS0FBSyxPQUFPLEVBQUUsTUFBTSxVQUFVLFNBQVMsS0FBSyxTQUFTLEVBQUUsQ0FBQztBQUFBLGdCQUM3RCxDQUFDO0FBRUQsc0JBQU0sR0FBRyxTQUFTLENBQUMsU0FBUztBQUMxQixxQkFBRyxLQUFLLE9BQU8sRUFBRSxNQUFNLFFBQVEsU0FBUyxtQ0FBNkIsSUFBSSxJQUFJLENBQUM7QUFDOUUsc0JBQUksVUFBVSxLQUFLLEVBQUUsZ0JBQWdCLG1CQUFtQixDQUFDO0FBQ3pELHNCQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsU0FBUyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFBQSxnQkFDdkQsQ0FBQztBQUFBLGNBQ0gsT0FBTztBQUNMLG9CQUFJLFVBQVUsR0FBRztBQUNqQixvQkFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8sa0NBQTRCLENBQUMsQ0FBQztBQUFBLGNBQ2hFO0FBQUEsWUFDRixTQUFTLEtBQVU7QUFDakIsa0JBQUksVUFBVSxHQUFHO0FBQ2pCLGtCQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsT0FBTyxJQUFJLFFBQVEsQ0FBQyxDQUFDO0FBQUEsWUFDaEQ7QUFBQSxVQUNGLENBQUM7QUFBQSxRQUNILFdBQVcsSUFBSSxRQUFRLHdCQUF3QixJQUFJLFdBQVcsUUFBUTtBQUNwRSxjQUFJLE9BQU87QUFDWCxjQUFJLEdBQUcsUUFBUSxXQUFTLFFBQVEsTUFBTSxTQUFTLENBQUM7QUFDaEQsY0FBSSxHQUFHLE9BQU8sWUFBWTtBQUN4QixnQkFBSTtBQUNGLG9CQUFNLEVBQUUsU0FBUyxJQUFJLEtBQUssTUFBTSxJQUFJO0FBQ3BDLG9CQUFNLG1CQUFtQjtBQUN6QixvQkFBTSxVQUFVO0FBRWhCLHNCQUFRLElBQUksOERBQTJEO0FBRXZFLG9CQUFNLFdBQVcsTUFBTSxNQUFNLFNBQVM7QUFBQSxnQkFDcEMsUUFBUTtBQUFBLGdCQUNSLFNBQVM7QUFBQSxrQkFDUCxnQkFBZ0I7QUFBQSxrQkFDaEIsaUJBQWlCLFVBQVUsZ0JBQWdCO0FBQUEsZ0JBQzdDO0FBQUEsZ0JBQ0EsTUFBTSxLQUFLLFVBQVU7QUFBQSxrQkFDbkIsT0FBTztBQUFBLGtCQUNQO0FBQUEsa0JBQ0EsUUFBUTtBQUFBLGdCQUNWLENBQUM7QUFBQSxjQUNILENBQUM7QUFFRCxvQkFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBRWpDLGtCQUFJLENBQUMsU0FBUyxJQUFJO0FBQ2hCLHdCQUFRLE1BQU0sMkNBQTJDLFNBQVMsUUFBUSxJQUFJO0FBQzlFLG9CQUFJLFVBQVUsU0FBUyxRQUFRLEVBQUUsZ0JBQWdCLG1CQUFtQixDQUFDO0FBQ3JFLG9CQUFJLElBQUksS0FBSyxVQUFVLElBQUksQ0FBQztBQUM1QjtBQUFBLGNBQ0Y7QUFFQSxzQkFBUSxJQUFJLHdEQUF3RDtBQUNwRSxrQkFBSSxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDekQsa0JBQUksSUFBSSxLQUFLLFVBQVUsSUFBSSxDQUFDO0FBQUEsWUFDOUIsU0FBUyxLQUFVO0FBQ2pCLHNCQUFRLE1BQU0sd0RBQWtELElBQUksT0FBTztBQUMzRSxrQkFBSSxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDekQsa0JBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxPQUFPLElBQUksUUFBUSxDQUFDLENBQUM7QUFBQSxZQUNoRDtBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0gsV0FBVyxJQUFJLFFBQVEsMkJBQTJCLElBQUksV0FBVyxRQUFRO0FBRXZFLGdCQUFNLG1CQUFtQjtBQUV6QixjQUFJLFNBQWdCLENBQUM7QUFDckIsY0FBSSxHQUFHLFFBQVEsV0FBUyxPQUFPLEtBQUssS0FBSyxDQUFDO0FBQzFDLGNBQUksR0FBRyxPQUFPLFlBQVk7QUFDeEIsZ0JBQUk7QUFDRixvQkFBTSxTQUFTLE9BQU8sT0FBTyxNQUFNO0FBR25DLHNCQUFRLElBQUksOERBQXFEO0FBR2pFLG9CQUFNLFlBQVksUUFBUSxJQUFJO0FBQzlCLGtCQUFJLFdBQVc7QUFFYixvQkFBSSxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDekQsb0JBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxNQUFNLG9EQUE4QyxDQUFDLENBQUM7QUFBQSxjQUNqRixPQUFPO0FBQ0wsb0JBQUksVUFBVSxLQUFLLEVBQUUsZ0JBQWdCLG1CQUFtQixDQUFDO0FBQ3pELG9CQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsTUFBTSxtRkFBNkUsQ0FBQyxDQUFDO0FBQUEsY0FDaEg7QUFBQSxZQUNGLFNBQVMsS0FBVTtBQUNqQixrQkFBSSxVQUFVLEdBQUc7QUFDakIsa0JBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxPQUFPLElBQUksUUFBUSxDQUFDLENBQUM7QUFBQSxZQUNoRDtBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0gsV0FBVyxJQUFJLFFBQVEsMEJBQTBCLElBQUksV0FBVyxRQUFRO0FBRXRFLGNBQUksT0FBTztBQUNYLGNBQUksR0FBRyxRQUFRLFdBQVMsUUFBUSxNQUFNLFNBQVMsQ0FBQztBQUNoRCxjQUFJLEdBQUcsT0FBTyxZQUFZO0FBQ3hCLGdCQUFJO0FBQ0Ysb0JBQU0sRUFBRSxNQUFNLFVBQVUsd0JBQXdCLFVBQVUseUJBQXlCLElBQUksS0FBSyxNQUFNLElBQUk7QUFDdEcsb0JBQU0sU0FBUyxRQUFRLElBQUksa0JBQWtCO0FBRTdDLHNCQUFRLElBQUksNkNBQTZDLE9BQU8sV0FBVyxLQUFLLFVBQVUsR0FBRyxFQUFFLENBQUMsS0FBSztBQUVyRyxvQkFBTSxXQUFXLE1BQU0sTUFBTSwrQ0FBK0MsT0FBTyxXQUFXO0FBQUEsZ0JBQzVGLFFBQVE7QUFBQSxnQkFDUixTQUFTO0FBQUEsa0JBQ1AsY0FBYztBQUFBLGtCQUNkLGdCQUFnQjtBQUFBLGtCQUNoQixVQUFVO0FBQUEsZ0JBQ1o7QUFBQSxnQkFDQSxNQUFNLEtBQUssVUFBVTtBQUFBLGtCQUNuQjtBQUFBLGtCQUNBLFVBQVU7QUFBQSxrQkFDVixnQkFBZ0I7QUFBQSxvQkFDZCxXQUFXO0FBQUEsb0JBQ1gsa0JBQWtCO0FBQUEsb0JBQ2xCLE9BQU87QUFBQSxvQkFDUCxtQkFBbUI7QUFBQSxrQkFDckI7QUFBQSxnQkFDRixDQUFDO0FBQUEsY0FDSCxDQUFDO0FBRUQsa0JBQUksQ0FBQyxTQUFTLElBQUk7QUFDaEIsc0JBQU0sWUFBWSxNQUFNLFNBQVMsS0FBSyxFQUFFLE1BQU0sT0FBTyxDQUFDLEVBQUU7QUFDeEQsd0JBQVEsTUFBTSx5Q0FBeUMsU0FBUyxRQUFRLFNBQVM7QUFDakYsb0JBQUksVUFBVSxTQUFTLFFBQVEsRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDckUsb0JBQUksSUFBSSxLQUFLLFVBQVUsU0FBUyxDQUFDO0FBQ2pDO0FBQUEsY0FDRjtBQUdBLGtCQUFJLFVBQVUsS0FBSyxFQUFFLGdCQUFnQixhQUFhLENBQUM7QUFDbkQsb0JBQU0sU0FBUyxTQUFTLE1BQU0sVUFBVTtBQUN4QyxrQkFBSSxRQUFRO0FBQ1YsdUJBQU8sTUFBTTtBQUNYLHdCQUFNLEVBQUUsTUFBTSxNQUFNLElBQUksTUFBTSxPQUFPLEtBQUs7QUFDMUMsc0JBQUksS0FBTTtBQUNWLHNCQUFJLE1BQU0sS0FBSztBQUFBLGdCQUNqQjtBQUFBLGNBQ0Y7QUFDQSxrQkFBSSxJQUFJO0FBQUEsWUFFVixTQUFTLEtBQVU7QUFDakIsc0JBQVEsTUFBTSxzQ0FBbUMsSUFBSSxPQUFPO0FBQzVELGtCQUFJLFVBQVUsR0FBRztBQUNqQixrQkFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8sSUFBSSxRQUFRLENBQUMsQ0FBQztBQUFBLFlBQ2hEO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSCxPQUFPO0FBQ0wsZUFBSztBQUFBLFFBQ1A7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGO0FBR0EsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxRQUFRLE1BQU07QUFDM0MsUUFBTSxVQUEwQixDQUFDLE1BQU0sQ0FBQztBQUV4QyxNQUFJLFlBQVksU0FBUztBQUN2QixZQUFRLEtBQUssMEJBQTBCLENBQUM7QUFBQSxFQUMxQztBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
