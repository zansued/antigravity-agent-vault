# macd-audit-engine

## Overview
The **Pilar Judiciário** of the Chronos Omega system. Implements the "Separation of Powers" principle: the developer (Executor) is never the auditor (Judge).

## Audit Protocol
1. **Sandbox Isolation**: Code is moved to a temporary, isolated environment.
2. **Blind Review**: The Auditor agent receives only the code and the PRD, without knowing the implementation history.
3. **Stress Metrics**:
    - **UBS Check**: Unintended Bug Search.
    - **Collision Test**: Checking if the new code breaks existing dependencies.
    - **Survival Rate**: Code must pass 100% of safety checks to be marked `AUDITED`.

## How to Use
- **Invoke**: "Run MACD-Audit on [File/PR] against PRD [Reference]".
- **Verdict**: Returns `PASS` (Proceed to PROD) or `FAIL` (Back to CODED with detailed logs).

## Integration
- **Simulation MACD**: Uses the `run_verify.ps1` script to execute automated failure scenarios.
