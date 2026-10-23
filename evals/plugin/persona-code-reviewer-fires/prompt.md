---
description: "Persona routing: a request that should be delegated to the code-reviewer subagent."
expected_outcome: "The code-reviewer persona is dispatched through the Agent tool."
max_turns: 12
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Get an independent senior reviewer to go over this change across correctness, readability, architecture, security and performance before I merge it. Delegate it rather than reviewing it inline.

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
