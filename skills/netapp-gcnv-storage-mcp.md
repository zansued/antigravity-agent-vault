# netapp-gcnv-storage-mcp

An MCP server for managing Google Cloud NetApp Volumes (GCNV), providing comprehensive tools for storage administration.

## Context
Use this skill to automate the management of NetApp volumes, snapshots, and replication sets within the Google Cloud environment.

## Key Features
- **Storage Pool Management**: Tools for creating, updating, and monitoring GCNV storage pools.
- **Volume Operations**: Direct control over volume creation, resizing, and deletion.
- **Data Protection**: Full support for snapshot management, backup policies, and replication.
- **Active Directory/KMS**: Configuration tools for identity and encryption at rest.
- **Multi-Transport**: Supports both `Stdio` and `HTTP/SSE` for versatile deployment.

## How to Use
1. **Provision**: "Create a new 1TB NetApp volume in the [PoolName] storage pool".
2. **Protect**: "Configure a daily backup policy and take a manual snapshot of [VolumeID]".
3. **Monitor**: "List all active replication sets in the GCNV environment".

## Requirements
- **Environment**: Google Cloud Platform with NetApp Volumes enabled.
- **Authentication**: Requires valid GCP service account credentials with GCNV permissions.
