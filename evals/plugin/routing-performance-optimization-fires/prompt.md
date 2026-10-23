---
description: "Routing: a natural request that belongs to performance-optimization. The skill should be invoked."
expected_outcome: "performance-optimization is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

The products page renders slowly with 1000 items. Improve its performance.

The project files:

### benchmark.js

```js
'use strict';

const { performance } = require('node:perf_hooks');
const { renderProducts } = require('./products');

const products = Array.from({ length: 1000 }, (_, id) => ({
  id,
  name: `Product ${id}`,
  sales: (id * 7919) % 10000,
}));

const start = performance.now();
const output = renderProducts(products);
const elapsed = performance.now() - start;
console.log(JSON.stringify({ products: products.length, bytes: output.length, elapsedMs: elapsed }));
```

### products.js

```js
'use strict';

function renderProducts(products) {
  let html = '';
  for (const product of products) {
    const rank = [...products]
      .sort((a, b) => b.sales - a.sales)
      .findIndex((candidate) => candidate.id === product.id) + 1;
    html += `<li data-rank="${rank}">${product.name}: ${product.sales}</li>`;
  }
  return `<ul>${html}</ul>`;
}

module.exports = { renderProducts };
```
