---
description: "Routing: a natural request that belongs to code-review-and-quality. The skill should be invoked."
expected_outcome: "code-review-and-quality is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Review the provided diff that adds a user-search endpoint. Deliver a structured review.

The project files:

### user-search.diff

```diff
diff --git a/src/routes/users.js b/src/routes/users.js
index 1111111..2222222 100644
--- a/src/routes/users.js
+++ b/src/routes/users.js
@@ -1,3 +1,15 @@
 router.get('/users/:id', requireAuth, getUser);
+router.get('/users/search', async (req, res) => {
+  const query = req.query.q;
+  const users = await db.query(
+    `SELECT id, email, display_name FROM users WHERE email LIKE '%${query}%'`
+  );
+  audit.log(`search by ${req.user.email}: ${query}`);
+  res.json({ users });
+});

 module.exports = router;
```
