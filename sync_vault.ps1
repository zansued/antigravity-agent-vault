$vaultPath = "D:\GEMINI CLI\antigravity-agent-vault"
cd $vaultPath

Write-Host "Staging changes in $vaultPath..."
git add .

Write-Host "Committing changes..."
git commit -m "feat: consolidate Metatron Core and Portal into Vault"

Write-Host "Pushing to GitHub..."
git push

Write-Host "Sincronização concluída!"
