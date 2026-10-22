export function Checkout({ itemCount, total, onPay }) {
  return (
    <section>
      <h1>Checkout</h1>
      <p>You have {itemCount} items in your cart.</p>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={onPay}>Pay now</button>
    </section>
  );
}
