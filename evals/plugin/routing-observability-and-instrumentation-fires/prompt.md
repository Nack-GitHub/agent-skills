---
description: "Routing: a natural request that belongs to observability-and-instrumentation. The skill should be invoked."
expected_outcome: "observability-and-instrumentation is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Instrument a new payment-retry feature so on-call can operate it.

The project files:

### operations.md

```markdown
# Payment retry operations

On-call must be able to answer:

- Are retries recovering transient gateway failures?
- Which gateway and failure class is driving exhaustion?
- Is one payment being charged more than once?
- Which customer-visible payments need intervention now?

Payment and attempt IDs are safe correlation identifiers. Card numbers,
customer email addresses, and raw gateway responses must never be logged.
```

### payment-retry.js

```js
'use strict';

async function retryPayment(payment, gateway) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await gateway.charge(payment);
    } catch (error) {
      console.log(`retry ${attempt} failed: ${error.message}`);
    }
  }
  throw new Error('payment failed');
}

module.exports = { retryPayment };
```
