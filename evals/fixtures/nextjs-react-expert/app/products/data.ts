export const products = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.round(Math.random() * 10000) / 100,
}));
