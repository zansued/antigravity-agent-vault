---
name: "calibrate-intelligence"
task: calibrateIntelligence()
responsavel: "Calibrator"
responsavel_type: "Agente"
Entrada:
  - nome: "validated_intelligence"
    tipo: "string"
    obrigatorio: true
    description: "Validated system prompt + KB that passed Tier 1 + Tier 2"
  - nome: "organization_context"
    tipo: "string"
    obrigatorio: true
    description: "Target organization details: industry, stage, size, budget, culture"
  - nome: "use_case"
    tipo: "string"
    obrigatorio: false
    description: "Primary use case and typical query types"
  - nome: "cognitive_tuning"
    tipo: "string"
    obrigatorio: false
    description: "Optional cognitive emphasis dials (speed/depth, creativity/rigor, etc.)"
Saida:
  - nome: "calibrated_prompt"
    tipo: "string"
    obrigatorio: true
    description: "System prompt with all context variables injected for target deployment"
  - nome: "deployment_guide"
    tipo: "string"
    obrigatorio: true
    description: "Step-by-step deployment checklist with platform-specific instructions"
  - nome: "monitoring_plan"
    tipo: "string"
    obrigatorio: true
    description: "Success metrics, feedback collection plan, and review schedule"
atomic_layer: Config
Checklist:
  - "All 7 calibration form sections completed"
  - "All [VARIABLE] markers replaced in system prompt"
  - "Cognitive emphasis dials set (if tuned)"
  - "5 test queries run successfully"
  - "Deployment checklist passes"
  - "Monitoring and feedback mechanism configured"
  - "First review date scheduled (2 weeks post-launch)"
---

# Calibrate Intelligence

Adapt a validated synthetic intelligence to a specific organizational context via 7-section calibration form. Inject context variables, tune cognitive emphasis, deploy, and configure monitoring. Duration: 15-30 minutes per context.
