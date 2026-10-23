---
description: "Routing: a natural request that belongs to source-driven-development. The skill should be invoked."
expected_outcome: "source-driven-development is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Implement session handling with the framework's recommended approach, citing sources.

The project files:

### framework-task.md

```markdown
# Session implementation task

Implement server-side sessions for an Express 5 application. The project uses
`express-session` and must follow the currently documented production approach
for proxy settings, secure cookies, session stores, and secret configuration.

Ground behavioral claims in official Express or `express-session`
documentation and cite the exact pages used. Do not rely on remembered Express
4 defaults. Flag any deployment-specific assumption that cannot be verified
from the repository or official documentation.
```
