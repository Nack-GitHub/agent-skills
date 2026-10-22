export function ProductRow({ product, onSelect }: { product: { id: number; name: string; price: number }; onSelect: () => void }) {
  return (
    <div onClick={onSelect} style={{ height: 40 }}>
      {product.name} — ${product.price}
    </div>
  );
}
