# NATS Server Absorption Report

## Overview
- **Repository:** https://github.com/nats-io/nats-server.git
- **Purpose:** High-performance, secure, and distributed messaging system (Message Broker) written in Go. It forms the core of the NATS messaging ecosystem, supporting publish-subscribe, request-reply, and distributed persistence (JetStream).

## Arquitetura
**Sistema Distribuído Concorrente (Message Broker em Go)**
A arquitetura é extremamente otimizada para baixa latência e alta taxa de transferência. Componentes principais:
1. **Core NATS (`server/server.go`, `server/client.go`):** O coração do servidor, lidando com conexões TCP, analisando o protocolo (`parser.go`) e despachando mensagens rapidamente.
2. **Sistema de Roteamento (`server/route.go`, `server/sublist.go`):** Gerencia a tabela de assinaturas (sublist) usando estruturas eficientes em memória para rotear publicações para múltiplos assinantes com latência mínima.
3. **JetStream (`server/jetstream.go`):** Subsistema integrado responsável por armazenamento persistente de streams, semântica de entrega garantida e alta disponibilidade usando o algoritmo de consenso Raft (`server/raft.go`).
4. **Clustering & Gateways (`server/cluster.go`, `server/gateway.go`):** O NATS não apenas forma clusters dentro de uma rede, mas os gateways permitem conectar múltiplos clusters em diferentes regiões geográficas.

## Fluxo de Dados
1. **Entrada de Conexão:** Clientes se conectam via TCP, WebSocket (`websocket.go`), ou MQTT (`mqtt.go`).
2. **Processamento (`client.go`):** Cada conexão possui goroutines dedicadas para leitura (parse do protocolo zero-allocation) e escrita.
3. **Roteamento:** Quando uma mensagem `PUB` chega, o servidor consulta sua estrutura de `sublist` para encontrar todos os clientes interessados.
4. **Despacho:** As mensagens são colocadas em buffers no anel de rede de cada cliente conectado. Se o cliente for lento, ele é desconectado para proteger a integridade do servidor ("Slow Consumer").
5. **Persistência (Opcional):** Se JetStream estiver ativado para aquele "subject" (tópico), a mensagem é enviada ao subsistema JetStream, salva no disco/memória e o cluster Raft é coordenado para tolerância a falhas.

## Pontos de Extensão
* **Auth Callouts (`server/auth_callout.go`):** Delegação dinâmica da autenticação para serviços externos em vez de depender apenas de configurações estáticas ou JWTs.
* **Múltiplos Protocolos:** O suporte a WebSockets nativos e MQTT significa que dispositivos IoT ou navegadores podem se conectar diretamente ao NATS sem intermediários.
* **Transformação de Subjects (`server/subject_transform.go`):** Permite alterar o nome dos tópicos no momento do roteamento, útil para migrações de versão ou roteamento dinâmico transparente.

## Gargalos/Riscos
* **Consumidores Lentos (Slow Consumers):** Um cliente que não consegue ler dados rápido o suficiente pode causar estouro de buffer. O NATS lida com isso desconectando impiedosamente clientes lentos para proteger o Broker, mas isso significa que a aplicação cliente precisa lidar com reconexão e possível perda de dados (se não usar JetStream).
* **Contenção de Locks:** Sendo altamente concorrente, a estrutura principal `Server` e as estruturas `Client` usam intensivamente `sync.RWMutex`. Em condições de extremo estresse multicore, a contenção desses locks pode ser um gargalo de performance (mitigado por design otimizado sem lock no *fast path*).
* **Quorum Raft no JetStream:** Se o cluster perder a maioria de seus nós (`n/2 + 1`), as operações de stream persistente param para garantir a consistência (Teorema CAP, foca em Consistência no JetStream).
