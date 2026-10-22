namespace Inventory.Core;

public sealed record StockLevel(string Sku, int OnHand, int Reserved)
{
    public int Available => OnHand - Reserved;
}
