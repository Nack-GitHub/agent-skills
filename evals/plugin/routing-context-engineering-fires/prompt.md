---
description: "Routing: a natural request that belongs to context-engineering. The skill should be invoked."
expected_outcome: "context-engineering is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

An agent session has degraded: responses are generic and it keeps forgetting project conventions. Fix the context setup.

The project files:

### context-audit.md

```markdown
# Session context audit

The repository is a TypeScript service. The current agent session loads the
entire `docs/archive/` directory (1,800 files), generated API output, six old
incident transcripts, and every ADR on startup. It does not load the active
`CONTRIBUTING.md` or `docs/current-architecture.md`.

Observed failures:

- Responses recommend JavaScript even though new source must be TypeScript.
- Tests are proposed with Jest, but this project uses Vitest.
- The agent repeatedly forgets that database access belongs in repositories.
- Answers become generic after long tool traces.

Current task: add validation to one existing HTTP handler.
```
