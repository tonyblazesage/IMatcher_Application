using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extension_services;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class LoguserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext  = await next(); // next is a method that will execute the action and return the result context

            //utilise only if user is authenticated

            if(!resultContext.HttpContext.User.Identity.IsAuthenticated) return; // if user is not authenticated, return

            var userId = resultContext.HttpContext.User.GetUserId(); // get the username from the result context

            var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepo>(); // get the user repository from the result context
            var user = await repo.GetUserByIdAsync(int.Parse(userId)); // get the user from the user repository
            user.LastActive = DateTime.UtcNow; // set the last active property of the user to the current time
            await repo.SaveAllAsync(); // save the changes to the database
        }
    }
}