# Audit Complexities Checklist

Used by Step 4. Check every item before writing `Directory.Packages.props`, and present the findings to the user.

## Checklist

- [ ] **Same package with different versions** across projects (see below).
- [ ] **MSBuild property versions**, such as `Version="$(SerilogVersion)"`. Record where each property is defined, and see [msbuild-property-handling.md](msbuild-property-handling.md).
- [ ] **Conditional references**: `<ItemGroup Condition="'$(TargetFramework)' == 'net48'">`. The condition stays in the project, and the version may need a conditional `PackageVersion` (see [directory-packages-props.md](directory-packages-props.md)).
- [ ] **Shared imports**: `.props`/`.targets` files pulled in with `<Import>` or `Directory.Build.props` that declare `PackageReference` items. They need the same `Version` removal.
- [ ] **Existing `VersionOverride`** or a partial CPM setup. Note it, and do not silently remove it.
- [ ] **`GlobalPackageReference`** candidates, such as analyzers referenced by every project with `PrivateAssets="all"`. Only suggest these, and do not convert them without asking.
- [ ] **Floating versions** (`1.*`, `[1.0,2.0)`). CPM accepts them, but floating versions make the comparison non-deterministic. Flag them.
- [ ] **Security advisories**: `dotnet package list --vulnerable`. Report them as follow-up items. Do not upgrade them as part of the conversion.
- [ ] **Deprecated packages**: `dotnet package list --deprecated`. Report them as follow-up items.
- [ ] **`Update=` instead of `Include=`** on `PackageReference`. Treat it the same way, but check that a matching `Include` exists somewhere.

## Same package with different versions

Present each conflict on its own, in this format:

```markdown
### Newtonsoft.Json — 2 versions

| Version | Projects |
|---------|----------|
| 13.0.3  | Api, Worker |
| 12.0.3  | Legacy.Importer |

Options:
1. **Align to highest (13.0.3).** One central version. Legacy.Importer moves up a major version, so check its release notes and tests.
2. **Central 13.0.3 + `VersionOverride="12.0.3"` in Legacy.Importer.** Behavior does not change, but the project keeps a pinned version outside central control.

Which option should I use for this package?
```

Rules:

- Never pick a version higher than the highest one already in use within the scope.
- Ask for a decision on each conflict. A single blanket answer is acceptable only when the user gives one explicitly.
- Record every decision for Section 2 of the report.
