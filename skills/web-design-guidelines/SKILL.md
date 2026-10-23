---
name: web-design-guidelines
description: Reviews UI code for Web Interface Guidelines compliance. Audits web design accessibility, keyboard tab navigation, screen reader contrast, and ARIA labels. Use when checking accessibility, auditing design, reviewing UX against web interface guidelines, or reviewing UI code before merge.
---
# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:
1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

## Verification

- [ ] Every finding is listed in `file:line` format with the rule it breaks
- [ ] A keyboard-only pass was run or described: Tab order follows the visual order, focus is always visible, Escape closes dialogs and menus, and nothing traps focus
- [ ] Form errors set `aria-invalid="true"` on the invalid field, link the message with `aria-describedby`, reveal the message when the error occurs, announce it through a live region, and meet contrast
- [ ] An automated checker (axe DevTools, `npx @axe-core/cli <url>`, or Lighthouse accessibility) was run
- [ ] Any check that could not run is reported as described in [Checks You Could Not Run](../../references/definition-of-done.md#checks-you-could-not-run)

---

## Related Skills

| Skill | When to Use |
|-------|-------------|
| **[frontend-design](../frontend-design/SKILL.md)** | Before coding - Learn design principles (color, typography, UX psychology) |
| **web-design-guidelines** (this) | After coding - Audit for accessibility, performance, and best practices |

## Design Workflow

```
1. DESIGN   → Read frontend-design principles
2. CODE     → Implement the design
3. AUDIT    → Run web-design-guidelines review ← YOU ARE HERE
4. FIX      → Address findings from audit
```
