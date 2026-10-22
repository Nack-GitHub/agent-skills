# MSBuild Version Property Handling

Used by Step 7, for references like `<PackageReference Include="Serilog" Version="$(SerilogVersion)" />`.

## Decide: inline or keep

| Situation | Choice |
|---|---|
| The property is used only for package versions | **Inline**: put the literal version in `PackageVersion`. |
| The property also feeds other build logic (assembly version, `DefineConstants`, a `.targets` condition) | **Keep**: `<PackageVersion Include="Serilog" Version="$(SerilogVersion)" />`. |
| One property drives a family of packages (`$(AspNetCoreVersion)` for several ids) | Either works. Keeping it preserves one-line upgrades. Ask the user. |
| The property is defined per project with different values | Treat it as a version conflict (see [audit-complexities.md](audit-complexities.md)). |

Find every use before deciding:

```bash
grep -rn 'SerilogVersion' --include='*.props' --include='*.targets' --include='*.*proj' .
```

## Import order (when keeping a property)

`Directory.Packages.props` is imported early, from `Microsoft.Common.props`. A property referenced there must already be defined at that point:

- Defined in `Directory.Build.props`: available, because that file is imported before `Directory.Packages.props`.
- Defined in a project file or `Directory.Build.targets`: **not** available. The version evaluates to empty, and restore fails with NU1015 or resolves the wrong version.

If the property lives in a late file, either move it into `Directory.Packages.props` itself or inline it.

## Cleanup (after Step 8 passes)

1. Re-run the search above. Remove the property definition only when no remaining references exist.
2. Rebuild from clean, and confirm the package comparison is unchanged.
3. List every removed or inlined property in Section 1 of the report.

Never remove a property before validation passes. It is the easiest thing to roll back to.
