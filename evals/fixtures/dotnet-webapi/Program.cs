var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<ItemStore>();

var app = builder.Build();

app.MapGet("/api/items/{id:int}", (int id, ItemStore store) =>
    store.Find(id) is { } item ? Results.Ok(item) : Results.NotFound());

app.Run();

public record Item(int Id, string Name, decimal Price);

public sealed class ItemStore
{
    private readonly List<Item> _items = new();
    public Item? Find(int id) => _items.FirstOrDefault(i => i.Id == id);
    public Item Add(string name, decimal price)
    {
        var item = new Item(_items.Count + 1, name, price);
        _items.Add(item);
        return item;
    }
}
