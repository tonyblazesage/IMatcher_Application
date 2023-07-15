using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extension_services
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user) // ClaimsPrincipal is a class that comes from the System.Security.Claims namespace
        {
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value; // ClaimTypes.Name is a class that comes from the System.Security.Claims namespace
        }
    }
}