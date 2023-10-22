using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;

namespace API.Extension_services
{
    public class UserParams : PaginationParams
    {
       

        public string CurrentUsername { get; set; }

        public string Gender { get; set; }

        public int MinAge { get; set; } = 18; // default value for min age

        public int MaxAge { get; set; } = 150; // default value for max age

        public string OrderBy { get; set; } = "lastActive"; // default value for order by

        public bool Likers { get; set; } = false; // default value for likers

    }
}