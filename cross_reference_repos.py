import os
import re

def update_repo_status(repo_md_path, skills_dir):
    # Get active skills filenames (without extension)
    active_skills = []
    for f in os.listdir(skills_dir):
        # if it's a directory, use the name
        if os.path.isdir(os.path.join(skills_dir, f)):
            active_skills.append(f)
        elif f.endswith(".md"):
            active_skills.append(f[:-3])
    
    with open(repo_md_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    updated_lines = []
    for line in lines:
        if "|" in line and "Repositorio" not in line and "---" not in line:
            # Extract repo name from [owner/repo-name](url)
            match = re.search(r"\[([\w-]+)/([\w-]+)\]", line)
            if match:
                owner = match.group(1)
                repo_name = match.group(2)
                
                # Simple match logic: if repo_name matches an active skill name
                status = "[ ] Pendente"
                obs = ""
                
                # Check for exact repo_name in active_skills
                if repo_name in active_skills or f"{repo_name}-skill" in active_skills or repo_name.replace("-skill", "") in active_skills:
                    status = "[x] Presente"
                    obs = "Já existe na pasta /skills"
                
                # Check if this owner/repo is mentioned in any skill file
                # (Too slow for 500+ items, we'll keep it simple for now)
                
                line = re.sub(r"\[ \] Pendente", status, line)
                if obs:
                    # Replace anything between the last | and the \n
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
    update_repo_status(repo_md_path, skills_dir)
    print("Cross-referencing complete.")
