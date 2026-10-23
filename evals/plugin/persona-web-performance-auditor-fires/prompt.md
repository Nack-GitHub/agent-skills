---
description: "Persona routing: a request that should be delegated to the web-performance-auditor subagent."
expected_outcome: "The web-performance-auditor persona is dispatched through the Agent tool."
max_turns: 12
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Have a web performance specialist audit our marketing homepage for Core Web Vitals: LCP is 4.1s and CLS 0.25 on mobile. The page loads a 900 KB hero image, three web fonts, and a chat widget script in the head. Identify the structural anti-patterns.
