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
