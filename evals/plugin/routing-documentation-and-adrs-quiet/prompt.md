---
description: "Routing: a request that belongs to debugging-and-error-recovery, not documentation-and-adrs. documentation-and-adrs must not be invoked."
expected_outcome: "documentation-and-adrs is not invoked."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Find the root cause of the memory leak in the worker
