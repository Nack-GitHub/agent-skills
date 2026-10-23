---
description: "Routing: a natural request that belongs to using-agent-skills. The skill should be invoked."
expected_outcome: "using-agent-skills is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

A user asks: 'the login page is broken after yesterday's deploy'. Decide which skill applies and why.

The project files:

### incident.md

```markdown
# Login regression report

The login page began returning HTTP 500 after yesterday's deployment. The
request reaches the authentication callback, then fails before a session cookie
is written. There is no confirmed root cause yet. The user asked for help
getting login working again, not for a new authentication design.
```
