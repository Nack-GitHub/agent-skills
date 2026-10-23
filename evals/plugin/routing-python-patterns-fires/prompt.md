---
description: "Routing: a natural request that belongs to python-patterns. The skill should be invoked."
expected_outcome: "python-patterns is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Refactor exporter.py into an exporter client that uses the Strategy pattern so new export formats can be added without editing an if/elif chain. Keep test_exporter.py passing and add a test for an unknown format.

The project files:

### exporter.py

```python
import csv
import io
import json


def export(rows, fmt):
    if fmt == "csv":
        buf = io.StringIO()
        writer = csv.DictWriter(buf, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)
        return buf.getvalue()
    elif fmt == "json":
        return json.dumps(rows)
    else:
        return None
```

### test_exporter.py

```python
from exporter import export

ROWS = [{"id": 1, "name": "a"}, {"id": 2, "name": "b"}]


def test_csv():
    assert export(ROWS, "csv").splitlines()[0] == "id,name"


def test_json():
    assert export(ROWS, "json").startswith("[")
```
