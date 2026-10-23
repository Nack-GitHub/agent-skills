---
description: "Routing: a natural request that belongs to tailwind-patterns. The skill should be invoked."
expected_outcome: "tailwind-patterns is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Lay out the three pricing cards in index.html as a responsive, mobile-first grid with Tailwind CSS v4 utility classes: one column on phones, three columns from the md breakpoint.

The project files:

### index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="dist/output.css">
  <title>Pricing</title>
</head>
<body>
  <section>
    <article><h2>Starter</h2><p>$9/mo</p></article>
    <article><h2>Team</h2><p>$29/mo</p></article>
    <article><h2>Enterprise</h2><p>Contact us</p></article>
  </section>
</body>
</html>
```

### package.json

```json
{
  "name": "pricing-page",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build:css": "tailwindcss -i ./src/input.css -o ./dist/output.css"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "@tailwindcss/cli": "^4.0.0"
  }
}
```

### src/input.css

```css
@import "tailwindcss";
```
