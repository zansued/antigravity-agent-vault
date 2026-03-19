// Componente que:
    // 1. Carrega a definição dos estágios de um arquivo de configuração (ex: pipeline-stages.json)
    // 2. Renderiza um DAG (grafo acíclico dirigido) vertical, com cada estágio como um nó
    // 3. Cores dinâmicas: estágio pendente (cinza), em execução (azul), sucesso (verde), falha (vermelho)
    // 4. Ao clicar em um estágio, exibe:
    //    - Edge Function associada
    //    - Logs recentes
    //    - Botão para reexecutar (se aplicável)