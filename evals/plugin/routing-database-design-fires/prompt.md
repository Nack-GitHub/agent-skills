---
description: "Routing: a natural request that belongs to database-design. The skill should be invoked."
expected_outcome: "database-design is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Using requirements.md, design the relational schema for posts and tags and write it as a migration in db/, including foreign keys and indexes for the hot queries.

The project files:

### db/README.md

```markdown
Schema files live in db/. Write plain SQL migrations named NNN_description.sql.
```

### requirements.md

```markdown
# Blog: posts and tags

- Authors write posts; a post has a title, a unique URL slug, a body, a
  status (draft, published, archived) and a published timestamp.
- A post has many tags and a tag belongs to many posts. Tag names are unique
  case-insensitively.
- Hot queries:
  1. Published posts for a tag, newest first, 20 per page.
  2. A post by slug.
  3. Tag cloud: each tag with its count of published posts.
- Database: PostgreSQL 16. Deleting a post removes its tag links; deleting a
  tag that is still in use must fail.
```
