$vaultPath = "D:\GEMINI CLI\antigravity-agent-vault"
cd $vaultPath

Write-Host "Staging final bug fixes in $vaultPath..."
git add .

Write-Host "Committing bug fixes..."
git commit -m "fix: resolve typescript and dependency issues after migration"

Write-Host "Pushing to GitHub..."
git push

Write-Host "Sincronização final concluída!"
