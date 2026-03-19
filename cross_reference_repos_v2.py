import os
import re

def update_repo_status(repo_md_path, skills_dir, catalog_path):
    # Get active skills filenames (without extension)
    active_skills = set()
    for f in os.listdir(skills_dir):
        if os.path.isdir(os.path.join(skills_dir, f)):
            active_skills.add(f.lower())
        elif f.endswith(".md"):
            active_skills.add(f[:-3].lower())
    
    # Get skills from catalog
    catalog_skills = set()
    if os.path.exists(catalog_path):
        with open(catalog_path, "r", encoding="utf-8") as f:
            content = f.read()
            # Find all `skill-name` patterns in the Skill column (first column of table)
            # Table row: | `skill-name` | ...
            matches = re.findall(r"\|\s+`([\w-]+)`\s+\|", content)
            for m in matches:
                catalog_skills.add(m.lower())

    with open(repo_md_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    updated_lines = []
    for line in lines:
        if "|" in line and "Repositorio" not in line and "---" not in line:
            # Extract repo name from [owner/repo-name](url)
            match = re.search(r"\[([\w-]+)/([\w-]+)\]", line)
            if match:
                owner = match.group(1).lower()
                repo_name = match.group(2).lower()
                
                status = "[ ] Pendente"
                obs = ""
                
                # Normalize name for matching
                base_name = repo_name.replace("-skill", "").replace("-extension", "").replace("-mcp", "")
                
                found_in_skills = False
                if repo_name in active_skills or base_name in active_skills:
                    found_in_skills = True
                
                found_in_catalog = False
                if repo_name in catalog_skills or base_name in catalog_skills:
                    found_in_catalog = True
                
                if found_in_skills:
                    status = "[x] Presente"
                    obs = "Existe em /skills"
                elif found_in_catalog:
                    status = "[/] No Catálogo"
                    obs = "No EXTENDED_CATALOG mas sem arquivo .md"
                
                line = re.sub(r"\[[ x/]\] (Pendente|Presente|No Catálogo)", status, line)
                if obs:
                    parts = line.split("|")
                    if len(parts) >= 4:
                        parts[3] = f" {obs} "
                        line = "|".join(parts)
            
        updated_lines.append(line)
    
    with open(repo_md_path, "w", encoding="utf-8") as f:
        f.writelines(updated_lines)

if __name__ == "__main__":
    repo_md_path = "D:\\GEMINI CLI\\antigravity-agent-vault\\repositorios_extensions.md"
    skills_dir = "D:\\GEMINI CLI\\antigravity-agent-vault\\skills"
    catalog_path = os.path.join(skills_dir, "EXTENDED_CATALOG.md")
    update_repo_status(repo_md_path, skills_dir, catalog_path)
    print("Comprehensive cross-referencing complete.")
