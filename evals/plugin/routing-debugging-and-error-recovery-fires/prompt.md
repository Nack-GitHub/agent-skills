---
description: "Routing: a natural request that belongs to debugging-and-error-recovery. The skill should be invoked."
expected_outcome: "debugging-and-error-recovery is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

A test that passed yesterday now fails with an off-by-one error in pagination. Find and fix the root cause.

The project files:

### pagination.js

```js
'use strict';

function paginate(items, page, pageSize) {
  const start = page * pageSize;
  return items.slice(start, start + pageSize);
}

module.exports = { paginate };
```

### pagination.test.js

```js
'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { paginate } = require('./pagination');

test('returns the second page for a one-based page number', () => {
  assert.deepEqual(paginate(['a', 'b', 'c', 'd', 'e'], 2, 2), ['c', 'd']);
});
```

### time-pressure.md

```markdown
# Incident pressure

Checkout pagination is returning an empty page in production. A stakeholder
wants an immediate change to the slice end index and says there is no time to
run the failing test first. Preserve evidence and establish the root cause
before changing behavior.
```
