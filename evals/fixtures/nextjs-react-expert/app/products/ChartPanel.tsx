// Imagine a heavy charting library import here (~300 KB).
export function ChartPanel({ products }: { products: { price: number }[] }) {
  const max = Math.max(...products.map((p) => p.price));
  return <div>Highest price: {max}</div>;
}
