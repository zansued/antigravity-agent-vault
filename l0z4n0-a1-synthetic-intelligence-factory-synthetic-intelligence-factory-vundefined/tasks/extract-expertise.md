---
name: "extract-expertise"
task: extractExpertise()
responsavel: "Extractor"
responsavel_type: "Agente"
Entrada:
  - nome: "domain"
    tipo: "string"
    obrigatorio: true
    description: "Target professional domain to extract expertise from"
  - nome: "scope"
    tipo: "string"
    obrigatorio: false
    description: "Optional scope constraints or focus areas within the domain"
  - nome: "existing_research"
    tipo: "string"
    obrigatorio: false
    description: "Any prior research, professional lists, or sources already collected"
Saida:
  - nome: "professional_profiles"
    tipo: "string"
    obrigatorio: true
    description: "10-20 reference professional profiles with credentials and source availability"
  - nome: "source_library"
    tipo: "string"
    obrigatorio: true
    description: "Organized library of 100+ mined sources with preliminary synthesis"
  - nome: "pattern_library"
    tipo: "string"
    obrigatorio: true
    description: "30+ documented patterns with consensus levels and case validation"
  - nome: "seven_layer_template"
    tipo: "string"
    obrigatorio: true
    description: "Completed 7-layer cognitive architecture template ready for assembly"
atomic_layer: Strategy
Checklist:
  - "10+ reference professionals identified and profiled"
  - "100+ sources collected and organized"
  - "30+ patterns documented with consensus levels"
  - "All 7 layers substantially populated"
  - "Each pattern has examples and case validation"
  - "No major unresolved contradictions"
  - "Specificity test passed (concrete, not vague)"
---

# Extract Expertise

Systematically distill elite expertise from any professional domain through the 4-phase extraction pipeline: Identify professionals (Phase 1), mine sources (Phase 2), extract patterns (Phase 3), decompose into 7-layer architecture (Phase 4). Duration: 44-88 hours of focused research.
