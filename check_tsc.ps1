$vaultPath = "D:\GEMINI CLI\antigravity-agent-vault"
cd $vaultPath

Write-Host "Executando tsc em $vaultPath..."
npx tsc --noEmit

Write-Host "Check concluído!"
