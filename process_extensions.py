import json
import re

def extract_repos(json_path):
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    markdown_content = data.get("data", {}).get("markdown", "")
    
    # regex for @owner/repo-name
    repo_pattern = r"@([\w-]+/[\w-]+)"
    repos = re.findall(repo_pattern, markdown_content)
    
    # Remove duplicates
    unique_repos = sorted(list(set(repos)))
    return unique_repos

if __name__ == "__main__":
    json_path = "D:\\GEMINI CLI\\antigravity-agent-vault\\extensions_scrape.json"
    repos = extract_repos(json_path)
    
    output_path = "D:\\GEMINI CLI\\antigravity-agent-vault\\repositorios_extensions.md"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("# Repositórios de Extensões (geminicli.com/extensions)\n\n")
        f.write("| Repositório | Status | Observações |\n")
        f.write("| --- | --- | --- |\n")
        for repo in repos:
            f.write(f"| [{repo}](https://github.com/{repo}) | [ ] Pendente | |\n")
    
    print(f"File created: {output_path}")
    print(f"Total repositories found: {len(repos)}")
