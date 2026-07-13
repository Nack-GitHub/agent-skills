# ORM and Database Access Selection

> Choose your database access layer based on language ecosystem, DX, and performance targets.

## Decision Tree

```
What is your programming language / ecosystem?
│
├── C# / .NET
│   ├── Standard / Feature-rich / Migrations → Entity Framework Core (EF Core) + LINQ
│   └── High-performance / Micro-ORM / Raw SQL → Dapper
│
├── JavaScript / TypeScript
│   ├── Edge / Fast / SQL-like → Drizzle ORM
│   ├── Schema-first / Rich Studio / High DX → Prisma
│   └── Type-safe query builder → Kysely
│
├── Dart / Flutter (Mobile)
│   ├── SQLite-based local → Floor / Drift (Moor)
│   └── Document-based / Real-time → Firebase Firestore SDK
│
└── Python
    └── SQLAlchemy 2.0 / SQLModel
```

## Comparison

| Access Layer | Ecosystem | Best For | Trade-offs |
|--------------|-----------|----------|------------|
| **EF Core + LINQ** | C# / .NET | Type-safe queries, migrations, enterprise databases (MSSQL, PG) | Heavy startup reflection, complex runtime tracking |
| **Dapper** | C# / .NET | Performance, micro-mapping, complex SQL control | No auto-migrations, manual SQL maintenance |
| **Prisma** | JS / TS | Database-agnostic schema, rich tooling, high DX | Heavy engines, slow startup, not edge-ready |
| **Drizzle** | JS / TS | SQL-native, edge deployment, zero overhead | Fewer examples, manual relational typing |
| **Firebase SDK** | Multi-lang | Mobile (Expo, Flutter) real-time data streaming | No SQL constraints, query depth limitations |

