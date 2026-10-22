const orders = new Map([['1', { id: '1', total: 42 }]]);

export async function findOrder(id) {
  if (!/^\d+$/.test(id)) throw Object.assign(new Error('invalid id'), { status: 400 });
  const order = orders.get(id);
  if (!order) throw Object.assign(new Error('order not found'), { status: 404 });
  return order;
}
