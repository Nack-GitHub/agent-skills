using Inventory.Core;

var level = new StockLevel("SKU-1", 10, 3);
Console.WriteLine($"{level.Sku}: {level.Available} available");
