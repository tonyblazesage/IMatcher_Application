using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SeedData
    {
        public static async Task SeedUsers(DataContext context)
        {
            //check is there any user in the database
            if (await context.Users.AnyAsync()) return;

            //if there is no user in the database, then read the json file and seed the data
            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            //deserialize the json file
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                // PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var users = JsonSerializer.Deserialize<List<ApplicationUser>>(userData, options);  //deserialize the json file

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();  //create a new instance of HMACSHA512

                user.UserName = user.UserName.ToLower();  //convert the username to lowercase
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));  //hash the password  
                user.PasswordSalt = hmac.Key;  //set the password salt

                context.Users.Add(user);  //add the user to the entity framework tracking
            
            }

            await context.SaveChangesAsync();  //save the changes to the database
        }
    }
}