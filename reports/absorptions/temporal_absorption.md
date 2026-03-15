# Temporal Absorption Report

## Overview
- **Repository:** https://github.com/temporalio/temporal.git
- **Purpose:** A durable execution platform for building scalable and reliable applications without sacrificing productivity. It orchestrates workflows that handle intermittent failures and retries automatically.

## Arquitetura
**Plataforma de Orquestração de Workflows (Go + gRPC + Protobuf)
Temporal é construído em Go e utiliza uma arquitetura de microserviços otimizada para alta performance e escalabilidade.

1.  **Temporal Server (`temporal/server`):** O núcleo do sistema. É um serviço distribuído que gerencia a execução de Workflows e Atividades. 
    *   Utiliza **gRPC** para comunicação interna e com os SDKs de cliente.
    *   Processa eventos de Workflow e executa a lógica de orquestração.
    *   Armazena o estado dos Workflows em um banco de dados de persistência (ex: Cassandra, PostgreSQL, MySQL, SQLite), delegando a lógica de armazenamento para `temporal/server/persistence`.
2.  **SDKs de Cliente (Ex: Go, Java, TypeScript - em `client/`):** Bibliotecas que os desenvolvedores usam para escrever Workflows e Atividades. Elas comunicam-se com o Temporal Server via gRPC.
3.  **Protobuf (`proto/`):** Define os contratos de comunicação entre o servidor e os clientes, garantindo a interoperabilidade.
4.  **Temporal CLI:** Ferramenta de linha de comando para gerenciar o servidor, Workflows, e operações do sistema.

## Fluxo de Dados
1.  **Definição de Workflow:** Um desenvolvedor escreve a lógica de um Workflow e suas Atividades usando um SDK (ex: Go, Java, TS).
2.  **Iniciação do Workflow:** O cliente (ex: um serviço de backend) envia uma requisição para iniciar um Workflow no Temporal Server via gRPC.
3.  **Execução do Workflow:** O Temporal Server agenda e orquestra a execução das Atividades do Workflow. Ele mantém o estado durável do Workflow, lidando com retries, timeouts e falhas.
4.  **Execução de Atividade:** Quando uma Atividade precisa ser executada, o Temporal Server envia um comando para um Worker (que pode ser o próprio aplicativo do desenvolvedor) via gRPC.
5.  **Resultado da Atividade:** O Worker executa a lógica da Atividade e retorna o resultado para o Temporal Server.
6.  **Persistência:** O Temporal Server registra o resultado da Atividade e o próximo estado do Workflow no banco de dados de persistência.
7.  **Conclusão do Workflow:** O Temporal Server notifica o cliente iniciador quando o Workflow é concluído ou falha.

## Pontos de Extensão
*   **Customização de Workers:** Desenvolver Workers em qualquer linguagem suportada para executar a lógica de negócio.
*   **Plugins de Persistência:** Integrar diferentes bancos de dados para armazenar o estado do Workflow.
*   **Auth e RBAC:** O Temporal Server suporta integração com sistemas de autenticação e controle de acesso baseados em roles.
*   **SDKs Personalizados:** Criar SDKs para linguagens não suportadas oficialmente.

## Gargalos/Riscos
*   **Complexidade Operacional:** Gerenciar um cluster Temporal em produção pode ser complexo, exigindo monitoramento de latência, disponibilidade e throughput.
*   **Configuração de Persistência:** A escolha e a configuração do banco de dados de persistência são cruciais para a performance e a confiabilidade.
*   **Gerenciamento de Estado Durável:** Garantir que o estado do Workflow seja consistentemente persistido é fundamental para a resiliência.
*   **Overhead de Comunicação gRPC:** Embora eficiente, a comunicação gRPC entre servidor e workers introduz um pequeno overhead.
