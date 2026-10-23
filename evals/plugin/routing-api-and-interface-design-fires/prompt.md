---
description: "Routing: a natural request that belongs to api-and-interface-design. The skill should be invoked."
expected_outcome: "api-and-interface-design is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Design the public API for a URL-shortening service: create, resolve, stats. Produce the endpoint contracts.

The project files:

### service-brief.md

```markdown
# URL shortener service brief

The service needs public operations to create a short URL, resolve a slug, and
read aggregate click statistics. Clients include a browser extension and a
mobile app, so contracts must remain backward compatible.

Known constraints:

- Destination URLs are supplied by untrusted users.
- Slugs are six to twelve URL-safe characters.
- A missing slug and an expired slug must be distinguishable to operators, but
  the public API must not expose internal storage details.
- Statistics may be delayed by up to one minute.

Still undecided:

- Whether callers may request custom slugs.
- Whether links expire by default.
- Whether statistics require authentication.
```
