---
description: "Command routing: /agent-skills:test must reach what it is wired to."
expected_outcome: "/test loads the test-driven-development skill."
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

/agent-skills:test splitCents(100, 3) returns [33, 33, 33] and a cent goes missing. Here is the function:

```js
export const splitCents = (total, n) => Array(n).fill(Math.floor(total / n));
```
