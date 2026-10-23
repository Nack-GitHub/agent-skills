---
description: "Routing: a natural request that belongs to bash-linux. The skill should be invoked."
expected_outcome: "bash-linux is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Write scripts/compress-logs.sh: given a directory argument, find every .log file under it (recursively), compress each one with gzip, and trap errors so temporary files are cleaned up on failure. Status messages go to stderr; print a JSON summary of compressed files to stdout. Run it against logs/ to show it works.

The project files:

### README.md

```markdown
# Log tools

Scripts live in `scripts/`. Every script must be safe to re-run and must not
leave temporary files behind when it fails.
```

### logs/api.log

```text
2026-10-01T10:00:00Z INFO started
2026-10-01T10:00:05Z WARN slow query
```

### logs/archive/old.log

```text
2026-09-01T00:00:00Z INFO rotated
```

### logs/notes.txt

```text
not a log file; must not be compressed
```

### logs/worker.log

```text
2026-10-01T10:01:00Z INFO job 1 done
```
