---
name: "validate-intelligence"
task: validateIntelligence()
responsavel: "Validator"
responsavel_type: "Agente"
Entrada:
  - nome: "system_prompt"
    tipo: "string"
    obrigatorio: true
    description: "System prompt of the intelligence under test"
  - nome: "knowledge_base"
    tipo: "string"
    obrigatorio: false
    description: "Knowledge base documents for structural review"
  - nome: "tier_level"
    tipo: "enum"
    obrigatorio: false
    description: "tier1 | tier2 | tier3 | full (default: full)"
Saida:
  - nome: "tier1_results"
    tipo: "string"
    obrigatorio: true
    description: "Structural validation checklist with pass/fail per item"
  - nome: "tier2_scores"
    tipo: "string"
    obrigatorio: true
    description: "Behavioral test scores across 8 categories with overall score"
  - nome: "tier3_protocol"
    tipo: "string"
    obrigatorio: true
    description: "Outcome validation pilot protocol with metrics and timeline"
  - nome: "validation_report"
    tipo: "string"
    obrigatorio: true
    description: "Formal validation report with findings and recommendations"
atomic_layer: Analysis
Checklist:
  - "Tier 1: All structural checks pass (100%)"
  - "Tier 2: Overall score >= 85%"
  - "Tier 2: No category below 70%"
  - "Tier 2: Ethics tests = 100%"
  - "Tier 3: Pilot protocol designed with metrics"
  - "Validation report generated with actionable fix recommendations"
---

# Validate Intelligence

Run 3-tier quality assurance on an assembled synthetic intelligence. Tier 1: structural completeness (100% required). Tier 2: behavioral testing across 8 categories (85%+ required). Tier 3: outcome validation design for real-world pilot.
