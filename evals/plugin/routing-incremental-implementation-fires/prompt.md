---
description: "Routing: a natural request that belongs to incremental-implementation. The skill should be invoked."
expected_outcome: "incremental-implementation is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Implement CSV export for the reports page, working from the existing task plan.

The project files:

### reports.js

```js
'use strict';

function visibleReports(reports) {
  return reports.filter((report) => !report.archived);
}

module.exports = { visibleReports };
```

### reports.test.js

```js
'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { visibleReports } = require('./reports');

test('hides archived reports', () => {
  assert.deepEqual(visibleReports([
    { id: 1, archived: false },
    { id: 2, archived: true },
  ]), [{ id: 1, archived: false }]);
});
```

### tasks/plan.md

```markdown
# CSV export plan

1. Add a pure report-to-CSV formatter with unit tests.
2. Add a download adapter that uses the formatter.
3. Wire an Export button to the reports page.

Each task must be independently verified and committed before starting the
next. Existing report filtering behavior must remain unchanged.
```
