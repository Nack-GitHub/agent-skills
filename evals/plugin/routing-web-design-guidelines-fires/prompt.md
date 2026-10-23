---
description: "Routing: a natural request that belongs to web-design-guidelines. The skill should be invoked."
expected_outcome: "web-design-guidelines is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Audit signup.html for keyboard and screen-reader accessibility and fix what you find.

The project files:

### signup.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Sign up</title>
  <style>
    input:focus { outline: none; }
    .error { color: #f88; }
  </style>
</head>
<body>
  <form id="signup">
    <div>Email</div>
    <input type="text" id="email" placeholder="Email">
    <span class="error" id="email-error" hidden>Enter a valid email</span>

    <div>Password</div>
    <input type="password" id="password">

    <div class="btn" onclick="document.getElementById('signup').submit()">Create account</div>
  </form>
</body>
</html>
```
