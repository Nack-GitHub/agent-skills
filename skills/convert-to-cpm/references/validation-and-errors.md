# Validation and Common Errors

Used by Step 8 when restore or build fails after the conversion.

## NuGet error codes

| Code | Meaning | Fix |
|---|---|---|
| NU1008 | A `PackageReference` still has a `Version` attribute while CPM is on | Remove `Version`, or change it to `VersionOverride` if an override was agreed. Check shared `.props`/`.targets` too. |
| NU1010 | A `PackageReference` has no matching `PackageVersion` | Add the missing `PackageVersion`. This is often a package that only appears in a conditional group or an imported file. |
| NU1009 | An implicitly defined package (such as `Microsoft.NETCore.App`) is listed centrally | Remove that `PackageVersion`. The SDK manages it. |
| NU1506 | Duplicate `PackageVersion` entries | Keep one `Include`, and use `Update` in conditional groups. |
| NU1507 | Multiple package sources without source mapping | This is a warning from CPM-adjacent restore hardening. Report it. Configure `packageSourceMapping` only if the user asks. |
| NU1015 | A `PackageVersion` has an empty version | Usually an MSBuild property that is undefined at import time (see [msbuild-property-handling.md](msbuild-property-handling.md)). |
| NU1605 | Detected package downgrade | Alignment pulled a dependency below what another package requires. Revisit that conflict decision with the user. |

## Multi-targeting

- Run the package comparison for **every** target framework. `dotnet package list` reports each TFM separately.
- A package referenced only for one TFM keeps its `Condition` on the `ItemGroup` in the project. The `PackageVersion` can stay unconditional unless versions differ per TFM.
- If the versions differ per TFM, use conditional `PackageVersion Update` entries (see [directory-packages-props.md](directory-packages-props.md)).

## Final checks

```bash
dotnet clean
dotnet restore --force-evaluate
dotnet build -bl:after-cpm.binlog
dotnet package list --format json > after-cpm-packages.json
```

`--force-evaluate` ignores a stale lock file. If the repository uses `packages.lock.json`, regenerate it and include the updated lock files in the change.
