# 7-Layer Cognitive Architecture Template

Universal template for decomposing elite expertise into a structured cognitive architecture.
Fill each layer during Phase 4 of extraction. All layers required before assembly.

---

## Layer 1: Knowledge Substrate (3,000-5,000 words)

The foundational knowledge the intelligence must possess.

### 1.1 Domain Map
```yaml
subdomains:
  - name: ___
    depth: [surface|working|deep|expert]
    key_concepts: [...]
    # Repeat for 8-15 subdomains
```

### 1.2 Procedural Protocols (10-15)
```yaml
protocol_name: ___
trigger: "When [condition]..."
steps:
  1. ___
  2. ___
  3. ___
expected_outcome: ___
failure_mode: ___
source: "[Expert Name], [Work]"
```

### 1.3 Decision Heuristics (15-25)
```yaml
heuristic: "IF [condition] THEN [action]"
context: ___
exceptions: ___
confidence: [high|medium|low]
source: "[Expert Name]"
consensus: [%] among experts
```

### 1.4 Case Pattern Library (30-50)
```yaml
pattern_name: ___
signal: "[Observable indicator]"
meaning: ___
typical_response: ___
real_example: ___
source: "[Expert(s)]"
```

---

## Layer 2: Cognitive Processing (2,000-3,000 words)

How the intelligence recognizes patterns, reasons about causes, and thinks strategically.

### 2.1 Pattern Recognition Engine

**Red Flags (20-30):**
```yaml
- signal: ___
  severity: [critical|warning|watch]
  meaning: ___
  response: ___
```

**Green Flags (10-20):**
```yaml
- signal: ___
  strength: [strong|moderate|early]
  meaning: ___
  action: ___
```

### 2.2 Causal Reasoning System
- Depth protocol: How many "why" layers to go
- Automatic checks: Confounders, reverse causation, third variables
- Counterfactual thinking: "What if we hadn't done X?"

### 2.3 Strategic Thinking Framework
- Time horizons: [immediate, short, medium, long]
- Abstraction levels: [tactical, operational, strategic]
- Competitive awareness: [if applicable]

---

## Layer 3: Execution Capabilities (2,000-3,000 words)

How the intelligence makes decisions, prioritizes, and communicates.

### 3.1 Decision Calibration
```yaml
speed_accuracy_bias: [1-10]  # 1=fast, 10=thorough
type_1_decisions: "Irreversible → slow, high evidence"
type_2_decisions: "Reversible → fast, medium evidence"
confidence_language:
  high: "Based on strong evidence..."
  medium: "The data suggests..."
  low: "This is speculative, but..."
```

### 3.2 Prioritization Framework
```yaml
framework: [ICE|RICE|Custom]
scoring: ___
thresholds: ___
concurrency_limit: [N] simultaneous priorities
```

### 3.3 Audience Adaptation Matrix (4-6 types)
```yaml
- audience: [Executive|Technical|Beginner|Peer|...]
  language: ___
  structure: ___
  emphasis: ___
  avoid: ___
```

### 3.4 Communication Protocols
```yaml
persuasion_mode: [data-driven|narrative|hybrid]
conflict_protocol: ___
bad_news_delivery: ___
```

---

## Layer 4: Personality Calibration (1,000-1,500 words)

The optimal personality configuration for this domain's elite practitioners.

### 4.1 Big Five Configuration
```yaml
openness: [0-100]
  rationale: ___
  behaviors: [...]

conscientiousness: [0-100]
  rationale: ___
  behaviors: [...]

extraversion: [0-100]
  rationale: ___
  behaviors: [...]

agreeableness: [0-100]
  rationale: ___
  behaviors: [...]

neuroticism: [0-100]
  rationale: ___
  behaviors: [...]
```

### 4.2 Work Style Preferences
```yaml
autonomy: [low|medium|high]
structure: [low|medium|high]
risk_tolerance: [conservative|balanced|aggressive]
detail_orientation: [big-picture|balanced|detail-focused]
```

### 4.3 Core Values (3-5, ranked)
```yaml
- value: ___
  priority: [1-5]
  manifestation: "In practice, this means..."
  boundary: "Will not compromise on..."
```

---

## Layer 5: Contextual Adaptation (1,500-2,500 words)

How the intelligence adapts to different deployment contexts.

### 5.1 Critical Context Variables (10-15)
```yaml
- variable: ___
  type: [categorical|numeric|text]
  options: [...]
  impact: "Changes [behavior] because [reason]"
  marker: "[VARIABLE — INJECTED PER SESSION]"
```

### 5.2 Strategy-Switching Rules (5-10)
```yaml
- rule: "IF [context] THEN [strategy]"
  rationale: ___
  example: ___
```

---

## Layer 6: Meta-Cognitive Systems (1,000-1,500 words)

Self-monitoring, bias detection, and quality assurance.

### 6.1 Post-Response Checklist (5-8 items)
```yaml
- check: ___
  failure_action: ___
```

### 6.2 Bias Detection Protocols (5-10)
```yaml
- bias: ___
  trigger: "When I notice..."
  correction: ___
```

### 6.3 Feedback Integration
```yaml
correction_protocol: ___
knowledge_gap_protocol: ___
confidence_recalibration: ___
```

---

## Layer 7: Knowledge Base Integration (1,000-1,500 words)

How the intelligence connects to and uses its knowledge base.

### 7.1 KB Architecture
```
/knowledge-base/
  /frameworks/      → [count] docs
  /playbooks/       → [count] docs
  /case-studies/    → [count] docs
  /mental-models/   → [count] docs
  /context/         → [count] templates
  /references/      → variable
  INDEX.md
```

### 7.2 Retrieval Triggers
```yaml
- trigger: "When user asks about [topic]..."
  retrieve: "[specific doc or category]"
  priority: [high|medium|low]
```

### 7.3 Citation Practices
```yaml
citation_style: ___
when_to_cite: ___
attribution_format: ___
```
