---
description: "Routing: a natural request that belongs to ci-cd-and-automation. The skill should be invoked."
expected_outcome: "ci-cd-and-automation is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Create a CI pipeline for a Node project: install, lint, test on every PR, and block merge on failure.

The project files:

### package.json

```json
{
  "name": "ci-fixture",
  "private": true,
  "scripts": {
    "lint": "node --check src/slug.js",
    "test": "node --test"
  }
}
```

### src/slug.js

```js
'use strict';

exports.slugify = (value) => value.trim().toLowerCase().replace(/\s+/g, '-');
```

### test/slug.test.js

```js
'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { slugify } = require('../src/slug');

test('slugifies a title', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
});
```
