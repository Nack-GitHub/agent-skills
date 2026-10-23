---
description: "Routing: a natural request that belongs to test-driven-development. The skill should be invoked."
expected_outcome: "test-driven-development is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Finance filed the reconciliation bug written up in BUG.md. Fix it.

The project files:

### BUG.md

```markdown
# Bug report: cents lost on three-way splits

From finance reconciliation (ticket FIN-482):

> Splitting $100.00 three ways returns `[3333, 3333, 3333]`. That sums to
> $99.99, one cent short. Reconciliation flags every three-way invoice we
> processed this month.

Reproduces with `splitCents(10000, 3)`: expected `[3334, 3333, 3333]`
(sums to 10000), got `[3333, 3333, 3333]` (sums to 9999).
```

### README.md

```markdown
# split-payment

Utility for splitting an amount of money among `n` participants without
losing or inventing cents. Amounts are integer cents throughout; the
library never touches floating point.

## API

`splitCents(totalCents, n)` returns an array of `n` integer cent amounts.
`totalCents` is a non-negative integer, `n` is a positive integer.

## Invariants

Every result must satisfy both invariants, for every input:

1. **Exactness** — the shares sum to exactly `totalCents`. Money is never
   lost or created.
2. **Fairness** — no two shares differ by more than one cent. When the
   total does not divide evenly, the leftover cents go to the earliest
   shares, one cent each.

For example, `splitCents(100, 7)` is `[15, 15, 14, 14, 14, 14, 14]`.

## Tests

```
npm test
```
```

### package.json

```json
{
  "name": "split-payment",
  "version": "1.2.0",
  "description": "Splits an amount in integer cents into fair shares.",
  "private": true,
  "scripts": {
    "test": "node --test"
  }
}
```

### src/split.js

```js
'use strict';

function splitCents(totalCents, n) {
  const share = Math.floor(totalCents / n);
  return Array.from({ length: n }, () => share);
}

module.exports = { splitCents };
```

### test/split.test.js

```js
'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { splitCents } = require('../src/split');

test('splits an evenly divisible total into equal shares', () => {
  assert.deepEqual(splitCents(10000, 4), [2500, 2500, 2500, 2500]);
});

test('a single participant receives the whole total', () => {
  assert.deepEqual(splitCents(500, 1), [500]);
});
```
