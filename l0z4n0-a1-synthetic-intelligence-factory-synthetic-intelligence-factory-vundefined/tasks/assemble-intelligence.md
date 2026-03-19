---
name: "assemble-intelligence"
task: assembleIntelligence()
responsavel: "Assembler"
responsavel_type: "Agente"
Entrada:
  - nome: "extraction_template"
    tipo: "string"
    obrigatorio: true
    description: "Completed 7-layer extraction template from extract-expertise task"
  - nome: "domain_name"
    tipo: "string"
    obrigatorio: true
    description: "Name of the professional domain for identity header"
  - nome: "professional_title"
    tipo: "string"
    obrigatorio: false
    description: "Title for the synthetic intelligence (e.g., Growth Marketing Leader)"
Saida:
  - nome: "system_prompt"
    tipo: "string"
    obrigatorio: true
    description: "Complete system prompt (15k-25k words) with all 7 layers + directives + activation"
  - nome: "knowledge_base"
    tipo: "string"
    obrigatorio: true
    description: "KB architecture with 50+ documents: frameworks, playbooks, cases, models"
  - nome: "calibration_form"
    tipo: "string"
    obrigatorio: true
    description: "7-section contextual calibration form for deployment adaptation"
atomic_layer: Template
Checklist:
  - "All 10 system prompt sections generated"
  - "No [placeholder] text remaining"
  - "All extraction content incorporated (layer-by-layer verification)"
  - "No contradictions between sections"
  - "Voice consistency (second person throughout)"
  - "Word count meets minimums per layer (total 15k-25k)"
  - "KB has 50+ documents with complete INDEX.md"
  - "Calibration form covers all Layer 5 variables"
---

# Assemble Intelligence

Transform a completed 7-layer extraction into a deployable synthetic intelligence via 10-step assembly algorithm. Produces system prompt, knowledge base, and calibration form. Duration: 8-12 hours.
