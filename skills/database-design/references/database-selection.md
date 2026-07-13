# Database Selection

> Choose database based on context and tech stack, not defaults.

## Decision Tree

```
What are your requirements?
│
├── C# / .NET Enterprise App
│   ├── Windows/Azure Integration → MSSQL (Microsoft SQL Server)
│   └── Open Source / Cost Sensitive → PostgreSQL
│
├── Mobile (Expo/Flutter) / Real-time Sync
│   └── Google Firebase (Firestore / Realtime DB)
│
├── Web / Serverless Relational API
│   ├── Self-hosted → PostgreSQL
│   └── Serverless → Neon, Supabase, Azure SQL
│
├── AI / Vector search
│   └── PostgreSQL + pgvector
│
├── Simple / Embedded / Local
│   └── SQLite
│
└── Global distribution
    └── PlanetScale, CockroachDB, Turso
```

## Comparison

| Database | Best For | Trade-offs |
|----------|----------|------------|
| **MSSQL (SQL Server)** | .NET / C# enterprise apps, transactions, robust tooling | Licensing cost, resource heavy, vendor locking |
| **PostgreSQL** | Full relational features, complex query analytics, pgvector | Requires server hosting, configuration management |
| **Firebase (Firestore)** | Mobile (Expo, Flutter) real-time sync, NoSQL scaling | Limited querying (no joins), read/write cost structures |
| **SQLite** | Simple, embedded, local, mobile cache | Single-writer limit, lacks advanced concurrency |
| **Turso** | Edge, low latency, globally distributed SQLite | Limited to SQLite SQL subset |

## Questions to Ask

1. What's the main programming language? (e.g., C# fits MSSQL/PostgreSQL; JS/TS/Dart fit Firebase/Postgres).
2. Is real-time document synchronization needed? (Firebase Firestore is best for mobile).
3. What is the hosting environment? (Azure fits MSSQL; GCP fits Firebase; AWS/Self-hosted fits Postgres).
4. What is the concurrency profile? (Many parallel writers fits Postgres/MSSQL; local cache fits SQLite).
5. Are complex relational analytics/JOINs required? (If yes, avoid Firebase).

