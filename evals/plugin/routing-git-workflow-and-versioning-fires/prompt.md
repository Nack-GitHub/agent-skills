---
description: "Routing: a natural request that belongs to git-workflow-and-versioning. The skill should be invoked."
expected_outcome: "git-workflow-and-versioning is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

The working tree mixes a refactor, a bug fix, and a new feature. Turn it into a clean history.

The project files:

### .eval/working-tree.patch

```diff
diff --git a/git-workflow-and-versioning/app.js b/git-workflow-and-versioning/app.js
--- a/git-workflow-and-versioning/app.js
+++ b/git-workflow-and-versioning/app.js
@@ -1,7 +1,15 @@
 'use strict';

-function total(items) {
+function sumPrices(items) {
   return items.reduce((sum, item) => sum + item.price, 0);
+}
+
+function total(items) {
+  return Math.round(sumPrices(items) * 100) / 100;
 }

-module.exports = { total };
+function exportCsv(items) {
+  return ['price', ...items.map((item) => item.price)].join('\n');
+}
+
+module.exports = { exportCsv, total };
```

### app.js

```js
'use strict';

function total(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

module.exports = { total };
```

### app.test.js

```js
'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { total } = require('./app');

test('totals item prices', () => {
  assert.equal(total([{ price: 1 }, { price: 2 }]), 3);
});
```
