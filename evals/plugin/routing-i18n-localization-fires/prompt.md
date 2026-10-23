---
description: "Routing: a natural request that belongs to i18n-localization. The skill should be invoked."
expected_outcome: "i18n-localization is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Add i18next with English and Japanese resources to this app and localize src/Checkout.jsx, including a way to switch language.

The project files:

### package.json

```json
{
  "name": "checkout-ui",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "i18next": "^23.11.0",
    "react": "^18.3.1",
    "react-i18next": "^14.1.0"
  }
}
```

### src/Checkout.jsx

```jsx
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
```
