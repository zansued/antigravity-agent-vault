# alibaba-cloud-ack-kubernetes

The official Alibaba Cloud Container Service for Kubernetes (ACK) MCP Server, enabling agents to perform complex AIOps and container management via natural language.

## Context
Use this skill when managing Alibaba Cloud ACK clusters, deploying containerized applications, or performing system-level audits on Kubernetes nodes.

## Key Features
- **Cluster Operations**: Create, query, and manage Alibaba Cloud ACK clusters and their configurations.
- **Resource Management**: Deploy, update, and monitor Kubernetes resources (Pods, Deployments, Services, ConfigMaps).
- **AIOps Integration**: Specifically designed for AI agents to perform complex troubleshooting and scaling tasks via MCP.
- **Natural Language Control**: Maps complex ACK/K8s API operations to clear, agentic commands.
- **Security & Permissions**: Leverages Alibaba Cloud RAM for robust authorization and secure cluster access.

## How to Use
1. **Manage**: "List all active ACK clusters in the [Region] and report their health status".
2. **Deploy**: "Deploy the [ApplicationName] image to the [Namespace] in the ack-cluster-[ID]".
3. **Scale**: "Scale the [DeploymentName] replicas to 5 and monitor the rollout status".

## Requirements
- **Cloud**: Alibaba Cloud account with ACK permissions enabled.
- **API**: Requires RAM Access Key and Secret Key.
- **Runtime**: Gemini CLI + ack-mcp-server.
