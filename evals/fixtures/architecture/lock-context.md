# Report scheduler: distributed lock decision

The nightly report scheduler runs on 3 worker replicas. Each report job must
run on exactly one replica at a time; duplicate runs email customers twice.

Current infrastructure:
- PostgreSQL 15 (primary + one read replica), already used by every service,
  backed up and monitored by the platform team.
- Redis 7, single node, used only as a cache. No persistence configured, no
  on-call ownership; it was restarted twice last quarter and lost all keys.

Constraints:
- Jobs run 30 seconds to 20 minutes.
- About 200 job starts per night; lock contention is low.
- A missed run is recoverable (the next scheduler tick retries); a duplicate
  run is not.
- The team is two engineers; nobody has operated Redis in production.

Open question: use Redis (SET NX PX / Redlock) or PostgreSQL (advisory locks
or a lease table) for the job lock?
