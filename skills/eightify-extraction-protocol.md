# Skill: Eightify Extraction Protocol (YouTube Intelligence)

Protocolo avançado para extração de transcrições e metadados de vídeos do YouTube, baseado na engenharia reversa da extensão Eightify v1.643.

## Contexto
Use esta skill quando precisar de extração de alta precisão de legendas (manuais ou geradas) e metadados estruturados de vídeos do YouTube para fins de sumarização ou análise via IA.

## Procedimento Técnico

### 1. Descoberta de Captions (Protocolo `Q`)
Extrair o objeto `playerCaptionsTracklistRenderer` do código-fonte da página ou do objeto `ytInitialPlayerResponse`.
- **Regex**: `/"captions":\s*({.*?}),"videoDetails"/`
- **Validação**: Verificar se `captionTracks` existe e possui URLs válidas.

### 2. Parsing de XML (`timedtext`)
As legendas do YouTube são entregues em formato XML via API `timedtext`.
- **Endpoint**: Usar a `baseUrl` encontrada no objeto de captions.
- **Tratamento**: Remover tags HTML (`<[^>]*>`) e decodificar entidades XML.

### 3. Sincronização e Reconstituição (`Protocolo K`)
- **Texto**: Concatenar todas as partes com espaços, normalizando espaços em branco duplicados.
- **Timestamps**: Manter o mapeamento de `start` e `duration` para permitir "Seek" ou citações diretas no tempo.

## Como Usar via Metatron
1. **Solicitar**: "Inicie Protocolo Eightify no vídeo [URL]".
2. **Saída**: Retorno em formato TSON com `transcript`, `metadata` (título, views, likes) e `timestamps`.

## Vantagens (v23.0)
- **High Entropy**: Captura metadados que o scrape básico ignora (ex: views originais, tags OG).
- **Auto-Translation**: Capaz de solicitar versões auto-traduzidas via parâmetro `&tlang=[lang]`.

---
> [!IMPORTANT]
> Caso encontre bloqueio de reCAPTCHA, utilize o Firecrawl com proxy premium ou aguarde o ciclo de limpeza de cookies.
