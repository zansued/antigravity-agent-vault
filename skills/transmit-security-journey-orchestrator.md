# transmit-security-journey-orchestrator

An Identity Orchestration (IDO) extension for Transmit Security's Mosaic platform, enabling agents to build, validate, and manage security journeys.

## Context
Use this skill when designing user authentication, authorization, or identity verification flows using Transmit Security's IDO infrastructure.

## Key Features
- **IDO Journey Generation**: AI-assisted creation of complex identity orchestration journeys (e.g., MFA, Passwordless).
- **Metadata & Structure Validation**: Built-in tools for validating journey JSON, expressions, variables, and required fields.
- **Node Extension Support**: Methods for extending the library of available journey nodes and definitions.
- **Import Ready**: Formats generated journeys for direct import into the Transmit Security Mosaic platform.
- **Validator Suite**: Specialized tools like `validate_journey_metadata` and `validate_journey_expressions`.

## How to Use
1. **Generate**: "Generate a Transmit Security IDO journey for a passwordless login flow with biometric fallback".
2. **Validate**: "Validate the structure and mandatory fields of the [JourneyFile].json".
3. **Fix**: "Identify and apply logic fixes to the [JourneyFile].json based on Transmit Security standards".

## Requirements
- **Runtime**: Gemini CLI / Node.js.
- **Platform**: Access to Transmit Security Mosaic platform for deployment.
