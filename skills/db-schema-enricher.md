# db-schema-enricher

A tool for enriching database schemas with metadata and column comments to improve documentation and AI context.

## Context
Use this skill to make legacy database schemas more understandable for both humans and AI agents by injecting semantic metadata directly into the database.

## Key Features
- **Automated Labeling**: Enriches schemas with metadata based on analysis and predefined rules.
- **Comment Management**: Simplifies the process of creating and maintaining column-level comments.
- **Context Preservation**: Ensures that database structure is self-documenting within the DB itself.
- **GCP Integration**: Seamlessly works with Cloud SQL and other GCP database services.

## How to Use
1. **Scan**: "Scan the schema of database [db_name] and suggest missing comments".
2. **Enrich**: "Apply the suggested metadata to the production schema".
3. **Verify**: "Generate a documentation report based on the enriched metadata".

## Requirements
- **Database**: Supported DB (PostgreSQL, MySQL, etc.) with metadata write access.
- **Runtime**: CLI tool available in the environment.
