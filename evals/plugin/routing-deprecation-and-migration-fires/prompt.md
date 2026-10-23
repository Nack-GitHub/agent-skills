---
description: "Routing: a natural request that belongs to deprecation-and-migration. The skill should be invoked."
expected_outcome: "deprecation-and-migration is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Plan the deprecation of a public v1 REST API with 200 external consumers, replaced by v2.

The project files:

### api-inventory.md

```markdown
# v1 API inventory

- Public consumers: 200 organizations.
- Replacement: `/v2/orders`, available in production but not yet announced.
- Current v1 traffic: 48,000 requests/day from 173 active API keys.
- Largest consumer contract requires 90 days' notice for breaking changes.
- Existing telemetry records API key, route, status, and response latency.
- Support can contact 188 consumers directly; 12 use reseller-managed accounts.
- v1 currently has no response deprecation headers or migration guide.
```
