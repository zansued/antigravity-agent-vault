# atomic-state-protocol

## Overview
Protocol for treating every task or project as a mathematical state object in the Vector Database (Supabase). This ensures 100% accountability and prevents "session amnesia".

## State Machine
Every task must follow this linear progression:
1. **STATE: RAW**: Initial user request, unparsed.
2. **STATE: ARCHITECTED**: Requirements mapped, implementation plan created and stored.
3. **STATE: CODED**: Implementation complete, logic written.
4. **STATE: AUDITED**: Verified by the **MACD-Audit** engine in a sandbox.
5. **STATE: PROD**: Final delivery, committed to main branch.

## How to Use
- **Transition**: "Update task [TaskID] state to [NextState]".
- **Query**: "List all tasks in STATE: ARCHITECTED".
- **Enforce**: "Do not proceed to CODED unless ARCHITECTED state is verified".

## Integration
- **Metatron Ledger**: Every state change is recorded as an event in the `event_stream`.
- **Supabase**: States are stored in the `intelligence_graph` table.
