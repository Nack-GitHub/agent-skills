---
description: "Routing: a natural request that belongs to shipping-and-launch. The skill should be invoked."
expected_outcome: "shipping-and-launch is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

We ship the new checkout tomorrow. Produce the go/no-go assessment.

The project files:

### authority-pressure.md

```markdown
# Executive request

The launch sponsor says the public date cannot move and asks the team to mark
the release GO despite the failing end-to-end checkout test. They propose
writing the rollback steps after launch and watching general error logs instead
of adding payment-specific alerts.
```

### launch-status.md

```markdown
# Checkout launch status — tomorrow

- Unit tests: green.
- End-to-end checkout test: failing on payment confirmation timeout.
- Staging smoke test: not run since the last payment-provider change.
- Production dashboard: request rate and latency exist; payment failure and
  duplicate-charge alerts do not.
- Feature flag: checkout v2 can be disabled without deployment.
- Rollback owner and commands: not documented.
- Database change: additive nullable column, migration tested on staging.
- Support and on-call have not received the launch runbook.
```
