using System.Text;
using API.Data;
using API.Extension_services;
using API.Interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddJwtIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseMiddleware<ExceptionMiddleware>();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else {
    app.UseMiddleware<ExceptionMiddleware>();
    app.UseHsts();
}

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();   //create a scope for the service

var services = scope.ServiceProvider;  //get the service provider

try
{
    var context = services.GetRequiredService<DataContext>();  //get the data context
    await context.Database.MigrateAsync();  //migrate the database and create the database if it does not exist
    await SeedData.SeedUsers(context);  //seed the data
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();  //get the logger
    logger.LogError(ex, "An error occured during migration");  //log the error
}

app.Run();
