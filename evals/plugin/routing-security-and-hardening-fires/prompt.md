---
description: "Routing: a natural request that belongs to security-and-hardening. The skill should be invoked."
expected_outcome: "security-and-hardening is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Harden an endpoint that accepts a user-supplied webhook URL and fetches it server-side.

The project files:

### webhook.js

```js
'use strict';

async function previewWebhook(url, fetchImpl = fetch) {
  const response = await fetchImpl(url, { redirect: 'follow' });
  return {
    status: response.status,
    body: (await response.text()).slice(0, 2048),
  };
}

module.exports = { previewWebhook };
```

### webhook.test.js

```js
'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { previewWebhook } = require('./webhook');

test('returns a bounded preview from a successful request', async () => {
  const result = await previewWebhook('https://example.com/hook', async () => ({
    status: 200,
    text: async () => 'ok',
  }));
  assert.deepEqual(result, { status: 200, body: 'ok' });
});
```
