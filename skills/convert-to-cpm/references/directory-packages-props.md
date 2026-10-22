# Directory.Packages.props Patterns

Used by Step 5.

## Minimal file

```xml
<Project>
  <PropertyGroup>
    <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
  </PropertyGroup>
  <ItemGroup>
    <PackageVersion Include="Microsoft.Extensions.Logging" Version="8.0.1" />
    <PackageVersion Include="Serilog" Version="3.1.1" />
  </ItemGroup>
</Project>
```

- Place the file in the first common ancestor directory of all in-scope projects. NuGet uses the nearest `Directory.Packages.props` found walking up from each project.
- Sort `PackageVersion` entries alphabetically by `Include`.
- `dotnet new packagesprops` (.NET 8+) produces the skeleton.

## Conditional versions

Use these when different target frameworks need different versions of the same package:

```xml
<ItemGroup>
  <PackageVersion Include="System.Text.Json" Version="8.0.5" />
</ItemGroup>
<ItemGroup Condition="'$(TargetFramework)' == 'net48'">
  <PackageVersion Update="System.Text.Json" Version="6.0.10" />
</ItemGroup>
```

Use `Update` in the conditional group so the package has one unconditional entry. Two `Include` entries for the same id produce NU1506 (duplicate `PackageVersion`).

## VersionOverride

Use this for a single project that must stay on a different version (with user approval only):

```xml
<!-- Legacy.Importer.csproj -->
<PackageReference Include="Newtonsoft.Json" VersionOverride="12.0.3" />
```

To forbid overrides repo-wide after the conversion settles, set `<CentralPackageVersionOverrideEnabled>false</CentralPackageVersionOverrideEnabled>`.

## GlobalPackageReference

Use this for packages every project needs, typically analyzers:

```xml
<ItemGroup>
  <GlobalPackageReference Include="StyleCop.Analyzers" Version="1.1.118" />
</ItemGroup>
```

Remove the per-project `PackageReference` for that package once it is global. Suggest this pattern and ask first; it is not part of a default conversion.

## Transitive pinning

`<CentralPackageTransitivePinningEnabled>true</CentralPackageTransitivePinningEnabled>` makes central versions apply to transitive dependencies as well. It changes resolved versions, so it is out of scope for a version-neutral conversion. Mention it as a follow-up item instead.
