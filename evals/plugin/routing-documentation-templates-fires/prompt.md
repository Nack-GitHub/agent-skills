---
description: "Routing: a natural request that belongs to documentation-templates. The skill should be invoked."
expected_outcome: "documentation-templates is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Write the README.md for this Node library, based on package.json and src/index.js.

The project files:

### package.json

```json
{
  "name": "@acme/retry-kit",
  "version": "0.3.0",
  "description": "Retry async functions with exponential backoff and jitter.",
  "type": "module",
  "main": "src/index.js",
  "engines": {
    "node": ">=18"
  },
  "license": "MIT",
  "scripts": {
    "test": "node --test"
  }
}
```

### src/index.js

```js
/**
 * Retry an async function with exponential backoff.
 * @param {() => Promise<T>} fn
 * @param {{ retries?: number, baseMs?: number, jitter?: boolean }} [options]
 * @template T
 */
export async function retry(fn, { retries = 3, baseMs = 100, jitter = true } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries) throw err;
      const delay = baseMs * 2 ** attempt * (jitter ? Math.random() + 0.5 : 1);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}
```
