---
description: "Routing: a natural request that belongs to nodejs-best-practices. The skill should be invoked."
expected_outcome: "nodejs-best-practices is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

The GET /orders/:id handler in src/app.js leaks unhandled promise rejections. Make async errors in this Express app reach a central error handler with a consistent JSON error shape.

The project files:

### package.json

```json
{
  "name": "orders-service",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "test": "node --test"
  },
  "dependencies": {
    "express": "^4.21.0"
  }
}
```

### src/app.js

```js
import express from 'express';
import { findOrder } from './repo.js';

export const app = express();

app.get('/orders/:id', async (req, res) => {
  const order = await findOrder(req.params.id); // rejects for unknown ids -> unhandled rejection
  res.json(order);
});
```

### src/repo.js

```js
const orders = new Map([['1', { id: '1', total: 42 }]]);

export async function findOrder(id) {
  if (!/^\d+$/.test(id)) throw Object.assign(new Error('invalid id'), { status: 400 });
  const order = orders.get(id);
  if (!order) throw Object.assign(new Error('order not found'), { status: 404 });
  return order;
}
```
