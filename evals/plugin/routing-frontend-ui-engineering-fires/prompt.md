---
description: "Routing: a natural request that belongs to frontend-ui-engineering. The skill should be invoked."
expected_outcome: "frontend-ui-engineering is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Build a dropdown menu component for the design system.

The project files:

### Button.tsx

```tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react';

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function Button({ className = '', ...props }, ref) {
    return <button ref={ref} className={`button ${className}`.trim()} {...props} />;
  },
);
```

### design-system.md

```markdown
# Menu component conventions

- Framework: React with TypeScript.
- Styling: existing `menu-*` utility classes; do not add a styling dependency.
- Public components accept `className` and forward a DOM ref.
- Components must support keyboard-only and screen-reader users.
- Focus returns to the trigger when a menu closes.
- Escape closes the menu; arrow keys move between enabled items.

The new dropdown should expose a trigger label and an array of actions. Disabled
actions remain visible but cannot receive focus or execute.
```
