---
description: "Routing: a request that belongs to powershell-windows, not bash-linux. bash-linux must not be invoked."
expected_outcome: "bash-linux is not invoked."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Write a PowerShell script to clean up Windows registry keys
