# Baseline Capture and Comparison

Used by Step 2 (baseline), Step 8 (post-conversion), and Section 3 of the report.

## Capture

Run from the directory that contains the scope (solution file, project file, or common ancestor):

```bash
dotnet clean
dotnet build -bl:baseline.binlog
dotnet package list --format json > baseline-packages.json
```

After the conversion, repeat with the post-conversion names:

```bash
dotnet clean
dotnet build -bl:after-cpm.binlog
dotnet package list --format json > after-cpm-packages.json
```

Pass the solution or project path explicitly (`dotnet build MyApp.sln -bl:...`) when the directory holds more than one buildable entry point; otherwise `dotnet` refuses to choose.

### Fallbacks

- **`dotnet package list` not available** (SDKs older than .NET 8.0.400): use `dotnet list package --format json`. The output shape is the same.
- **JSON output not supported** (very old SDKs): use `dotnet list package --include-transitive` and record the text output. Compare by hand and say so in the report.
- **Restore needs credentials or a private feed**: stop and ask the user. Do not edit `nuget.config` to make the baseline pass.
- **Baseline build fails**: stop. The conversion must start from a clean build, or later failures cannot be attributed to CPM.

Keep every artifact. They are deliverables.

## Compare

The JSON lists, per project and per target framework, the `topLevelPackages` with `requestedVersion` and `resolvedVersion`. Compare **resolved** versions: the requested version text changes by design when versions move to `Directory.Packages.props`.

For each project and framework:

1. Build a map `package id → resolvedVersion` from both files.
2. A package present in both with the same resolved version is **unchanged**.
3. A package whose resolved version differs is **changed**. Record old → new and the reason (aligned to highest, `VersionOverride`, property inlined).
4. A package present in only one file is **added** or **removed**. That is never expected from a CPM conversion. Investigate before reporting success.

A conversion where every package is unchanged is version-neutral, which is the target outcome.

For differences the JSON cannot explain (for example, a different restore graph), open both binlogs in the MSBuild Structured Log Viewer and compare the `ResolvePackageAssets` and `_GetRestoreSettings` targets.
