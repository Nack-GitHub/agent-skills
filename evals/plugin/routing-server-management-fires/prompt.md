---
description: "Routing: a natural request that belongs to server-management. The skill should be invoked."
expected_outcome: "server-management is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Create a PM2 ecosystem config for this service following DEPLOY.md: cluster mode across the host's cores, memory-based restarts, and production environment variables.

The project files:

### DEPLOY.md

```markdown
# Deploy notes

- Host: 4 vCPU, 8 GB RAM, Ubuntu 24.04, PM2 installed globally.
- The service leaks memory slowly; restart any worker above 400 MB.
- Production needs NODE_ENV=production and PORT=8080.
```

### package.json

```json
{
  "name": "billing-api",
  "version": "2.3.0",
  "private": true,
  "scripts": {
    "start": "node server.js"
  }
}
```

### server.js

```js
import http from 'node:http';

const port = Number(process.env.PORT ?? 3000);
http.createServer((req, res) => res.end('ok')).listen(port, () => {
  console.log(`billing-api listening on ${port}`);
});
```
