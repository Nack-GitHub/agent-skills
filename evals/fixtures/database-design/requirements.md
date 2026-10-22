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
