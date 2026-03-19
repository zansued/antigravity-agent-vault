# gedcom-genealogy-management

A specialized MCP server for interacting with GEDCOM (GEnealogical Data COMmunication) files, enabling agents to query and manage family tree data.

## Context
Use this skill when your agent needs to parse genealogical records, search for ancestors, or update family history data stored in GEDCOM format.

## Key Features
- **GEDCOM Parsing**: Robust support for reading and interpretating standard GEDCOM files.
- **Genealogical Querying**: Search for individuals, families, and events within a family tree.
- **Manifest Creation**: Tools for programmatically generating new GEDCOM records or files.
- **Relation Mapping**: Visualizes and calculates relationships between different nodes in the genealogy graph.
- **Record Export**: Export data or subsets of a family tree into valid GEDCOM format for use in other software.

## How to Use
1. **Query**: "Search the [FamilyTree].ged file for any individuals with the last name '[Name]'".
2. **Add**: "Create a new individual record in the GEDCOM file for [PersonDetails]".
3. **Analyze**: "Identify the direct lineage between [PersonA] and [PersonB] in the loaded family tree".

## Requirements
- **Data**: A valid GEDCOM (.ged) file.
- **Runtime**: Gemini CLI + GedcomMCP Server.
