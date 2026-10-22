# Contract upload

- POST /api/contracts accepts one PDF, max 5 MB.
- Store files under ./uploads with a server-generated name; never trust the
  client file name.
- Reject non-PDF content even if the file name ends in .pdf.
- Errors use RFC 7807 problem details.
