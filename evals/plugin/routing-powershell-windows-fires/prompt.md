---
description: "Routing: a natural request that belongs to powershell-windows. The skill should be invoked."
expected_outcome: "powershell-windows is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Write scripts/Remove-OldFiles.ps1: recursively delete files older than N days (default 30) under a given folder, following the conventions in README.md. Show how to dry-run it against sample/.

The project files:

### README.md

```markdown
# Ops scripts (Windows)

Scripts live in `scripts/` and target PowerShell 7+. Every destructive script
must support `-WhatIf` and must log what it removes.
```

### sample/nested/old-export.json

```json
{"id": 3}
```

### sample/new-report.csv

```csv
id,total
2,20
```

### sample/old-report.csv

```csv
id,total
1,10
```
