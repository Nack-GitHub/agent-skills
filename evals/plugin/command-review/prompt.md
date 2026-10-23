---
description: "Command routing: /agent-skills:review must reach what it is wired to."
expected_outcome: "/review loads the code-review-and-quality skill."
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

/agent-skills:review Review this change before merge.

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
