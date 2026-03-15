$source = "c:\Users\zan_s\.gemini\tmp\system32\antigravity-core"
$dest = "D:\GEMINI CLI\antigravity-agent-vault"

Write-Host "Iniciando migração de $source para $dest..."

# Cria os diretórios de destino se não existirem
New-Item -ItemType Directory -Force -Path (Join-Path $dest "src")
New-Item -ItemType Directory -Force -Path (Join-Path $dest "src\types")
New-Item -ItemType Directory -Force -Path (Join-Path $dest "src\utils")
New-Item -ItemType Directory -Force -Path (Join-Path $dest "portal")

# Copia arquivos do src
Copy-Item -Path (Join-Path $source "src\*") -Destination (Join-Path $dest "src") -Recurse -Force

# Copia arquivos do portal (exceto node_modules para ser mais rápido)
Copy-Item -Path (Join-Path $source "portal\*") -Destination (Join-Path $dest "portal") -Recurse -Force -Exclude "node_modules"

# Copia arquivos de configuração
Copy-Item -Path (Join-Path $source "package.json") -Destination $dest -Force
Copy-Item -Path (Join-Path $source "tsconfig.json") -Destination $dest -Force
Copy-Item -Path (Join-Path $source ".gitignore") -Destination $dest -Force

Write-Host "Migração concluída com sucesso!"
