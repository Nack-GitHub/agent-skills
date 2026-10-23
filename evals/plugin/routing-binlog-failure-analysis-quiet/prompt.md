---
description: "Routing: a request that belongs to debugging-and-error-recovery, not binlog-failure-analysis. binlog-failure-analysis must not be invoked."
expected_outcome: "binlog-failure-analysis is not invoked."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

The dotnet build failed, help me recover
