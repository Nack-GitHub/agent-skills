---
description: "Persona routing: a trivial request that must not be delegated to code-reviewer."
expected_outcome: "The code-reviewer persona is not dispatched."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Rename the variable `rows` to `orderRows` in this snippet:

```js
const rows = db.query(sql);
return rows;
```
