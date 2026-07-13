---
name: database-design
description: Database design principles and decision-making. Schema design, indexing strategy, ORM and database selection (MSSQL, PostgreSQL, Firebase, EF Core, LINQ, Prisma, Drizzle). Use when designing database schemas, choosing ORMs, planning migrations, or optimizing queries.
---

# Database Design

> **Philosophy:** Design for relational integrity first, optimize for access patterns second.
> **Core Principle:** Learn to think in data structures and queries, not just ORM models.

## Overview

Database architecture is the foundation of full-stack application performance, safety, and scalability. This skill guides the agent to make structured decisions when choosing databases (MSSQL, PostgreSQL, SQLite, Firebase Firestore), selecting ORMs (EF Core, Dapper, Prisma, Drizzle), designing schemas, writing migrations, and optimizing database queries. It ensures that schemas are normalized correctly, foreign keys are indexed for join speed, data models reflect real business structures, and queries do not suffer from common traps like the N+1 problem.

## When to Use

- When starting a new project and selecting a database (MSSQL, PostgreSQL, Firebase, SQLite) or ORM/Access Layer (EF Core, Dapper, Prisma, Drizzle)
- When defining table structures, relationships (one-to-one, one-to-many, many-to-many), and column data types
- When writing database migrations, schema definitions, or SQL files
- When analyzing slow queries or adding indexes (composite, unique, covering indexes)
- When resolving database connection pool limits, transaction bottlenecks, or serverless DB performance

**When NOT to Use:**

- For general Entity Framework Core query optimization or LINQ query tuning in .NET (use `optimizing-ef-core-queries` instead, which acts as the C#-specific companion)
- For high-level API design rules that don't involve the database layer (use `api-and-interface-design`)
- For standard unit test mock setups unless testing actual DB integrations (use `test-driven-development`)

## Process

### Phase 1: Database and Tooling Selection
Assess context requirements and choose tools:
- Read [database-selection.md](references/database-selection.md) to choose the engine (e.g., MSSQL/PostgreSQL for enterprise .NET, PostgreSQL for open-source, Firebase for real-time mobile sync).
- Read [orm-selection.md](references/orm-selection.md) to select the access layer (EF Core + LINQ or Dapper for C#; Drizzle, Prisma, or Kysely for TS; Client SDKs for Firebase).


### Phase 2: Schema Normalization & Constraint Design
- **Relational Integrity:** Normalize tables to 3NF unless denormalization is required for documented performance hot paths. Use primary keys (`id`) and correct types (UUIDs or BigInt/CUIDs).
- **Relationships:** Map foreign keys explicitly. Define cascade behavior (`ON DELETE RESTRICT` or `ON DELETE CASCADE`) to avoid orphaned records.
- See [schema-design.md](references/schema-design.md).

### Phase 3: Indexing Strategy (Priority performance)
- **Foreign Keys:** Always add an index to foreign key columns (e.g. `userId` in `Posts` table). Missing indexes on FKs are the #1 cause of slow JOIN and DELETE operations.
- **Query Matching:** Create index plans matching query paths (e.g. composite indexes for filter combinations: `WHERE userId = X AND status = Y`).
- See [indexing.md](references/indexing.md).

### Phase 4: Query and Migration Audits
- **N+1 Avoidance:** Audit ORM queries to ensure they eager-load relations (using `include` or `join`) instead of fetching child tables in loops.
- **Safe Migrations:** Write backward-compatible migrations (e.g., add columns as nullable first, migrate data, then add `NOT NULL` constraint).
- See [optimization.md](references/optimization.md) and [migrations.md](references/migrations.md).

### Phase 5: Verification & Checkpoint
1. Run the schema validator:
   ```bash
   python skills/database-design/scripts/schema_validator.py .
   ```
2. Verify migrations apply cleanly on a local test instance.
3. Review schema definitions to ensure naming conventions are consistent.

---

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "The ORM handles indices automatically" | ORMs do not automatically index foreign keys or composite queries unless you explicitly define them. You must add them manually. |
| "I'll use PostgreSQL for this simple proof-of-concept" | Setting up local/cloud Postgres for a prototype takes time. SQLite or Neon serverless can be spun up instantly. |
| "I can just store this unstructured data as a JSON blob" | Storing JSON in relational databases bypasses type safety and relational indexing, making query optimization very difficult. relational data belongs in columns. |
| "Database normalization makes queries too slow" | Over-denormalization creates duplicate states, sync bugs, and larger table sizes. Normalize by default, denormalize only after measuring bottlenecks. |
| "I'll write the raw SQL because it's faster" | Type-safe ORMs (like Drizzle) or query builders (Kysely) provide type safety that prevents SQL injection and runtime errors. |

## Red Flags

- Foreign key relations declared without matching index definitions (`@@index` in Prisma, `.index()` in Drizzle)
- Using index-based auto-incrementing integers for public-facing URLs (exposes total counts; use UUIDs/CUIDs)
- Running sequential queries inside array loops, creating severe N+1 latency bottlenecks
- Column types that do not match validation limits (e.g., storing a string email in a generic text column without format limits)
- Writing migration files that perform destructive schema changes (e.g., dropping columns) without backup or data-migration plans

## Verification

Before marking the task as complete, verify:

- [ ] Database and ORM selection matches project constraints
- [ ] Primary keys defined on all tables with correct ID generators (UUID, CUID, or BigInt)
- [ ] Indexes defined on all foreign keys
- [ ] Cascade and delete behaviors explicitly configured for all relations
- [ ] No queries executing in nested loops (N+1 eliminated)
- [ ] Database Schema Validator script (`schema_validator.py`) executed and passed
- [ ] Naming conventions match project style (e.g., snake_case in tables, camelCase in models)
