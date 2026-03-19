import os
import re

def get_catalog_map(catalog_path):
    catalog_map = {}
    if not os.path.exists(catalog_path):
        return catalog_map
    
    with open(catalog_path, "r", encoding="utf-8") as f:
        content = f.read()
        # Find rows: | `skill-name` | Description | Tags | Triggers |
        rows = re.findall(r"\|\s+`([\w-]+)`\s+\|\s+(.*?)\|\s+(.*?)\|\s+(.*?)\|", content)
        for name, desc, tags, triggers in rows:
            catalog_map[name.lower()] = {
                "description": desc.strip(),
                "tags": tags.strip(),
                "triggers": triggers.strip()
            }
    return catalog_map

def process_batch(repo_md_path, skills_dir, catalog_path, batch_size=20):
    catalog_map = get_catalog_map(catalog_path)
    
    with open(repo_md_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    updated_lines = []
    processed_count = 0
    
    for idx, line in enumerate(lines):
        if processed_count < batch_size and "|" in line and ("[ ] Pendente" in line or "[/] No Catálogo" in line):
            match = re.search(r"\[([\w-]+)/([\w-]+)\]", line)
            if match:
                owner = match.group(1).lower()
                repo_name = match.group(2).lower()
                base_name = repo_name.replace("-skill", "").replace("-extension", "").replace("-mcp", "")
                
                # Try to find in catalog
                skill_data = catalog_map.get(repo_name) or catalog_map.get(base_name)
                
                if skill_data:
                    # Create skill file
                    skill_file_path = os.path.join(skills_dir, f"{base_name}.md")
                    if not os.path.exists(skill_file_path):
                        with open(skill_file_path, "w", encoding="utf-8") as sf:
                            sf.write(f"# {base_name}\n\n")
                            sf.write(f"{skill_data['description']}\n\n")
                            sf.write(f"## Context\nUse this skill for {skill_data['tags']}.\n\n")
                            sf.write(f"## Triggers\n{skill_data['triggers']}\n")
                        
                        # Update status in repo list
                        line = re.sub(r"\[[ /]\] (Pendente|No Catálogo)", "[x] Concluído", line)
                        parts = line.split("|")
                        if len(parts) >= 4:
                            parts[3] = f" Absorvido via Catálogo (Batch) "
                            line = "|".join(parts)
                        processed_count += 1
                else:
                    # If not in catalog, we might need a separate research step
                    # For now, mark as "Pendente (Research Needed)"
                    # line = line.replace("[ ] Pendente", "[?] Research Needed")
                    pass
        
        updated_lines.append(line)
        
    with open(repo_md_path, "w", encoding="utf-8") as f:
        f.writelines(updated_lines)
    
    return processed_count

if __name__ == "__main__":
    repo_md_path = "D:\\GEMINI CLI\\antigravity-agent-vault\\repositorios_extensions.md"
    skills_dir = "D:\\GEMINI CLI\\antigravity-agent-vault\\skills"
    catalog_path = os.path.join(skills_dir, "EXTENDED_CATALOG.md")
    
    count = process_batch(repo_md_path, skills_dir, catalog_path, batch_size=50) # Increasing batch size for efficiency
    print(f"Processed {count} skills in this batch.")
