---
description: "Routing: a natural request that belongs to documentation-and-adrs. The skill should be invoked."
expected_outcome: "documentation-and-adrs is invoked (directly or through its slash command)."
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

Record the decision to adopt event sourcing for the orders service as an ADR.

The project files:

### decision-context.md

```markdown
# Orders architecture decision context

The orders service currently stores mutable order rows and emits best-effort
webhooks. Auditors need a complete history of state transitions, and support
must be able to reconstruct an order at a prior point in time.

Options discussed:

1. Keep the current model and add an append-only audit table.
2. Adopt event sourcing for orders and build read projections.
3. Use database change-data capture as the audit history.

Event sourcing improves traceability and replay, but adds projection rebuilds,
event versioning, eventual consistency, and operational complexity. The team
has event-stream experience, but the reporting service expects synchronous
reads. The decision applies only to the orders bounded context.
```

### prose-review/README.md

```markdown
# Batch Queue

Batch Queue is an innovative, enterprise-grade solution that seamlessly unlocks
the power of batch processing. In today's fast-paced landscape, it is important
to note that this robust queue empowers operators to take work to the next level.

## Submit a batch

```sh
queuectl submit jobs.json --max-batch-size 50
```

A batch contains at most 50 jobs. Queue entries expire after 72 hours. Failed
jobs are retried at most three times.

Operators review jobs that still fail after retries. Queue state is held in
memory and is not durable across a process restart.

This guarantees zero job loss and means operators never need to monitor the queue.
```

### prose-review/queue.js

```js
'use strict';

const MAX_BATCH_SIZE = 50;
const RETENTION_MS = 72 * 60 * 60 * 1000;
const MAX_RETRIES = 3;
const jobs = new Map();

function submit(batch, now = Date.now()) {
  if (batch.length > MAX_BATCH_SIZE) throw new Error('Batch exceeds limit');
  for (const job of batch) {
    jobs.set(job.id, { ...job, createdAt: now, retries: 0, state: 'queued' });
  }
}

function recordFailure(id) {
  const job = jobs.get(id);
  if (!job) throw new Error('Unknown job');
  if (job.retries < MAX_RETRIES) {
    job.retries += 1;
    job.state = 'queued';
  } else {
    job.state = 'operator-review';
  }
}

function expire(now = Date.now()) {
  for (const [id, job] of jobs) {
    if (now - job.createdAt >= RETENTION_MS) jobs.delete(id);
  }
}

module.exports = { submit, recordFailure, expire, MAX_BATCH_SIZE, RETENTION_MS, MAX_RETRIES };
```
