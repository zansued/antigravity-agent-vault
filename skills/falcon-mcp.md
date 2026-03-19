# falcon-mcp

Connect AI agents to CrowdStrike Falcon for automated security analysis, threat hunting, and incident response.

## Context
Use this skill when you need to interact with the CrowdStrike Falcon platform for security operations, vulnerability management, identity protection, or threat intelligence.

## Modules & Tools
- **Detections**: `falcon_search_detections`, `falcon_get_detection_details`.
- **Incidents**: `falcon_search_incidents`, `falcon_get_incident_details`, `falcon_show_crowd_score`.
- **Hosts**: `falcon_search_hosts`, `falcon_get_host_details`.
- **Intel**: `falcon_search_actors`, `falcon_search_indicators`, `falcon_get_mitre_report`.
- **Cloud Security**: `falcon_search_kubernetes_containers`, `falcon_search_cspm_assets`.
- **Discover**: `falcon_search_unmanaged_assets`, `falcon_search_applications`.
- **Identity Protection**: `idp_investigate_entity`.
- **NGSIEM**: `search_ngsiem` (executes CQL queries).
- **Custom IOA**: `search_ioa_rule_groups`, `create_ioa_rule`.

## Capabilities
- **Automated Analysis**: Rapidly investigate detections and incidents across the environment.
- **Threat Hunting**: Search for Indicators of Compromise (IOCs) and adversary patterns.
- **Posture Monitoring**: Track CrowdScore and cloud security posture (CSPM).
- **Vulnerability Assessment**: Analyze container images and host vulnerabilities.

## How to Use
1. **Connectivity**: Verify with `falcon_check_connectivity`.
2. **Investigation**: Start with `falcon_search_detections` or `falcon_search_incidents`.
3. **Deep Dive**: Use `falcon_get_detection_details` for specific alerts.
4. **FQL Guides**: Reference `falcon://<module>/fql-guide` for comprehensive filtering syntax.

## Requirements
- **API Scopes**: Requires specific OAuth2 scopes per module (e.g., `Alerts:read`, `Hosts:read`).
- **Environment**: Needs `FALCON_CLIENT_ID`, `FALCON_CLIENT_SECRET`, and `FALCON_BASE_URL`.
- **FQL Knowledge**: Familiarity with Falcon Query Language for advanced filtering.
