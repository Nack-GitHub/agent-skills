---
description: "Routing: a natural request that belongs to browser-testing-with-devtools. The skill should be invoked."
expected_outcome: "browser-testing-with-devtools is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

The signup form renders but submitting it appears to do nothing. Verify the real behavior in the browser and report findings.

The project files:

### README.md

```markdown
# Signup reproduction

Run `node server.js`, open `http://127.0.0.1:4173`, enter an email, and submit
the form. The report should be based on runtime console, network, and DOM
evidence.
```

### index.html

```html
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Signup</title></head>
  <body>
    <form id="signup-form">
      <label>Email <input id="email" name="email" type="email" required></label>
      <button type="submit">Create account</button>
    </form>
    <p id="status" aria-live="polite"></p>
    <script>
      document.querySelector('#signup-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.querySelector('#email').value;
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const result = await response.json();
        document.querySelector('#status').textContent = result.message;
      });
    </script>
  </body>
</html>
```

### server.js

```js
'use strict';

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

http.createServer((req, res) => {
  if (req.url === '/api/signup') {
    res.writeHead(500, { 'content-type': 'text/html' });
    res.end('<h1>database unavailable</h1>');
    return;
  }
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
}).listen(4173, '127.0.0.1', () => console.log('listening on http://127.0.0.1:4173'));
```
