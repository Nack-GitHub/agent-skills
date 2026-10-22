namespace Shop.Core;

public static class Catalog
{
    public static string Describe(string sku) => Newtonsoft.Json.JsonConvert.SerializeObject(new { sku });
}
