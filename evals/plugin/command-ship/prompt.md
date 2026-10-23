---
description: "Command routing: /agent-skills:ship must reach what it is wired to."
expected_outcome: "/ship loads the shipping-and-launch skill and dispatches code-reviewer, security-auditor, test-engineer."
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

/agent-skills:ship We are about to release this orders paging change to production. It has no tests yet and no feature flag. Run the pre-launch checks on it.

```diff
diff --git a/src/orders.js b/src/orders.js
--- a/src/orders.js
+++ b/src/orders.js
@@ -12,3 +12,12 @@ function listOrders(db) {
   return db.query('SELECT * FROM orders ORDER BY created_at DESC');
 }
-module.exports = { listOrders };
+function findOrders(db, customer) {
+  return db.query(`SELECT * FROM orders WHERE customer = '${customer}'`);
+}
+function pageOrders(db, page, size) {
+  const rows = db.query('SELECT * FROM orders ORDER BY created_at DESC');
+  const start = (page - 1) * size;
+  return rows.slice(start, start + size - 1);
+}
+module.exports = { listOrders, findOrders, pageOrders };
```
