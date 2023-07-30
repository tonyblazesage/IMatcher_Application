using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Helpers;

namespace API.Extension_services
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, PaginationHeader header)
        {
            // set up json options
            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            // add pagination header to response
            response.Headers.Add("Pagination", JsonSerializer.Serialize(header, jsonOptions));

            // add CORS header to response
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
        
    }
}