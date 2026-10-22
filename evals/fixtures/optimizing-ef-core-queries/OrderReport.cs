using Microsoft.EntityFrameworkCore;

public record OrderSummary(int OrderId, string CustomerEmail, int ItemCount, decimal Total);

public class OrderReport(ShopContext db)
{
    // Called by the dashboard; slow with thousands of orders.
    public async Task<List<OrderSummary>> RecentAsync(DateTime since)
    {
        var orders = await db.Orders.Where(o => o.PlacedAt >= since).ToListAsync();
        var result = new List<OrderSummary>();
        foreach (var order in orders)
        {
            var items = await db.OrderItems.Where(i => i.OrderId == order.Id).ToListAsync();
            result.Add(new OrderSummary(order.Id, order.CustomerEmail, items.Count, items.Sum(i => i.Quantity * i.UnitPrice)));
        }
        return result;
    }
}
