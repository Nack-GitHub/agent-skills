---
description: "Routing: a natural request that belongs to architecture. The skill should be invoked."
expected_outcome: "architecture is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Read lock-context.md. Evaluate whether the report scheduler should use Redis or PostgreSQL for its distributed job lock, weigh the trade-offs against the constraints in that file, and record the decision as an ADR under docs/adr/. Do not implement the lock.

The project files:

### docs/adr/README.md

```markdown
# Architecture Decision Records

Number ADRs sequentially: `0001-short-title.md`. Each ADR has Status, Context,
Decision, and Consequences sections.
```

### lock-context.md

```markdown
# Report scheduler: distributed lock decision

The nightly report scheduler runs on 3 worker replicas. Each report job must
run on exactly one replica at a time; duplicate runs email customers twice.

Current infrastructure:
- PostgreSQL 15 (primary + one read replica), already used by every service,
  backed up and monitored by the platform team.
- Redis 7, single node, used only as a cache. No persistence configured, no
  on-call ownership; it was restarted twice last quarter and lost all keys.

Constraints:
- Jobs run 30 seconds to 20 minutes.
- About 200 job starts per night; lock contention is low.
- A missed run is recoverable (the next scheduler tick retries); a duplicate
  run is not.
- The team is two engineers; nobody has operated Redis in production.

Open question: use Redis (SET NX PX / Redlock) or PostgreSQL (advisory locks
or a lease table) for the job lock?
```
