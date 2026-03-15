$vaultPath = "D:\GEMINI CLI\antigravity-agent-vault"
cd $vaultPath

Write-Host "Executando verificação de upgrade do Metatron em $vaultPath..."
npx ts-node src/verify-metatron-upgrade.ts

Write-Host "Execução concluída!"
