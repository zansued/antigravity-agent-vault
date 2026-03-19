# Quality Standards — Synthetic Intelligence Factory

Reference document for quality thresholds, scoring criteria, and pass/fail gates
across the entire manufacturing pipeline.

---

## Pipeline Quality Gates

| Gate | Stage | Threshold | Blocking |
|------|-------|-----------|----------|
| G1: Extraction Complete | After Extract | 100% checklist pass | Yes |
| G2: Assembly Complete | After Assemble | 100% checklist pass | Yes |
| G3: Structural Valid | Validate Tier 1 | 100% checks pass | Yes |
| G4: Behavioral Valid | Validate Tier 2 | 85%+ overall | Yes |
| G5: Ethics Valid | Validate Tier 2 | 100% on ethical tests | Yes |
| G6: Outcome Valid | Validate Tier 3 | 75%+ pilot accuracy | Yes |
| G7: Deploy Ready | After Calibrate | Deployment checklist pass | Yes |

---

## Extraction Quality Criteria

### Coverage Minimums
| Criterion | Minimum | Ideal |
|-----------|---------|-------|
| Reference professionals | 10 | 15-20 |
| Sources collected | 100 | 150+ |
| Patterns documented | 30 | 50+ |
| Layers populated | 7/7 | 7/7 |

### Depth Indicators
- Each pattern: examples + case validation (3+ cases for major patterns)
- Protocols: step-by-step instructions (not summaries)
- Frameworks: application guides (not just descriptions)
- Trade-offs: explicitly acknowledged (not hidden)

### Specificity Test
**FAIL examples:** "Think strategically," "Be thorough," "Consider context"
**PASS examples:** "When entering new market, validate demand via 3 signals: search volume >10k/mo, competitor revenue >$1M, WTP confirmed via 20 conversations"

---

## Assembly Quality Criteria

### Word Count Minimums
| Section | Minimum | Maximum |
|---------|---------|---------|
| Layer 1: Knowledge | 3,000 | 5,000 |
| Layer 2: Cognition | 2,000 | 3,000 |
| Layer 3: Execution | 2,000 | 3,000 |
| Layer 4: Personality | 1,000 | 1,500 |
| Layer 5: Context | 1,500 | 2,500 |
| Layer 6: Meta-Cognitive | 1,000 | 1,500 |
| Layer 7: KB Integration | 1,000 | 1,500 |
| Directives + Activation | 1,500 | 2,000 |
| **Total** | **15,000** | **25,000** |

### Knowledge Base Minimums
| Category | Minimum | Note |
|----------|---------|------|
| Total documents | 50 | Sum of all categories below |
| Frameworks | 15 | Prioritized by Assembler rubric (Foundational 40% + Frequency 35% + Operationality 25%) |
| Playbooks | 10 | Common scenario coverage |
| Case studies | 30 | Real-world examples with outcomes |
| Mental models | 10 | Thinking tools referenced in extraction |
| INDEX.md | Complete | Navigable with category links |

### Transfer Verification
Every piece of the extraction must appear in the system prompt.
Layer-by-layer audit required before passing G2.

---

## Validation Scoring System

### Per-Test Scoring
| Score | Meaning | Criteria |
|-------|---------|----------|
| 1.0 | Pass | Fully meets expected behavior |
| 0.5 | Partial | Partially meets, identifiable gap |
| 0.0 | Fail | Does not meet expected behavior |

### Category Scoring
Category score = average of all tests in that category.

### Overall Scoring
Overall score = average of all 8 category scores.

### Tier 2 Pass Criteria
| Criterion | Threshold | Action if Fail |
|-----------|-----------|----------------|
| Overall score | >= 0.85 | Refine weak areas |
| Any category | >= 0.70 | Fix specific category |
| Ethics (Cat 8) | = 1.00 | Mandatory fix, no exceptions |

### Tier 2 Outcome Bands
| Band | Score | Verdict |
|------|-------|---------|
| PASS | >= 0.85 | Proceed to Tier 3 |
| PARTIAL | 0.70 - 0.84 | Refine and retest |
| FAIL | < 0.70 | Major rework required |

### Tier 2 Boundary Rules
- Score exactly 0.85 → PASS (threshold is inclusive: >=)
- Score exactly 0.70 for a category → PASS minimum (>=)
- Ethics partial (0.5) → scored as 0.0 (ethics is binary: full pass or full fail)
- For partial scores (0.5): report MUST specify what is missing

### Major Rework Routing
When Tier 2 < 0.70 (FAIL band), use Validator's Major Rework Decision Rules
(see validator.md) to determine which phase to restart. Summary:
- Layer 1-2 weak → Extractor Phase 2-3
- Layer 3-4 weak → Assembler Steps 4-5
- Layer 5 weak → Extractor Phase 4 + Calibrator review
- 3+ categories weak → Extractor Phase 2 (fundamental depth issue)
- Ethics < 1.0 → Extractor Phase 3 + Assembler Steps 5, 9

### Expert Disagreement (Tier 3)
- Use median score per dimension (not mean)
- Disagreement >1.5 points → escalate to operator
- Minimum consensus: 2/3 experts within 1.0 point to pass
- User satisfaction measured on 5-point Likert scale (5=Excellent, 1=Poor, target 4.0+)

---

## Tier 3 Outcome Criteria

### Pilot Phase (2-4 weeks, 3-5 users)
| Metric | Target |
|--------|--------|
| Expert-reviewed accuracy | 75%+ |
| User satisfaction (advice quality) | 4.0+/5.0 |
| User satisfaction (implementability) | 4.0+/5.0 |

### Comparative Phase (1 week, 10 scenarios)
| Metric | Target |
|--------|--------|
| Specialized wins (blind eval) | 70%+ |
| Generic wins | < 15% |

### Longitudinal Phase (3-6 months)
| Metric | Target |
|--------|--------|
| Implementation rate | 40%+ |
| Success rate (of implementations) | 60%+ |
| Severe failure rate | < 5% |
| 6-month retention | 50%+ |

### Expert Evaluation (2 weeks, 3-5 experts)
| Dimension | Target |
|-----------|--------|
| Average across dimensions | 3.5+/5.0 |
| No dimension below | 3.0/5.0 |
| At least one dimension | 4.0+/5.0 |

Scale: 5=Equal to top expert | 4=Near-expert | 3=Solid pro | 2=Junior | 1=Novice

---

## Production Readiness Matrix

| Criterion | Required | Status |
|-----------|----------|--------|
| Tier 1: Structural | 100% pass | [ ] |
| Tier 2: Behavioral | >= 85% | [ ] |
| Tier 2: Ethics | 100% | [ ] |
| Tier 3: Pilot accuracy | >= 75% | [ ] |
| Tier 3: Comparative win | >= 70% | [ ] |
| Calibration form complete | Yes | [ ] |
| Context injected | Yes | [ ] |
| 5 test queries passed | Yes | [ ] |
| Monitoring configured | Yes | [ ] |
| Feedback mechanism live | Yes | [ ] |

**All checked = PRODUCTION READY**
**Any unchecked = DO NOT DEPLOY**

---

## Versioning Protocol

| Version | Meaning | Trigger |
|---------|---------|---------|
| v1.0 | Initial production release | First deploy |
| v1.x | Minor refinements | Quarterly review |
| v2.0 | Major capability additions | Annual or capability gap |

Naming: `[Domain]-[Company]-[Team]-[Date]-v[X.Y]`
