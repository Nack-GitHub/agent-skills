---
description: "Command routing: /agent-skills:build must reach what it is wired to."
expected_outcome: "/build loads the incremental-implementation skill."
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

/agent-skills:build Implement the next task: add a /health endpoint that returns {"ok": true}.
