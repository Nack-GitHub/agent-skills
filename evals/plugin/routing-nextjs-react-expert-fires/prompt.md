---
description: "Routing: a natural request that belongs to nextjs-react-expert. The skill should be invoked."
expected_outcome: "nextjs-react-expert is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

The /products page in app/products renders 10,000 rows and typing in the filter is sluggish. Optimize its rendering.

The project files:

### app/products/ChartPanel.tsx

```tsx
// Imagine a heavy charting library import here (~300 KB).
export function ChartPanel({ products }: { products: { price: number }[] }) {
  const max = Math.max(...products.map((p) => p.price));
  return <div>Highest price: {max}</div>;
}
```

### app/products/ProductRow.tsx

```tsx
export function ProductRow({ product, onSelect }: { product: { id: number; name: string; price: number }; onSelect: () => void }) {
  return (
    <div onClick={onSelect} style={{ height: 40 }}>
      {product.name} — ${product.price}
    </div>
  );
}
```

### app/products/data.ts

```ts
export const products = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.round(Math.random() * 10000) / 100,
}));
```

### app/products/page.tsx

```tsx
'use client';

import { useState } from 'react';
import { products } from './data';
import { ProductRow } from './ProductRow';
import { ChartPanel } from './ChartPanel';

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <main>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter" />
      <ChartPanel products={filtered} />
      {filtered.map((p) => (
        <ProductRow key={p.id} product={p} onSelect={() => console.log(p.id)} />
      ))}
    </main>
  );
}
```

### package.json

```json
{
  "name": "catalog",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "next": "14.2.15",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
```
