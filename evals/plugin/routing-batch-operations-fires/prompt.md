---
description: "Routing: a natural request that belongs to batch-operations. The skill should be invoked."
expected_outcome: "batch-operations is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Rename the class oldHelper to newHelper everywhere it is defined, imported, exported, or used in this repository (it lives in src/utils/), renaming the file to match. Keep the test suite passing.

The project files:

### package.json

```json
{
  "name": "utils-fixture",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "test": "node --test"
  }
}
```

### src/app.js

```js
import { oldHelper, titleToPath } from './utils/index.js';

export function describe(title) {
  return { slug: oldHelper.slug(title), path: titleToPath(title) };
}
```

### src/utils/format.js

```js
import { oldHelper } from './oldHelper.js';

export function titleToPath(title) {
  return `/posts/${oldHelper.slug(title)}`;
}
```

### src/utils/index.js

```js
export { oldHelper } from './oldHelper.js';
export { titleToPath } from './format.js';
```

### src/utils/oldHelper.js

```js
export class oldHelper {
  static slug(text) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
}
```

### test/app.test.js

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { describe } from '../src/app.js';

test('describe builds slug and path', () => {
  assert.deepEqual(describe(' Hello World! '), { slug: 'hello-world', path: '/posts/hello-world' });
});
```
