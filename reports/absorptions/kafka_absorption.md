# Apache Kafka Absorption Report

## Overview
- **Repository:** https://github.com/apache/kafka.git
- **Purpose:** Apache Kafka is an open-source distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications. It acts as a distributed commit log.

## Arquitetura
**Plataforma de Event Streaming Distribuída (Java/Scala)**
Kafka é desenhado para durabilidade, alta taxa de transferência (throughput) e escalabilidade horizontal.
1. **Brokers (`core/src/main/scala/kafka/server`):** Os nós que armazenam os dados. Originalmente gerenciados via ZooKeeper, agora utilizam o protocolo de consenso próprio **KRaft** (`raft` directory) para gerenciamento de metadados, removendo a dependência externa.
2. **Produtores e Consumidores (`clients/`):** Clientes oficiais em Java para publicar (append) e ler eventos (consumir offsets) dos tópicos.
3. **Kafka Streams (`streams/`):** Biblioteca robusta para processamento de streams em tempo real (agregação, joins, janelas) que roda nativamente na aplicação cliente.
4. **Kafka Connect (`connect/`):** Framework para integrar Kafka com outros sistemas (bancos de dados, key-value stores, sistemas de arquivos) via conectores de Source e Sink.
5. **Storage Engine (`storage/` & `core/src/main/scala/kafka/log`):** Os dados são armazenados como arquivos de log append-only segmentados no disco. Kafka delega fortemente para o cache de página do SO (Page Cache) para performance absurda em leitura/escrita.

## Fluxo de Dados
1. **Publicação (Producer):** O cliente envia batches de registros para um Tópico (Topic). O tópico é particionado (Partitions). O produtor decide para qual partição enviar (hash da chave ou round-robin).
2. **Armazenamento (Broker):** O Broker líder daquela partição recebe o batch e escreve diretamente no arquivo de log sequencial no disco (usando zero-copy/`sendfile` quando possível).
3. **Replicação:** Brokers seguidores copiam os logs do Broker líder (In-Sync Replicas - ISR) para garantir tolerância a falhas.
4. **Consumo (Consumer):** O cliente pede dados de um offset específico. O Broker lê do disco (ou do Page Cache) e envia pela rede. Consumidores são organizados em Consumer Groups para escalabilidade e balanceamento de carga de leitura.

## Pontos de Extensão
* **Kafka Connect APIs:** A principal forma de estender o Kafka para ingestão ou exportação de dados sem escrever código produtor/consumidor manual.
* **Interceptor APIs (`ProducerInterceptor`, `ConsumerInterceptor`):** Permitem interceptar (e possivelmente mutar) mensagens antes de serem publicadas ou consumidas, muito usado para tracing (ex: OpenTelemetry) e auditoria.
* **Pluggable Authorizer:** Permite substituir a lógica padrão de controle de acesso (ACLs) do Kafka por sistemas customizados de autorização da empresa (ex: OPA, LDAP integrado).
* **Tiered Storage:** Recurso recente que permite descarregar segmentos de log antigos para armazenamento objeto mais barato (como S3) de forma transparente.

## Gargalos/Riscos
* **Dependência Extrema de I/O de Disco e Rede:** O desempenho do Kafka é diretamente limitado pela velocidade do disco subjacente e da rede. Se o Page Cache for suplantado ou o disco for muito lento, a latência de consumo aumenta consideravelmente.
* **Rebalanceamento de Consumer Groups (Rebalancing):** Quando novos consumidores entram ou saem de um grupo, o Kafka tradicionalmente parava o processamento ("stop-the-world") para redistribuir as partições. O protocolo cooperativo mitigou isso, mas ainda é um ponto crítico de instabilidade em deployments mal configurados.
* **Explosão de Partições:** Ter milhares de tópicos com dezenas de partições em um único cluster pode esgotar limites de arquivos abertos, descritores de rede e memória do broker (embora a migração para KRaft tenha melhorado massivamente o limite de metadados em comparação ao ZooKeeper).
* **Operação Complexa:** Diferente do NATS ou Redis, gerenciar um cluster Kafka em produção exige tunning fino de dezenas de propriedades do JVM e do SO, gerenciamento de certificados TLS e monitoramento constante de In-Sync Replicas e lags de consumo.
