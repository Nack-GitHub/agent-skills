var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/orders/{id:int}", (int id) => Results.Ok(new { id, status = "shipped" }));

app.Run();
