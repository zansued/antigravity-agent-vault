# cloudbase-ai-deployment-mcp

An official MCP server for Tencent CloudBase, enabling 100% AI-native cloud development, one-click deployments, and smart debugging.

## Context
Use this skill to deploy live apps from AI prompts, manage serverless resources on Tencent Cloud, and automate the full-stack infrastructure lifecycle.

## Key Features
- **One-Click Deploy**: "Go from AI prompt to live app" with automated deployment to Tencent CloudBase.
- **AI-Native Coding**: Optimized for use within AI IDEs (Cursor, Windsurf, etc.) and Gemini CLI.
- **Smart Debugging**: AI-assisted diagnosis and resolution of cloud-side errors and performance bottlenecks.
- **Full-Stack Support**: Specialized tools for managing static hosting, cloud functions, and NoSQL databases.
- **Knowledge Retrieval**: Integrated knowledge search for CloudBase documentation and best practices.

## How to Use
1. **Deploy**: "Deploy the current web project to Tencent CloudBase under the [ProjectID] environment".
2. **Debug**: "Analyze the cloud function logs for [FunctionName] and fix any identified errors".
3. **Database**: "Create a new CloudBase NoSQL collection named [CollectionName]".

## Requirements
- **Account**: Active Tencent Cloud account with CloudBase services enabled.
- **API**: Requires TENCENT_CLOUD_SECRET_ID and TENCENT_CLOUD_SECRET_KEY.
- **Runtime**: Node.js/MCP transport.
