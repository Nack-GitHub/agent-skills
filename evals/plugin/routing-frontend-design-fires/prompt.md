---
description: "Routing: a natural request that belongs to frontend-design. The skill should be invoked."
expected_outcome: "frontend-design is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Design the visual layout of the dashboard sidebar in sidebar.css, following brand.md: define the color and spacing tokens as CSS variables and style the markup in sidebar.html.

The project files:

### brand.md

```markdown
# Brand notes

- Primary hue: deep teal. Accent: warm amber, for the active item only.
- Tone: calm, operational, dense information; no gradients or glassmorphism.
- Must work in light and dark mode.
```

### sidebar.css

```css
/* TODO: design the sidebar */
```

### sidebar.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Dashboard</title>
  <link rel="stylesheet" href="sidebar.css">
</head>
<body>
  <nav class="sidebar" aria-label="Main">
    <div class="sidebar__brand">Northwind Ops</div>
    <ul class="sidebar__nav">
      <li><a class="sidebar__link is-active" href="#">Overview</a></li>
      <li><a class="sidebar__link" href="#">Orders</a></li>
      <li><a class="sidebar__link" href="#">Inventory</a></li>
      <li><a class="sidebar__link" href="#">Reports</a></li>
    </ul>
    <div class="sidebar__footer">Signed in as ops@northwind.test</div>
  </nav>
  <main class="content"><h1>Overview</h1></main>
</body>
</html>
```
