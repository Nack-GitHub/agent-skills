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
