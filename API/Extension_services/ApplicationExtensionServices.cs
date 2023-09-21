using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extension_services
{
    //
    public static class ApplicationExtensionServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepo, UserRepo>(); // AddScoped means that it will create a new instance of the service for every HTTP request
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()); // AddAutoMapper is an extension method that will scan the assembly for any profiles and add them to the AutoMapper configuration
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings")); // Configure the CloudinarySettings class to be able to access the Cloudinary account name, API key and API secret from the appsettings.json file
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<LoguserActivity>(); // AddScoped means that it will create a new instance of the service for every HTTP request

            return services;
        }
    }
}