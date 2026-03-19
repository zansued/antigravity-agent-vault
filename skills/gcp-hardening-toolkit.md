# gcp-hardening-toolkit

A specialized toolkit for deep security hardening of GCP environments through automated triage and state-aware remediation.

## Context
Use this skill when managing complex brownfield GCP environments that require rapid security assessments and automated remediation of vulnerabilities.

## Key Principles (Pillars)
- **Automated Triage**: Rapidly identifies misconfigurations and security gaps.
- **State-Aware IaC**: Performs remediations while maintaining awareness of existing resource states.
- **Brownfield Focus**: Specifically optimized for existing environments rather than just new setups.
- **Hardening Agent**: Includes a dedicated agent for continuous security posture management.

## How to Use
1. **Triage**: "Run a security triage on the current GCP organization".
2. **Harden**: "Apply GHT hardening policies to the [project_id] resources".
3. **Monitor**: Use the Hardening Agent to track compliance over time.

## Requirements
- **Permissions**: Organization-level security or owner permissions in GCP.
- **Runtime**: Python/IaC environment (Terraform).
