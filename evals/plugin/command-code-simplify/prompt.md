---
description: "Command routing: /agent-skills:code-simplify must reach what it is wired to."
expected_outcome: "/code-simplify loads the code-simplification skill."
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

/agent-skills:code-simplify Simplify this function without changing behavior:

```js
function isAdult(u){ if(u.age>=18){ return true } else { return false } }
```
