---
description: "Routing: a natural request that belongs to lint-and-validate. The skill should be invoked."
expected_outcome: "lint-and-validate is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Configure ESLint in eslint.config.js to enforce sorted imports, then run the linter with fixes on src/utils and make sure nothing else breaks.

The project files:

### eslint.config.js

```js
import js from '@eslint/js';

export default [
  js.configs.recommended,
];
```

### package.json

```json
{
  "name": "lint-fixture",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "lint": "eslint src",
    "test": "node --test"
  },
  "devDependencies": {
    "eslint": "^9.12.0",
    "@eslint/js": "^9.12.0"
  }
}
```

### src/utils/constants.js

```js
export const DAY_MS = 24 * 60 * 60 * 1000;
```

### src/utils/dates.js

```js
import { pad } from './strings.js';
import { DAY_MS } from './constants.js';

export function addDays(date, days) {
  return new Date(date.getTime() + days * DAY_MS);
}

export function isoDay(date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}
```

### src/utils/strings.js

```js
export function pad(n) {
  return String(n).padStart(2, '0');
}
```

### test/dates.test.js

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addDays, isoDay } from '../src/utils/dates.js';

test('addDays + isoDay', () => {
  assert.equal(isoDay(addDays(new Date(Date.UTC(2026, 0, 31)), 1)), '2026-02-01');
});
```
