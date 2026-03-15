"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("./config");
async function checkDatabase() {
    const supabase = (0, supabase_js_1.createClient)(config_1.SUPABASE_CONFIG.url, config_1.SUPABASE_CONFIG.key);
    const tableName = `${config_1.SUPABASE_CONFIG.tablePrefix}agent_events`;
    console.log(`🔍 Iniciando diagnóstico de conexão (TechStore Brasil)...`);
    console.log(`🌐 URL: ${config_1.SUPABASE_CONFIG.url}`);
    console.log(`📋 Tabela: ${tableName}\n`);
    try {
        // 1. Testa a conexão básica buscando as tabelas públicas (se permitido)
        const { data: tables, error: tableError } = await supabase
            .from(tableName)
            .select('count', { count: 'exact', head: true });
        if (tableError) {
            if (tableError.code === '42P01') {
                console.error(`❌ ERRO: A tabela '${tableName}' NÃO EXISTE no banco de dados.`);
                console.log(`👉 SOLUÇÃO: Você precisa executar o script 'setup.sql' no Editor SQL do seu painel Supabase.`);
            }
            else {
                console.error(`❌ ERRO DE CONEXÃO: [${tableError.code}] ${tableError.message}`);
            }
        }
        else {
            console.log(`✅ SUCESSO! A tabela '${tableName}' foi encontrada e está acessível.`);
            console.log(`📊 O banco já possui registros para esta tabela.`);
        }
        // 2. Tenta listar as tabelas do esquema para ver o que temos
        console.log(`\n--- Informações Adicionais ---`);
        const { data: list, error: listError } = await supabase.rpc('get_table_names'); // Opcional, se existir RPC
        if (listError) {
            console.log(`💡 Nota: Não foi possível listar todas as tabelas via RPC (comum em setups padrão).`);
        }
        else {
            console.log(`Tabelas encontradas:`, list);
        }
    }
    catch (error) {
        console.error(`💥 FALHA CRÍTICA:`, error.message);
    }
}
checkDatabase();
